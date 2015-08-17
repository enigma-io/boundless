/* eslint no-unused-expressions:0 */

import UITypeaheadInput from './index.jsx';
import React from 'react';
import _ from 'lodash';

describe('UITypeaheadInput', () => {
    const sandbox = sinon.sandbox.create();
    const entities = [
        { content: 'apple' },
        { content: 'apricot' },
        { content: 'grape' }
    ];

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const typeahead = React.render(<UITypeaheadInput data-id='foo' />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const typeahead = React.render(<UITypeaheadInput className='foo' />, document.body);

            expect(typeahead.getInputClasses()).to.equal('ui-typeahead foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const typeahead = React.render(<UITypeaheadInput className={['foo', 'bar']} />, document.body);

            expect(typeahead.getInputClasses()).to.equal('ui-typeahead foo bar');
        });

        it('a custom offscreen class for the ARIA notification element', () => {
            const typeahead = React.render(<UITypeaheadInput offscreenClass='offscreen' />, document.body);
            const node = React.findDOMNode(typeahead.refs.aria);

            expect(node.getAttribute('class')).to.equal('offscreen');
        });

        it('a custom entity matching function', () => {
            const stub = sandbox.stub().returns([]);

            React.render(<UITypeaheadInput defaultValue='ap' entities={entities} matchFunc={stub} />, document.body);
            expect(stub).to.have.been.calledOnce;
        });

        it('a custom match marking function', () => {
            const stub = sandbox.stub().returns([]);

            React.render(<UITypeaheadInput defaultValue='ap' entities={entities} markFunc={stub} />, document.body);
            expect(stub).to.have.been.calledTwice;
        });
    });

    describe('CSS hook', () => {
        it('ui-typeahead-wrapper should be rendered', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);

            expect(typeahead.getWrapperClasses()).to.contain('ui-typeahead-wrapper');
        });

        it('ui-typeahead should be rendered', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);

            expect(typeahead.getInputClasses()).to.contain('ui-typeahead');
        });

        it('ui-typeahead-hint should be rendered', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);

            expect(typeahead.getHintClasses()).to.contain('ui-typeahead-hint');
        });

        it('ui-typeahead-match-wrapper should be rendered', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);

            expect(typeahead.getMatchWrapperClasses()).to.contain('ui-typeahead-match-wrapper');
        });

        it('ui-typeahead-match should be rendered', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);

            expect(typeahead.getMatchClasses({})).to.contain('ui-typeahead-match');
        });

        it('ui-typeahead-match-selected should be rendered', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);

            expect(typeahead.getMatchClasses({}, true)).to.contain('ui-typeahead-match-selected');
        });

        it('should be added for the marked text inside each match', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.matches);
            const matches = node.querySelectorAll('.ui-typeahead-match-highlight');

            expect(matches).to.have.length(2);
        });
    });

    describe('input hint', () => {
        it('should render if `hint` is truthy', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} />, document.body);

            expect(typeahead.refs.hint).to.not.be.undefined;
        });

        it('should be filled with the current selection', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.hint);

            expect(node.value).to.equal('apple');
        });

        it('should clear on a successful autocomplete', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />, document.body);
            const inputNode = React.findDOMNode(typeahead.refs.input);
            const hintNode = React.findDOMNode(typeahead.refs.hint);

            inputNode.setSelectionRange(inputNode.value.length, inputNode.value.length);
            typeahead.handleKeyDown({key: 'ArrowRight', target: inputNode, nativeEvent: {preventDefault: _.noop}});

            expect(hintNode.value).to.equal('');
        });

        it('should clear if the matched substring is not at the beginning of the user input', () => {
            const stub = sandbox.stub().returns([2]); // emulating a weighted fuzzy search that assigns "grape" higher value
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} matchFunc={stub} />, document.body);
            const node = React.findDOMNode(typeahead.refs.hint);

            expect(node.value).to.equal('');
            expect(typeahead.getSelectedEntityContent()).to.equal('grape');
        });
    });

    describe('down arrow', () => {
        it('should select the next entity match', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.hint);

            typeahead.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('apricot');
        });

        it('should loop back to the first match if at the end', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.hint);

            typeahead.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: _.noop}});
            typeahead.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('apple');
        });
    });

    describe('up arrow', () => {
        it('should select the previous entity match', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.hint);

            typeahead.handleKeyDown({key: 'ArrowDown', nativeEvent: {preventDefault: _.noop}});
            typeahead.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('apple');
        });

        it('should reverse loop to the last match if at the beginning', () => {
            const typeahead = React.render(<UITypeaheadInput hint={true} defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.hint);

            typeahead.handleKeyDown({key: 'ArrowUp', nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('apricot');
        });
    });

    describe('right arrow', () => {
        it('should autocomplete the currently selected entity to the input field', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            node.setSelectionRange(node.value.length, node.value.length);
            typeahead.handleKeyDown({key: 'ArrowRight', target: node, nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('apple');
        });

        it('should not autocomplete if the cursor is not at the end of the input field', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            node.setSelectionRange(0, 0); // reset to beginning
            typeahead.handleKeyDown({key: 'ArrowRight', nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('ap');
        });
    });

    describe('tab', () => {
        it('should autocomplete the currently selected entity to the input field', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            node.setSelectionRange(node.value.length, node.value.length);
            typeahead.handleKeyDown({key: 'Tab', target: node, nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('apple');
        });

        it('should not autocomplete if the cursor is not at the end of the input field', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            node.setSelectionRange(0, 0); // reset to beginning
            typeahead.handleKeyDown({key: 'Tab', nativeEvent: {preventDefault: _.noop}});

            expect(node.value).to.equal('ap');
        });
    });

    describe('enter', () => {
        it('should select the current entity match, if one exists', () => {
            const typeahead = React.render(<UITypeaheadInput entities={entities} defaultValue='ap' />, document.body);

            typeahead.handleKeyDown({key: 'Enter', target: React.findDOMNode(typeahead.refs.input), nativeEvent: {preventDefault: _.noop}});

            expect(typeahead.state.userInput).to.equal('apple');
        });

        it('should call the onComplete handler with the current value, if no entity match is displayed', () => {
            const stub = sandbox.stub();
            const typeahead = React.render(<UITypeaheadInput onComplete={stub} defaultValue='ap' />, document.body);

            typeahead.handleKeyDown({key: 'Enter', nativeEvent: {preventDefault: _.noop}});

            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('ap');
        });
    });

    describe('entity matches', () => {
        it('should autocomplete on click', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            expect(node.value).to.equal('ap');

            // default selected should be 'apple'
            document.querySelector('.ui-typeahead-match-selected').click();

            expect(node.value).to.equal('apple');
        });

        it('should contain a marked substring with the proper class', () => {
            React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);

            let node = document.querySelector('.ui-typeahead-match');

            expect(node.textContent).to.equal('apple');
            expect(node.querySelector('.ui-typeahead-match-highlight').textContent).to.equal('ap');
        });
    });

    describe('misc internals', () => {
        it('focusInput should focus the correct node', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            expect(document.activeElement).to.not.equal(node);

            typeahead.focusInput();

            expect(document.activeElement).to.equal(node);
        });

        it('getInputNode should return the correct node', () => {
            const typeahead = React.render(<UITypeaheadInput />, document.body);
            const node = React.findDOMNode(typeahead.refs.input);

            expect(typeahead.getInputNode()).to.equal(node);
        });

        it('getSelectedEntityContent should return the full entity name', () => {
            const typeahead = React.render(<UITypeaheadInput defaultValue='ap' entities={entities} />, document.body);

            expect(typeahead.getSelectedEntityContent()).to.equal('apple');
        });
    });
});
