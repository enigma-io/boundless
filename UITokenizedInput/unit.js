/* eslint no-unused-expressions:0 */

import UITokenizedInput from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';
import {noop} from 'lodash';

describe('UITokenizedInput', () => {
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

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITokenizedInput));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputAttrs', () => {
            const element = render(<UITokenizedInput inputAttrs={{'data-id': 'foo'}} />);
            const node = element.refs.typeahead.refs.input;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('additional classes via props.inputAttrs.className', () => {
            const element = render(<UITokenizedInput inputAttrs={{className: 'foo'}} />);
            const node = element.refs.typeahead.refs.input;

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UITokenizedInput className='foo' />);
            const node = element.refs.wrapper;

            ['ui-tokenfield-wrapper', 'foo'].forEach(name => assert(node.classList.contains(name)));
        });
    });

    describe('CSS hook', () => {
        it('ui-tokenfield-wrapper should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper;

            expect(node.className).to.contain('ui-tokenfield-wrapper');
        });

        it('ui-tokenfield should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-tokens should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-tokens');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({tokenizedEntityIndices: [0]});

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token-selected should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-selected');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token-close should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).to.not.be.null;
        });

        it('ui-tokenfield-token-close not should be rendered if `showTokenClose` is `false`', () => {
            const element = render(<UITokenizedInput showTokenClose={false} entities={entities} />);

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).to.be.null;
        });
    });

    describe('token creation', () => {
        it('should occur upon entity selection', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);
            const typeahead = element.refs.typeahead;

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: typeahead.getInputNode()
            });

            expect(element.state.tokenizedEntityIndices).to.contain(0);
        });

        it('should not duplicate if the same token already exists', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);
            const typeahead = element.refs.typeahead;

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

            expect(element.state.tokenizedEntityIndices).to.contain(0);
            expect(element.state.tokenizedEntityIndices).to.have.length(1);
        });
    });

    describe('token selection', () => {
        it('should occur when pressing the left arrow key at the start of the input field', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(0);

            typeahead.focusInput();
            element.handleKeyDown({key: 'ArrowLeft'});

            expect(element.state.tokenizedEntityIndicesSelected).to.not.contain(0);
            expect(element.state.tokenizedEntityIndicesSelected).to.contain(1);
        });

        it('should not change if pressing the left arrow key with the only token already selected', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            typeahead.focusInput();
            element.handleKeyDown({key: 'ArrowLeft'});

            expect(element.state.tokenizedEntityIndicesSelected).to.contain(0);
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(1);
        });

        it('should deselect if pressing the right arrow key with the only token already selected and focus the input', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            element.refs.wrapper.querySelector('.ui-tokenfield-token').focus();
            element.handleKeyDown({key: 'ArrowRight'});

            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(0);
            expect(document.activeElement).to.equal(typeahead.getInputNode());
        });

        it('should move rightward if the rightmost token is not selected on right arrow key presses', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndices: [0, 1],
                tokenizedEntityIndicesSelected: [0]
            });

            element.refs.wrapper.querySelector('.ui-tokenfield-token').focus();
            element.handleKeyDown({key: 'ArrowRight'});

            expect(element.state.tokenizedEntityIndicesSelected).to.contain(1);
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(1);
        });
    });

    describe('multiple token selection', () => {
        it('should occur when pressing the shift and left arrow keys', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndices: [0, 1],
                tokenizedEntityIndicesSelected: [1]
            });

            typeahead.focusInput();
            element.handleKeyDown({
                key: 'ArrowLeft',
                shiftKey: true
            });

            expect(element.state.tokenizedEntityIndicesSelected).to.contain(0);
            expect(element.state.tokenizedEntityIndicesSelected).to.contain(1);
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(2);
        });

        it('should occur when pressing the shift and right arrow keys', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndices: [0, 1],
                tokenizedEntityIndicesSelected: [0]
            });

            typeahead.focusInput();
            element.handleKeyDown({
                key: 'ArrowRight',
                shiftKey: true
            });

            expect(element.state.tokenizedEntityIndicesSelected).to.contain(0);
            expect(element.state.tokenizedEntityIndicesSelected).to.contain(1);
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(2);
        });
    });

    describe('token removal', () => {
        it('should occur when pressing the Backspace key with a selected token', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(0);

            typeahead.focusInput();

            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(1);

            element.handleKeyDown({key: 'Backspace', preventDefault: noop});
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(0);
        });

        it('should occur when clicking a token\'s "close" handle', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(0);

            typeahead.focusInput();

            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(1);

            element.handleTokenCloseClick(1);
            expect(element.state.tokenizedEntityIndicesSelected).to.have.length(0);
        });
    });
});
