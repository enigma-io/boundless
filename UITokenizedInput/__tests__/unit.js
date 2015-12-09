/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UITokenizedInput from '../../UITokenizedInput';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

describe('UITokenizedInput', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const entities = [
        { text: 'apple' },
        { text: 'apricot' },
        { text: 'grape' }
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

            element.setState({tokenizedEntityIndexes: [0]});

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-selected should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({
                tokenizedEntityIndexes: [0],
                tokenizedEntityIndexesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-selected');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-close should be rendered', () => {
            const element = render(<UITokenizedInput entities={entities} />);

            element.setState({
                tokenizedEntityIndexes: [0],
                tokenizedEntityIndexesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).not.toBe(null);
        });

        it('ui-tokenfield-token-close not should be rendered if `showTokenClose` is `false`', () => {
            const element = render(<UITokenizedInput showTokenClose={false} entities={entities} />);

            element.setState({
                tokenizedEntityIndexes: [0],
                tokenizedEntityIndexesSelected: [0]
            });

            const node = element.refs.wrapper.querySelector('.ui-tokenfield-token-close');

            expect(node).toBe(null);
        });
    });

    describe('default tokens', () => {
        it('should be accepted via entity indexes fed to defaultTokenizedEntityIndexes', () => {
            const element = render(
                <UITokenizedInput entities={entities} defaultTokenizedEntityIndexes={[0, 1]} />
            );

            expect(element.refs['token_0'].textContent).toBe('apple');
            expect(element.refs['token_1'].textContent).toBe('apricot');
        });
    });

    describe('addToken()', () => {
        it('should accept a single index', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            element.addToken(0);

            expect(element.state.tokenizedEntityIndexes).toContain(0);
        });

        it('should accept multiple indexes', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            element.addToken([0, 1]);

            expect(element.state.tokenizedEntityIndexes).toContain(0);
            expect(element.state.tokenizedEntityIndexes).toContain(1);
        });

        it('should not duplicate if the same token already exists', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            element.addToken(0);
            element.addToken(0);

            expect(element.state.tokenizedEntityIndexes).toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(1);
        });

        it('should focus the input if passed `true` for `focusInput` (2nd arg)', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            document.body.focus();

            expect(document.activeElement).not.toBe(element.refs.typeahead.refs.input);

            element.addToken(0, true);

            expect(document.activeElement).toBe(element.refs.typeahead.refs.input);
        });

        it('should not focus the input if passed `false` for `focusInput` (2nd arg)', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            document.body.focus();

            expect(document.activeElement).not.toBe(element.refs.typeahead.refs.input);

            element.addToken(0, false);

            expect(element.state.tokenizedEntityIndexes).toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(1);

            expect(document.activeElement).not.toBe(element.refs.typeahead.refs.input);
        });

        it('should clear the input if `clearInput` is passed `true` (3rd arg)', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            element.addToken(0, true, true);

            expect(element.state.tokenizedEntityIndexes).toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(1);

            expect(element.refs.typeahead.refs.input.value).toBe('');
        });

        it('should not clear the input if `clearInput` is passed `false` (3rd arg)', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);

            element.addToken(0, false, false);

            expect(element.state.tokenizedEntityIndexes).toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(1);

            expect(element.refs.typeahead.refs.input.value).toBe('ap');
        });
    });

    describe('removeToken()', () => {
        it('should accept a single index', () => {
            const element = render(
                <UITokenizedInput defaultValue='ap' defaultTokenizedEntityIndexes={[0]} entities={entities} />
            );

            expect(element.state.tokenizedEntityIndexes).toContain(0);

            element.removeToken(0);

            expect(element.state.tokenizedEntityIndexes).not.toContain(0);
        });

        it('should accept multiple indexes', () => {
            const element = render(
                <UITokenizedInput defaultValue='ap' defaultTokenizedEntityIndexes={[0, 1]} entities={entities} />
            );

            expect(element.state.tokenizedEntityIndexes).toContain(0);
            expect(element.state.tokenizedEntityIndexes).toContain(1);

            element.removeToken([0, 1]);

            expect(element.state.tokenizedEntityIndexes).not.toContain(0);
            expect(element.state.tokenizedEntityIndexes).not.toContain(1);
        });

        it('should focus the input if passed `true` for `focusInput` (2nd arg)', () => {
            const element = render(
                <UITokenizedInput defaultValue='ap' defaultTokenizedEntityIndexes={[0]} entities={entities} />
            );

            document.body.focus();

            expect(document.activeElement).not.toBe(element.refs.typeahead.refs.input);

            element.removeToken(0, true);

            expect(element.state.tokenizedEntityIndexes).not.toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(0);

            expect(document.activeElement).toBe(element.refs.typeahead.refs.input);
        });

        it('should not focus the input if passed `false` for `focusInput` (2nd arg)', () => {
            const element = render(
                <UITokenizedInput defaultValue='ap' defaultTokenizedEntityIndexes={[0]} entities={entities} />
            );

            document.body.focus();

            expect(document.activeElement).not.toBe(element.refs.typeahead.refs.input);

            element.removeToken(0, false);

            expect(element.state.tokenizedEntityIndexes).not.toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(0);

            expect(document.activeElement).not.toBe(element.refs.typeahead.refs.input);
        });

        it('should clear the input if `clearInput` is passed `true` (3rd arg)', () => {
            const element = render(
                <UITokenizedInput defaultValue='ap' defaultTokenizedEntityIndexes={[0]} entities={entities} />
            );

            element.removeToken(0, true, true);

            expect(element.state.tokenizedEntityIndexes).not.toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(0);

            expect(element.refs.typeahead.refs.input.value).toBe('');
        });

        it('should not clear the input if `clearInput` is passed `false` (3rd arg)', () => {
            const element = render(
                <UITokenizedInput defaultValue='ap' defaultTokenizedEntityIndexes={[0]} entities={entities} />
            );

            element.removeToken(0, false, false);

            expect(element.state.tokenizedEntityIndexes).not.toContain(0);
            expect(element.state.tokenizedEntityIndexes.length).toBe(0);

            expect(element.refs.typeahead.refs.input.value).toBe('ap');
        });
    });

    describe('interactive token creation', () => {
        it('should occur upon entity selection', () => {
            const element = render(<UITokenizedInput defaultValue='ap' entities={entities} />);
            const typeahead = element.refs.typeahead;

            typeahead.handleKeyDown({
                key: 'Enter',
                nativeEvent: {preventDefault: noop},
                target: typeahead.getInputNode()
            });

            expect(element.state.tokenizedEntityIndexes).toContain(0);
        });
    });

    describe('token selection', () => {
        it('should occur when pressing the left arrow key at the start of the input field', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndexes: [0, 1]});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);

            typeahead.focusInput();
            element.handleKeyDown({key: 'ArrowLeft'});

            expect(element.state.tokenizedEntityIndexesSelected).not.toContain(0);
            expect(element.state.tokenizedEntityIndexesSelected).toContain(1);
        });

        it('should not change if pressing the left arrow key with the only token already selected', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndexes: [0],
                tokenizedEntityIndexesSelected: [0]
            });

            typeahead.focusInput();
            element.handleKeyDown({key: 'ArrowLeft'});

            expect(element.state.tokenizedEntityIndexesSelected).toContain(0);
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(1);
        });

        it('should deselect if pressing the right arrow key with the only token already selected and focus the input', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndexes: [0],
                tokenizedEntityIndexesSelected: [0]
            });

            element.refs.wrapper.querySelector('.ui-tokenfield-token').focus();
            element.handleKeyDown({key: 'ArrowRight'});

            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);
            expect(document.activeElement).toBe(typeahead.getInputNode());
        });

        it('should move rightward if the rightmost token is not selected on right arrow key presses', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndexes: [0, 1],
                tokenizedEntityIndexesSelected: [0]
            });

            element.refs.wrapper.querySelector('.ui-tokenfield-token').focus();
            element.handleKeyDown({key: 'ArrowRight'});

            expect(element.state.tokenizedEntityIndexesSelected).toContain(1);
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(1);
        });
    });

    describe('multiple token selection', () => {
        it('should occur when pressing the shift and left arrow keys', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndexes: [0, 1],
                tokenizedEntityIndexesSelected: [1]
            });

            typeahead.focusInput();
            element.handleKeyDown({
                key: 'ArrowLeft',
                shiftKey: true
            });

            expect(element.state.tokenizedEntityIndexesSelected).toContain(0);
            expect(element.state.tokenizedEntityIndexesSelected).toContain(1);
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(2);
        });

        it('should occur when pressing the shift and right arrow keys', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({
                tokenizedEntityIndexes: [0, 1],
                tokenizedEntityIndexesSelected: [0]
            });

            typeahead.focusInput();
            element.handleKeyDown({
                key: 'ArrowRight',
                shiftKey: true
            });

            expect(element.state.tokenizedEntityIndexesSelected).toContain(0);
            expect(element.state.tokenizedEntityIndexesSelected).toContain(1);
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(2);
        });
    });

    describe('interactive token removal', () => {
        it('should occur when pressing the Backspace key with a selected token', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndexes: [0, 1]});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);

            typeahead.focusInput();

            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(1);

            element.handleKeyDown({key: 'Backspace', preventDefault: noop});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);
        });

        it('should occur when clicking a token\'s "close" handle', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndexes: [0, 1]});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);

            typeahead.focusInput();

            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(1);

            element.handleTokenCloseClick(1);
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);
        });
    });

    describe('input focus', () => {
        it('should clear any token selection', () => {
            const element = render(<UITokenizedInput entities={entities} />);
            const typeahead = element.refs.typeahead;

            element.setState({tokenizedEntityIndexes: [0, 1]});

            Simulate.focus(typeahead.refs.input);
            element.handleKeyDown({key: 'ArrowLeft'});
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(1);

            Simulate.focus(typeahead.refs.input);
            expect(element.state.tokenizedEntityIndexesSelected.length).toBe(0);
        });
    });

    describe('onTokenChange callback function', () => {
        it('should be invoked when the internal list of tokens is changed', () => {
            const stub = sinon.stub();
            const element = render(<UITokenizedInput entities={entities} onTokenChange={stub} />);

            element.addToken(0);
            expect(stub.calledWithMatch([0])).toBe(true);

            element.addToken([0, 1]);
            expect(stub.calledWithMatch([0, 1])).toBe(true);

            element.removeToken(1);
            expect(stub.calledWithMatch([0])).toBe(true);
        });
    });
});
