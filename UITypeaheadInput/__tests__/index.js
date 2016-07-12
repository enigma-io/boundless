/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UITypeaheadInput from '../../UITypeaheadInput';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UITypeaheadInput', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const entities = [
        { text: 'apple' },
        { text: 'apricot' },
        { text: 'grape' },
    ];

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITypeaheadInput));

    it('accepts an additional class as a string without replacing the core hook', () => {
        const element = render(<UITypeaheadInput className='foo bar' />);

        ['ui-typeahead-wrapper', 'foo', 'bar'].forEach(cname => expect(element.refs.wrapper.classList.contains(cname)).toBe(true));
    });

    it('accepts a custom offscreen class for the ARIA notification element', () => {
        const element = render(<UITypeaheadInput offscreenClass='offscreen' />);

        expect(element.refs.aria.classList.contains('offscreen')).toBe(true);
    });

    it('accepts a custom entity matching algorithm', () => {
        sandbox.stub(console, 'warn');

        const stub = sandbox.stub().returns([0]);

        render(
            <UITypeaheadInput
                algorithm={{matcher: stub}}
                entities={entities}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(stub.calledOnce).toBe(true);
    });

    it('emits a warning if a custom matcher is given without specifying a marker', () => {
        sandbox.stub(console, 'warn');

        const stub = sandbox.stub().returns([0]);

        render(
            <UITypeaheadInput
                algorithm={{matcher: stub}}
                entities={entities}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(console.warn.calledWithMatch('props.algorithm.marker')).toBe(true);
    });

    it('accepts a custom match marking algorithm', () => {
        sandbox.stub(console, 'warn');

        const stub = sandbox.stub().returns([]);

        render(
            <UITypeaheadInput
                algorithm={{marker: stub}}
                entities={entities}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(stub.calledThrice).toBe(true);
    });

    it('emits a warning if a custom marker is given without specifying a matcher', () => {
        sandbox.stub(console, 'warn');

        const stub = sandbox.stub().returns([]);

        render(
            <UITypeaheadInput
                algorithm={{marker: stub}}
                entities={entities}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(console.warn.calledWithMatch('props.algorithm.matcher')).toBe(true);
    });

    it('accepts a custom matching and marking algorithm', () => {
        const matchStub = sandbox.stub().returns([0, 1]);
        const markStub = sandbox.stub().returns([]);

        render(
            <UITypeaheadInput
                algorithm={{
                    matcher: matchStub,
                    marker: markStub,
                }}
                entities={entities}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(matchStub.calledOnce).toBe(true);
        expect(markStub.calledTwice).toBe(true);
    });

    it('recomputes matches when new entities are provided', () => {
        let element;

        element = render(
            <UITypeaheadInput
                algorithm={UITypeaheadInput.mode.STARTS_WITH}
                entities={entities}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(document.querySelectorAll('.ui-typeahead-match').length).toEqual(2);

        element = render(
            <UITypeaheadInput
                algorithm={UITypeaheadInput.mode.STARTS_WITH}
                entities={entities.slice(0, 1)}
                inputProps={{defaultValue: 'ap'}} />
        );

        expect(document.querySelectorAll('.ui-typeahead-match').length).toEqual(1);
    });

    describe('CSS hook', () => {
        it('ui-typeahead-wrapper is rendered', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.refs.wrapper;

            expect(node.classList.contains('ui-typeahead-wrapper')).toBe(true);
        });

        it('ui-typeahead is rendered', () => {
            const element = render(<UITypeaheadInput />);

            expect(element.getInputNode().classList.contains('ui-typeahead')).toBe(true);
        });

        it('ui-typeahead-hint is rendered', () => {
            const element = render(<UITypeaheadInput hint={true} />);

            expect(element.refs.hint.classList.contains('ui-typeahead-hint')).toBe(true);
        });

        it('ui-typeahead-match-wrapper is rendered', () => {
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );

            expect(element.refs.matches.classList.contains('ui-typeahead-match-wrapper')).toBe(true);
        });

        it('ui-typeahead-match is rendered', () => {
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );

            expect(document.querySelector('.ui-typeahead-match')).not.toBe(null);
        });

        it('ui-typeahead-match-selected is rendered', () => {
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );

            expect(document.querySelector('.ui-typeahead-match-selected')).not.toBe(null);
        });

        it('is added for the marked text inside each match', () => {
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );

            const node = element.refs.matches;
            const matches = node.querySelectorAll('.ui-typeahead-match-highlight');

            expect(matches.length).toBe(3);
        });
    });

    describe('input hint', () => {
        it('renders if `hint` is truthy', () => {
            const element = render(<UITypeaheadInput hint={true} />);

            expect(element.refs.hint).not.toBe(undefined);
        });

        it('is filled with the current selection', () => {
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    hint={true}
                    inputProps={{defaultValue: 'ap'}} />
            );

            expect(element.refs.hint.textContent).toBe('apple');
        });


        it('clears on a successful autocomplete', () => {
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    hint={true}
                    inputProps={{defaultValue: 'ap'}} />
            );

            const inputNode = element.getInputNode();

            inputNode.setSelectionRange(inputNode.value.length, inputNode.value.length);
            element.handleKeyDown({
                key: 'ArrowRight',
                target: inputNode,
                nativeEvent: {
                    preventDefault: noop
                },
                stopPropagation: noop
            });

            expect(element.refs.hint.textContent).toBe('');
        });

        it('clears if the matched substring is not at the beginning of the user input', () => {
            // emulating a weighted fuzzy search that assigns "grape" higher value
            const stub = sandbox.stub().returns([2]);
            const stub2 = sandbox.stub().returns([]);

            const element = render(
                <UITypeaheadInput
                    algorithm={{
                        matcher: stub,
                        marker: stub2,
                    }}
                    entities={entities}
                    hint={true}
                    inputProps={{defaultValue: 'ap'}} />
            );

            expect(element.refs.hint.textContent).toBe('');
            expect(element.getSelectedEntityText()).toBe('grape');
        });
    });

    describe('keyboard interactions', () => {
        describe('down arrow', () => {
            let element;

            beforeEach(() => {
                element = render(
                    <UITypeaheadInput
                        algorithm={UITypeaheadInput.mode.STARTS_WITH}
                        entities={entities}
                        hint={true}
                        inputProps={{defaultValue: 'ap'}} />
                );
            });

            it('selects the next entity match', () => {
                element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
                expect(element.refs.hint.textContent).toBe('apricot');
            });

            it('loops back to the first match if at the end', () => {
                element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
                element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
                expect(element.refs.hint.textContent).toBe('apple');
            });
        });

        describe('up arrow', () => {
            let element;

            beforeEach(() => {
                element = render(
                    <UITypeaheadInput
                        algorithm={UITypeaheadInput.mode.STARTS_WITH}
                        entities={entities}
                        hint={true}
                        inputProps={{defaultValue: 'ap'}} />
                );
            });

            it('selects the previous entity match', () => {
                element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
                element.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: noop}});
                expect(element.refs.hint.textContent).toBe('apple');
            });

            it('reverse loops to the last match if at the beginning', () => {
                element.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: noop}});
                expect(element.refs.hint.textContent).toBe('apricot');
            });
        });

        describe('right arrow', () => {
            let element;

            beforeEach(() => {
                element = render(
                    <UITypeaheadInput
                        entities={entities}
                        inputProps={{defaultValue: 'ap'}} />
                );
            });

            it('autocompletes the currently selected entity to the input field', () => {
                const node = element.getInputNode();

                node.setSelectionRange(node.value.length, node.value.length);
                element.handleKeyDown({
                    key: 'ArrowRight',
                    nativeEvent: {preventDefault: noop},
                    stopPropagation: noop,
                    target: node
                });

                expect(node.value).toBe('apple');
            });

            it('will not autocomplete if the cursor is not at the end of the input field', () => {
                const node = element.getInputNode();

                node.setSelectionRange(0, 0); // reset to beginning
                element.handleKeyDown({
                    key: 'ArrowRight',
                    nativeEvent: {preventDefault: noop},
                    stopPropagation: noop,
                    target: node
                });

                expect(node.value).toBe('ap');
            });
        });

        describe('tab', () => {
            let element;

            beforeEach(() => {
                element = render(
                    <UITypeaheadInput
                        entities={entities}
                        inputProps={{defaultValue: 'ap'}} />
                );
            });

            it('autocompletes the currently selected entity to the input field', () => {
                const node = element.getInputNode();

                node.setSelectionRange(node.value.length, node.value.length);
                element.handleKeyDown({key: 'Tab', target: node, nativeEvent: {preventDefault: noop}});

                expect(node.value).toBe('apple');
            });

            it('will not autocomplete if the cursor is not at the end of the input field', () => {
                const node = element.getInputNode();

                node.setSelectionRange(0, 0); // reset to beginning
                element.handleKeyDown({key: 'Tab', nativeEvent: {preventDefault: noop}});

                expect(node.value).toBe('ap');
            });
        });

        describe('enter', () => {
            it('selects the current entity match, if one exists', () => {
                const element = render(
                    <UITypeaheadInput
                        entities={entities}
                        inputProps={{defaultValue: 'ap'}} />
                );

                element.handleKeyDown({
                    key: 'Enter',
                    target: element.getInputNode(),
                    nativeEvent: {preventDefault: noop},
                });

                expect(element.getValue()).toBe('apple');
            });

            it('calls the onComplete handler with the current value, if no entity match is displayed', () => {
                const stub = sandbox.stub();
                const element = render(
                    <UITypeaheadInput
                        onComplete={stub}
                        inputProps={{defaultValue: 'ap'}} />
                );

                element.handleKeyDown({key: 'Enter', nativeEvent: {preventDefault: noop}});

                expect(stub.calledOnce).toBe(true);
                expect(stub.calledWith('ap')).toBe(true);
            });
        });
    });

    describe('an entity match', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );
        });

        it('autocompletes on click', () => {
            const node = element.getInputNode();

            expect(node.value).toBe('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(node.value).toBe('apple');
        });

        it('contains a marked substring with the proper class', () => {
            let node = document.querySelector('.ui-typeahead-match');

            expect(node.textContent).toBe('apple');
            expect(node.querySelector('.ui-typeahead-match-highlight').textContent).toBe('ap');
        });
    });

    describe('clearPartialInputOnSelection as `true`', () => {
        it('blanks out the input field on selection of an entity', () => {
            const element = render(
                <UITypeaheadInput
                    clearPartialInputOnSelection={true}
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );

            const node = element.getInputNode();

            expect(element.getValue()).toBe('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(element.getValue()).toBe('');
        });
    });

    describe('fuzzy match mode', () => {
        it('matches all entities containing the substring', () => {
            const element = render(
                <UITypeaheadInput
                    algorithm={UITypeaheadInput.mode.FUZZY}
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}} />
            );

            expect(element.state.entityMatchIndexes.length).toBe(entities.length);
        });

        it('marks all instances of the substring in the entity text', () => {
            const element = render(
                <UITypeaheadInput
                    algorithm={UITypeaheadInput.mode.FUZZY}
                    entities={[{text: 'grappa'}]}
                    inputProps={{defaultValue: 'a'}} />
            );

            expect(element.refs['match_$0'].textContent).toBe('grappa');
            expect(element.refs['match_$0'].querySelectorAll('.ui-typeahead-match-highlight').length).toBe(2);
        });
    });

    describe('props.onEntityHighlighted', () => {
        it('is fired when arrowing through the list', () => {
            const stub = sinon.stub();
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}}
                    onEntityHighlighted={stub} />
            );

            expect(stub.calledOnce).toBe(true);

            element.handleKeyDown({
                key: 'ArrowDown',
                nativeEvent: {preventDefault: noop}
            });

            expect(stub.calledTwice).toBe(true);
        })
    });

    describe('props.onEntitySelected', () => {
        it('is fired on Enter', () => {
            const stub = sinon.stub();
            const element = render(
                <UITypeaheadInput
                    entities={entities}
                    inputProps={{defaultValue: 'ap'}}
                    onEntitySelected={stub} />
            );

            element.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: element.getInputNode()
            });

            expect(stub.calledOnce).toBe(true);
        })
    });

    describe('controlled input mode', () => {
        it('correctly sets the value of the input from `props.inputProps.value`', () => {
            let element;

            element = render(<UITypeaheadInput inputProps={{value: 'ap', onChange: noop}} />);
            expect(element.getInputNode().value).toBe('ap');

            element = render(<UITypeaheadInput inputProps={{value: 'foo', onChange: noop}} />);
            expect(element.getInputNode().value).toBe('foo');
        });

        it('does not cause a setState for bubbling change events', () => {
            const element = render(<UITypeaheadInput inputProps={{value: 'ap', onChange: noop}} />);

            sandbox.stub(element, 'setState');

            element.handleChange({persist: noop, target: {value: 'foo'}});
            expect(element.setState.called).toBe(false);
        });
    });

    describe('child prop transferral', () => {
        it('passes down props.hidePlaceholderOnFocus', () => {
            const element = render(
                <UITypeaheadInput
                    hidePlaceholderOnFocus={true} />
            );

            expect(element.refs.input.props.hidePlaceholderOnFocus).toBe(true);
        });

        it('passes down props.inputProps', () => {
            const element = render(
                <UITypeaheadInput
                    inputProps={{placeholder: 'foo'}} />
            );

            expect(element.refs.input.props.inputProps.placeholder).toBe('foo');
        });
    });

    describe('instance methods', () => {
        describe('focus()', () => {
            it('sets the underlying textual input as the active document element', () => {
                const element = render(<UITypeaheadInput />);
                const node = element.getInputNode();

                expect(document.activeElement).not.toBe(node);

                element.focus();
                expect(document.activeElement).toBe(node);
            });
        });

        describe('getInputNode()', () => {
            it('returns the raw DOM node of the underlying textual input', () => {
                const element = render(<UITypeaheadInput />);

                expect(element.getInputNode()).not.toBe(null);
                expect(element.getInputNode().tagName.toLowerCase()).toBe('input');
            });
        });

        describe('getValue()', () => {
            it('returns the current value of the underlying textual input', () => {
                const element = render(
                    <UITypeaheadInput
                        entities={entities}
                        inputProps={{defaultValue: 'ap'}} />
                );

                expect(element.getValue()).toBe('ap');
            });
        });

        describe('getSelectedEntityText()', () => {
            it('returns the `text` property of the currently highlighted entity from `props.entities`', () => {
                const element = render(
                    <UITypeaheadInput
                        entities={entities}
                        inputProps={{defaultValue: 'ap'}} />
                );

                expect(element.getSelectedEntityText()).toBe('apple');
            });

            it('returns an empty string if no entity is highlighted', () => {
                const element = render(
                    <UITypeaheadInput
                        entities={entities} />
                );

                expect(element.getSelectedEntityText()).toBe('');
            });
        });

        describe('select()', () => {
            it('creates a full selection of the input text', () => {
                const element = render(<UITypeaheadInput inputProps={{defaultValue: 'ap'}} />);
                const node = element.getInputNode();

                expect(node.selectionStart).toBe(0);
                expect(node.selectionEnd).toBe(0);

                element.select();
                expect(node.selectionStart).toBe(0);
                expect(node.selectionEnd).toBe(2);
            });
        });

        describe('setValue(value: string)', () => {
            it('changes the value of the input', () => {
                const element = render(
                    <UITypeaheadInput
                        entities={entities}
                        inputProps={{defaultValue: 'ap'}} />
                );

                expect(element.getValue()).toBe('ap');

                element.setValue('foo');
                expect(element.getValue()).toBe('foo');
            });
        });
    });
});
