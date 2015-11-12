/* eslint no-unused-expressions:0 */

import UITypeaheadInput from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';
import {noop} from 'lodash';

describe('UITypeaheadInput', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const entities = [
        { content: 'apple' },
        { content: 'apricot' },
        { content: 'grape' }
    ];

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITypeaheadInput));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UITypeaheadInput className='foo bar' />);

            ['ui-typeahead-wrapper', 'foo', 'bar'].forEach(cname => assert(element.refs.wrapper.classList.contains(cname)));
        });

        it('a custom offscreen class for the ARIA notification element', () => {
            const element = render(<UITypeaheadInput offscreenClass='offscreen' />);

            assert(element.refs.aria.classList.contains('offscreen'));
        });

        it('a custom entity matching function', () => {
            const stub = sandbox.stub().returns([]);

            render(<UITypeaheadInput defaultValue='ap' entities={entities} matchFunc={stub} />);
            expect(stub).to.have.been.calledOnce;
        });

        it('a custom match marking function', () => {
            const stub = sandbox.stub().returns([]);

            render(<UITypeaheadInput defaultValue='ap' entities={entities} markFunc={stub} />);
            expect(stub).to.have.been.calledTwice;
        });
    });

    describe('CSS hook', () => {
        it('ui-typeahead-wrapper should be rendered', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.refs.wrapper;

            assert(node.classList.contains('ui-typeahead-wrapper'));
        });

        it('ui-typeahead should be rendered', () => {
            const element = render(<UITypeaheadInput />);

            assert(element.refs.input.classList.contains('ui-typeahead'));
        });

        it('ui-typeahead-hint should be rendered', () => {
            const element = render(<UITypeaheadInput hint={true} />);

            assert(element.refs.hint.classList.contains('ui-typeahead-hint'));
        });

        it('ui-typeahead-match-wrapper should be rendered', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);

            assert(element.refs.matches.classList.contains('ui-typeahead-match-wrapper'));
        });

        it('ui-typeahead-match should be rendered', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.refs.matches;
            const matches = node.querySelectorAll('.ui-typeahead-match');

            expect(matches).to.not.have.length(0);
        });

        it('ui-typeahead-match-selected should be rendered', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.refs.matches;
            const match = node.querySelector('.ui-typeahead-match-selected');

            expect(match).to.not.be.null;
        });

        it('should be added for the marked text inside each match', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.refs.matches;
            const matches = node.querySelectorAll('.ui-typeahead-match-highlight');

            expect(matches).to.have.length(2);
        });
    });

    describe('input hint', () => {
        it('should render if `hint` is truthy', () => {
            const element = render(<UITypeaheadInput hint={true} />);

            expect(element.refs.hint).to.not.be.undefined;
        });

        it('should be filled with the current selection', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
            const node = element.refs.hint;

            expect(node.value).to.equal('apple');
        });

        it('should clear on a successful autocomplete', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
            const inputNode = element.getInputNode();
            const hintNode = element.refs.hint;

            inputNode.setSelectionRange(inputNode.value.length, inputNode.value.length);
            element.handleKeyDown({
                key: 'ArrowRight',
                target: inputNode,
                nativeEvent: {
                    preventDefault: noop
                },
                stopPropagation: noop
            });

            expect(hintNode.value).to.equal('');
        });

        it('should clear if the matched substring is not at the beginning of the user input', () => {
            const stub = sandbox.stub().returns([2]); // emulating a weighted fuzzy search that assigns "grape" higher value
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} matchFunc={stub} />);
            const node = element.refs.hint;

            expect(node.value).to.equal('');
            expect(element.getSelectedEntityContent()).to.equal('grape');
        });
    });

    describe('down arrow', () => {
        it('should select the next entity match', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
            const node = element.refs.hint;

            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});

            expect(node.value).to.equal('apricot');
        });

        it('should loop back to the first match if at the end', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
            const node = element.refs.hint;

            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});

            expect(node.value).to.equal('apple');
        });
    });

    describe('up arrow', () => {
        it('should select the previous entity match', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
            const node = element.refs.hint;

            element.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: noop}});
            element.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: noop}});

            expect(node.value).to.equal('apple');
        });

        it('should reverse loop to the last match if at the beginning', () => {
            const element = render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />);
            const node = element.refs.hint;

            element.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: noop}});

            expect(node.value).to.equal('apricot');
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

            expect(node.value).to.equal('apple');
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

            expect(node.value).to.equal('ap');
        });
    });

    describe('tab', () => {
        it('should autocomplete the currently selected entity to the input field', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.getInputNode();

            node.setSelectionRange(node.value.length, node.value.length);
            element.handleKeyDown({key: 'Tab', target: node, nativeEvent: {preventDefault: noop}});

            expect(node.value).to.equal('apple');
        });

        it('should not autocomplete if the cursor is not at the end of the input field', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.getInputNode();

            node.setSelectionRange(0, 0); // reset to beginning
            element.handleKeyDown({key: 'Tab', nativeEvent: {preventDefault: noop}});

            expect(node.value).to.equal('ap');
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

            expect(element.state.userInput).to.equal('apple');
        });

        it('should call the onComplete handler with the current value, if no entity match is displayed', () => {
            const stub = sandbox.stub();
            const element = render(<UITypeaheadInput onComplete={stub} defaultValue='ap' />);

            element.handleKeyDown({key: 'Enter', nativeEvent: {preventDefault: noop}});

            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('ap');
        });
    });

    describe('entity matches', () => {
        it('should autocomplete on click', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);
            const node = element.getInputNode();

            expect(node.value).to.equal('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(node.value).to.equal('apple');
        });

        it('should contain a marked substring with the proper class', () => {
            render(<UITypeaheadInput defaultValue='ap' entities={entities} />);

            let node = document.querySelector('.ui-typeahead-match');

            expect(node.textContent).to.equal('apple');
            expect(node.querySelector('.ui-typeahead-match-highlight').textContent).to.equal('ap');
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

            expect(node.value).to.equal('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(node.value).to.equal('');
        });
    });

    describe('misc internals', () => {
        it('focusInput should focus the correct node', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.getInputNode();

            expect(document.activeElement).to.not.equal(node);

            element.focusInput();

            expect(document.activeElement).to.equal(node);
        });

        it('getInputNode should return the correct node', () => {
            const element = render(<UITypeaheadInput />);
            const node = element.getInputNode();

            expect(element.getInputNode()).to.equal(node);
        });

        it('getSelectedEntityContent should return the full entity name', () => {
            const element = render(<UITypeaheadInput defaultValue='ap' entities={entities} />);

            expect(element.getSelectedEntityContent()).to.equal('apple');
        });
    });
});
