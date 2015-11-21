/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UITokenizedInput from '../../UITokenizedInput';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

describe('UITokenizedInput', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const entities = [
        { content: 'apple' },
        { content: 'apricot' },
        { content: 'grape' }
    ];

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UITokenizedInput));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputProps', () => {
            const element = render(<UITokenizedInput inputProps={{'data-id': 'foo'}} />);
            const node = element.refs.typeahead.refs.input;

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('additional classes via props.inputProps.className', () => {
            const element = render(<UITokenizedInput inputProps={{className: 'foo'}} />);
            const node = element.refs.typeahead.refs.input;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UITokenizedInput className='foo' />);
            const node = element.refs.wrapper;

            ['ui-tokenfield-wrapper', 'foo'].forEach(name => expect(node.classList.contains(name)).toBe(true));
        });
    });

    describe('CSS hook', () => {
        it('ui-tokenfield-wrapper should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper;

            expect(node.className).toContain('ui-tokenfield-wrapper');
        });

        it('ui-tokenfield should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-tokens should be rendered', () => {
            const element = render(<UITokenizedInput />);
            const node = element.refs.wrapper.querySelector('.ui-tokenfield-tokens');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({tokenizedEntityIndices: [0]});

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-selected should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-selected');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-close should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-close not should be rendered if `showTokenClose` is `false`', () => {
            const element = render(<UITokenizedInput showTokenClose={false} entities={entities} />);

            element.setState({
                tokenizedEntityIndices: [0],
                tokenizedEntityIndicesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).toBe(null);
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

            expect(element.state.tokenizedEntityIndices).toContain(0);
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

            expect(element.state.tokenizedEntityIndices).toContain(0);
            expect(element.state.tokenizedEntityIndices.length).toBe(1);
        });
    });

    describe('token selection', () => {
        it('should occur when pressing the left arrow key at the start of the input field', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);

            typeahead.focusInput();
            element.handleKeyDown({key: 'ArrowLeft'});

            expect(element.state.tokenizedEntityIndicesSelected).not.toContain(0);
            expect(element.state.tokenizedEntityIndicesSelected).toContain(1);
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

            expect(element.state.tokenizedEntityIndicesSelected).toContain(0);
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(1);
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

            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);
            expect(document.activeElement).toBe(typeahead.getInputNode());
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

            expect(element.state.tokenizedEntityIndicesSelected).toContain(1);
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(1);
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

            expect(element.state.tokenizedEntityIndicesSelected).toContain(0);
            expect(element.state.tokenizedEntityIndicesSelected).toContain(1);
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(2);
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

            expect(element.state.tokenizedEntityIndicesSelected).toContain(0);
            expect(element.state.tokenizedEntityIndicesSelected).toContain(1);
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(2);
        });
    });

    describe('token removal', () => {
        it('should occur when pressing the Backspace key with a selected token', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);

            typeahead.focusInput();

            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(1);

            element.handleKeyDown({key: 'Backspace', preventDefault: noop});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);
        });

        it('should occur when clicking a token\'s "close" handle', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);

            typeahead.focusInput();

            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(1);

            element.handleTokenCloseClick(1);
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);
        });
    });

    describe('input focus', () => {
        it('should clear any token selection', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndices: [0, 1]});

            Simulate.focus(typeahead.refs.input);
            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(1);

            Simulate.focus(typeahead.refs.input);
            expect(element.state.tokenizedEntityIndicesSelected.length).toBe(0);
        });
    });
});
