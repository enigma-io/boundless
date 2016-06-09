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

    it('should accept an additional class as a string without replacing the core hook', () => {
        const element = render(<UITypeaheadInput className='foo bar' />);

        ['ui-typeahead-wrapper', 'foo', 'bar'].forEach(cname => expect(element.refs.wrapper.classList.contains(cname)).toBe(true));
    });

    it('should accept a custom offscreen class for the ARIA notification element', () => {
        const element = render(<UITypeaheadInput offscreenClass='offscreen' />);

        expect(element.refs.aria.classList.contains('offscreen')).toBe(true);
    });

    it('should accept a custom entity matching algorithm', () => {
        sandbox.stub(console, 'warn');

        const stub = sandbox.stub().returns([0]);

        render(<UITypeaheadInput defaultValue='ap' entities={entities} algorithm={{matchFunc: stub}} />);
        expect(stub.calledOnce).toBe(true);

        expect(console.warn.calledOnce).toBe(true);
        expect(console.warn.calledWithMatch('props.algorithm.markFunc')).toBe(true);
    });

    it('should accept a custom match marking algorithm', () => {
        sandbox.stub(console, 'warn');

        const stub = sandbox.stub().returns([]);

        render(<UITypeaheadInput defaultValue='ap' entities={entities} algorithm={{markFunc: stub}} />);
        expect(stub.calledTwice).toBe(true);

        expect(console.warn.calledOnce).toBe(true);
        expect(console.warn.calledWithMatch('props.algorithm.matchFunc')).toBe(true);
    });

    it('should accept a custom matching and marking algorithm', () => {
        const matchStub = sandbox.stub().returns([0, 1]);
        const markStub = sandbox.stub().returns([]);

        render(
            <UITypeaheadInput
                defaultValue='ap'
                entities={entities}
                algorithm={{
                    matchFunc: matchStub,
                    markFunc: markStub,
                }} />
        );

        expect(matchStub.calledOnce).toBe(true);
        expect(markStub.calledTwice).toBe(true);
    });

    describe('CSS hook', () => {
        it('ui-typeahead-wrapper should be rendered', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.refs.wrapper;

            expect(node.classList.contains('ui-typeahead-wrapper')).toBe(true);
        });

        it('ui-typeahead should be rendered', () => {
            const element = render(<UITypeaheadInput />);

            expect(element.getInputNode().classList.contains('ui-typeahead')).toBe(true);
        });

        it('ui-typeahead-hint should be rendered', () => {
            const element = render(<UITypeaheadInput hint={true} />);

            expect(element.refs.hint.classList.contains('ui-typeahead-hint')).toBe(true);
        });

        it('ui-typeahead-match-wrapper should be rendered', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);

            expect(element.refs.matches.classList.contains('ui-typeahead-match-wrapper')).toBe(true);
        });

        it('ui-typeahead-match should be rendered', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.refs.matches;
            const matches = node.querySelectorAll('.ui-typeahead-match');

            expect(matches.length).toBe(2);
        });

        it('ui-typeahead-match-selected should be rendered', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.refs.matches;
            const match = node.querySelector('.ui-typeahead-match-selected');

            expect(match).not.toBe(null);
        });

        it('should be added for the marked text inside each match', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.refs.matches;
            const matches = node.querySelectorAll('.ui-typeahead-match-highlight');

            expect(matches.length).toBe(2);
        });
    });

    describe('input hint', () => {
        it('should render if `hint` is truthy', () => {
            const element = render(<UITypeaheadInput hint={true} />);

            expect(element.refs.hint).not.toBe(undefined);
        });

        it('should be filled with the current selection', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);

            expect(element.refs.hint.textContent).toBe('apple');
        });


        it('should clear on a successful autocomplete', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
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

        it('should clear if the matched substring is not at the beginning of the user input', () => {
            // emulating a weighted fuzzy search that assigns "grape" higher value
            const stub = sandbox.stub().returns([2]);
            const stub2 = sandbox.stub().returns([]);
            const element = render(
                <UITypeaheadInput
                    hint={true}
                    defaultValue='ap'
                    entities={entities}
                    algorithm={{
                        matchFunc: stub,
                        markFunc: stub2,
                    }} />
            );

            expect(element.refs.hint.textContent).toBe('');
            expect(element.getSelectedEntityText()).toBe('grape');
        });
    });

    describe('down arrow', () => {
        it('should select the next entity match', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);

            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});

            expect(element.refs.hint.textContent).toBe('apricot');
        });

        it('should loop back to the first match if at the end', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);

            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});

            expect(element.refs.hint.textContent).toBe('apple');
        });
    });

    describe('up arrow', () => {
        it('should select the previous entity match', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);

            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
            element.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: noop}});

            expect(element.refs.hint.textContent).toBe('apple');
        });

        it('should reverse loop to the last match if at the beginning', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);

            element.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: noop}});

            expect(element.refs.hint.textContent).toBe('apricot');
        });
    });

    describe('right arrow', () => {
        it('should autocomplete the currently selected entity to the input field', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
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

        it('should not autocomplete if the cursor is not at the end of the input field', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
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
        it('should autocomplete the currently selected entity to the input field', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.getInputNode();

            node.setSelectionRange(node.value.length, node.value.length);
            element.handleKeyDown({key: 'Tab', target: node, nativeEvent: {preventDefault: noop}});

            expect(node.value).toBe('apple');
        });

        it('should not autocomplete if the cursor is not at the end of the input field', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.getInputNode();

            node.setSelectionRange(0, 0); // reset to beginning
            element.handleKeyDown({key: 'Tab', nativeEvent: {preventDefault: noop}});

            expect(node.value).toBe('ap');
        });
    });

    describe('enter', () => {
        it('should select the current entity match, if one exists', () => {
            const element = render(<UITypeaheadInput entities={entities} defaultValue='ap' />);

            element.handleKeyDown({
                key: 'Enter',
                target: element.getInputNode(),
                nativeEvent: {preventDefault: noop}
            });

            expect(element.state.userInput).toBe('apple');
        });

        it('should call the onComplete handler with the current value, if no entity match is displayed', () => {
            const stub = sandbox.stub();
            const element = render(<UITypeaheadInput onComplete={stub} defaultValue='ap' />);

            element.handleKeyDown({key: 'Enter', nativeEvent: {preventDefault: noop}});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWith('ap')).toBe(true);
        });
    });

    describe('entity matches', () => {
        it('should autocomplete on click', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.getInputNode();

            expect(node.value).toBe('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(node.value).toBe('apple');
        });

        it('should contain a marked substring with the proper class', () => {
            render(<UITypeaheadInput defaultValue='ap' entities={entities} />);

            let node = document.querySelector('.ui-typeahead-match');

            expect(node.textContent).toBe('apple');
            expect(node.querySelector('.ui-typeahead-match-highlight').textContent).toBe('ap');
        });
    });

    describe('clearPartialInputOnSelection as `true`', () => {
        it('should blank out the input field on selection of an entity', () => {
            const element = render(
                <UITypeaheadInput clearPartialInputOnSelection={true}
                                  defaultValue='ap'
                                  entities={entities} />
            );
            const node = element.getInputNode();

            expect(node.value).toBe('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(node.value).toBe('');
        });
    });

    describe('fuzzy match mode', () => {
        it('should match all entities containing the substring', () => {
            const element = render(
                <UITypeaheadInput algorithm={UITypeaheadInput.mode.FUZZY}
                                  defaultValue='ap'
                                  entities={entities} />
            );

            expect(element.state.entityMatchIndexes.length).toBe(entities.length);
        });

        it('should mark all instances of the substring in the entity text', () => {
            const element = render(
                <UITypeaheadInput algorithm={UITypeaheadInput.mode.FUZZY}
                                  defaultValue='a'
                                  entities={[{text: 'grappa'}]} />
            );

            expect(element.refs['match_$0'].textContent).toBe('grappa');
            expect(element.refs['match_$0'].querySelectorAll('.ui-typeahead-match-highlight').length).toBe(2);
        });
    });

    describe('props.onEntityHighlighted', () => {
        it('should be fired when arrowing through the list', () => {
            const stub = sinon.stub();
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} onEntityHighlighted={stub} />);

            expect(stub.calledOnce).toBe(true);

            element.handleKeyDown({
                key: 'ArrowDown',
                nativeEvent: {preventDefault: noop}
            });

            expect(stub.calledTwice).toBe(true);
        })
    });

    describe('props.onEntitySelected', () => {
        it('should be fired on Enter', () => {
            const stub = sinon.stub();
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} onEntitySelected={stub} />);

            element.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: element.getInputNode()
            });

            expect(stub.calledOnce).toBe(true);
        })
    });

    describe('controlled input mode', () => {
        it('should correctly set the value of the input from `props.inputProps.value`', () => {
            let element;

            element = render(<UITypeaheadInput inputProps={{value: 'ap', onChange: noop}} />);
            expect(element.getInputNode().value).toBe('ap');

            element = render(<UITypeaheadInput inputProps={{value: 'foo', onChange: noop}} />);
            expect(element.getInputNode().value).toBe('foo');
        });

        it('should correctly set the value of the input from `props.value`', () => {
            let element;

            element = render(<UITypeaheadInput value='ap' inputProps={{onChange: noop}} />);
            expect(element.getInputNode().value).toBe('ap');

            element = render(<UITypeaheadInput value='foo' inputProps={{onChange: noop}} />);
            expect(element.getInputNode().value).toBe('foo');
        });
    });

    describe('value(string)', () => {
        it('should change the value of the input', () => {
            const element = render(<UITypeaheadInput entities={entities} defaultValue='ap' />);

            expect(element.getInputNode().value).toBe('ap');

            element.value('foo');
            expect(element.getInputNode().value).toBe('foo');
        });
    });

    describe('passthrough to UITextualInput', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UITypeaheadInput
                    defaultValue='ap'
                    hidePlaceholderOnFocus={true}
                    name='baz'
                    placeholder='pl'
                    type='text'
                    value='va' />
            );
        });

        it('should correctly pass down props.defaultValue', () => {
            expect(element.refs.input.props.defaultValue).toContain('ap');
        });

        it('should correctly pass down props.hidePlaceholderOnFocus', () => {
            expect(element.refs.input.props.hidePlaceholderOnFocus).toBe(true);
        });

        it('should correctly pass down props.name', () => {
            expect(element.refs.input.props.name).toBe('baz');
        });

        it('should correctly pass down props.placeholder', () => {
            expect(element.refs.input.props.placeholder).toBe('pl');
        });

        it('should correctly pass down props.type', () => {
            expect(element.refs.input.props.type).toBe('text');
        });

        it('should correctly pass down props.value', () => {
            expect(element.refs.input.props.value).toBe('va');
        });
    });

    describe('misc internals', () => {
        it('focus should focus the correct node', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.getInputNode();

            expect(document.activeElement).not.toBe(node);

            element.focus();

            expect(document.activeElement).toBe(node);
        });

        it('getInputNode should return the correct node', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.getInputNode();

            expect(element.getInputNode()).toBe(node);
        });

        it('getSelectedEntityText should return the full entity name', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);

            expect(element.getSelectedEntityText()).toBe('apple');
        });
    });
});
