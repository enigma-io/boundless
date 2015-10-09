/* eslint no-unused-expressions:0 */

import UITokenizedInput from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import {noop} from 'lodash';

describe('UITokenizedInput', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
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

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput data-id='foo' />, mountNode);
            const node = tokenfield.refs.typeahead.getInputNode();

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput className='foo' />, mountNode);
            const node = tokenfield.refs.typeahead.getInputNode();

            ['ui-tokenfield', 'ui-typeahead', 'foo'].forEach(name => assert(node.classList.contains(name)));
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput className={['foo', 'bar']} />, mountNode);
            const node = tokenfield.refs.typeahead.getInputNode();

            ['ui-tokenfield', 'ui-typeahead', 'foo', 'bar'].forEach(name => assert(node.classList.contains(name)));
        });
    });

    describe('CSS hook', () => {
        it('ui-tokenfield-wrapper should be rendered', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput />, mountNode);
            const node = ReactDOM.findDOMNode(tokenfield);

            expect(node.className).to.contain('ui-tokenfield-wrapper');
        });

        it('ui-tokenfield should be rendered', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput />, mountNode);
            const node = ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-tokens should be rendered', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput />, mountNode);
            const node = ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-tokens');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token should be rendered', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);

            tokenfield.setState({tokenizedEntityIndices: [0]});

            const node = ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-token');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token-selected should be rendered', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);

            tokenfield.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-token-selected');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token-close should be rendered', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);

            tokenfield.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-token-close');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token-close not should be rendered if `showTokenClose` is `false`', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput showTokenClose={false} entities={entities} />, mountNode);

            tokenfield.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-token-close');

            expect(node).to.be.null;
        });
    });

    describe('token creation', () => {
        it('should occur upon entity selection', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput defaultValue='ap' entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: typeahead.getInputNode()
            });

            expect(tokenfield.state.tokenizedEntityIndices).to.contain(0);
        });

        it('should not duplicate if the same token already exists', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput defaultValue='ap' entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: typeahead.getInputNode()
            });

            typeahead.handleInput({target: {value: 'ap'}});

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: typeahead.getInputNode()
            });

            expect(tokenfield.state.tokenizedEntityIndices).to.contain(0);
            expect(tokenfield.state.tokenizedEntityIndices).to.have.length(1);
        });
    });

    describe('token selection', () => {
        it('should occur when pressing the left arrow key at the start of the input field', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({tokenizedEntityIndices: [0, 1]});
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(0);

            typeahead.focusInput();
            tokenfield.handleKeyDown({key: 'ArrowLeft'});

            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.not.contain(0);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(1);
        });

        it('should not change if pressing the left arrow key with the only token already selected', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            typeahead.focusInput();
            tokenfield.handleKeyDown({key: 'ArrowLeft'});

            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(0);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(1);
        });

        it('should deselect if pressing the right arrow key with the only token already selected and focus the input', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-token').focus();
            tokenfield.handleKeyDown({key: 'ArrowRight'});

            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(0);
            expect(document.activeElement).to.equal(typeahead.getInputNode());
        });

        it('should move rightward if the rightmost token is not selected on right arrow key presses', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({
                tokenizedEntityIndices: [0, 1],
                tokenizedEntityIndicesSelected: [0]
            });

            ReactDOM.findDOMNode(tokenfield).querySelector('.ui-tokenfield-token').focus();
            tokenfield.handleKeyDown({key: 'ArrowRight'});

            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(1);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(1);
        });
    });

    describe('multiple token selection', () => {
        it('should occur when pressing the shift and left arrow keys', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({
                tokenizedEntityIndices: [0, 1],
                tokenizedEntityIndicesSelected: [1]
            });

            typeahead.focusInput();
            tokenfield.handleKeyDown({
                key: 'ArrowLeft',
                shiftKey: true
            });

            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(0);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(1);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(2);
        });

        it('should occur when pressing the shift and right arrow keys', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({
                tokenizedEntityIndices: [0, 1],
                tokenizedEntityIndicesSelected: [0]
            });

            typeahead.focusInput();
            tokenfield.handleKeyDown({
                key: 'ArrowRight',
                shiftKey: true
            });

            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(0);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.contain(1);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(2);
        });
    });

    describe('token removal', () => {
        it('should occur when pressing the Backspace key with a selected token', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({tokenizedEntityIndices: [0, 1]});
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(0);

            typeahead.focusInput();

            tokenfield.handleKeyDown({key: 'ArrowLeft'});
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(1);

            tokenfield.handleKeyDown({key: 'Backspace', preventDefault: noop});
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(0);
        });

        it('should occur when clicking a token\'s "close" handle', () => {
            const tokenfield = ReactDOM.render(<UITokenizedInput entities={entities} />, mountNode);
            const typeahead = tokenfield.refs.typeahead;

            tokenfield.setState({tokenizedEntityIndices: [0, 1]});
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(0);

            typeahead.focusInput();

            tokenfield.handleKeyDown({key: 'ArrowLeft'});
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(1);

            tokenfield.handleTokenCloseClick(1);
            expect(tokenfield.state.tokenizedEntityIndicesSelected).to.have.length(0);
        });
    });
});
