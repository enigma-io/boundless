/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';
import noop from '../UIUtils/noop';
import sinon from 'sinon';

import UIButton from './index';

describe('UIButton component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const evt = {preventDefault: noop};
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIButton));

    it('renders ui-button', () => {
        const element = render(<UIButton />);
        const node = element.refs.button;

        expect(node.classList.contains('ui-button')).toBe(true);
    });

    it('renders ui-button-pressable when provided `props.pressed`', () => {
        const element = render(<UIButton pressed={false} />);
        const node = element.refs.button;

        expect(node.classList.contains('ui-button-pressable')).toBe(true);
    });

    it('renders ui-button-pressed when `props.pressed` is `true`', () => {
        const element = render(<UIButton pressed={true} />);
        const node = element.refs.button;

        expect(node.classList.contains('ui-button-pressed')).toBe(true);
    });

    describe('`aria-pressed` HTML attribute', () => {
        it('is "true" if `props.pressed` is `true`', () => {
            const element = render(<UIButton pressed={true} />);
            const node = element.refs.button;

            expect(node.getAttribute('aria-pressed')).toBe('true');
        });

        it('is "false" if `props.pressed` is `false`', () => {
            const element = render(<UIButton pressed={false} />);
            const node = element.refs.button;

            expect(node.getAttribute('aria-pressed')).toBe('false');
        });

        it('is not be applied if `props.pressed` is not provided', () => {
            const element = render(<UIButton />);
            const node = element.refs.button;

            expect(node.hasAttribute('aria-pressed')).toBe(false);
        });
    });

    describe('on click', () => {
        it('triggers `props.onClick` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onClick={stub} />);

            element.handleClick(evt);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={true} onUnpressed={stub} />);

            element.handleClick(evt);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={false} onPressed={stub} />);

            element.handleClick(evt);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onPressed` even if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onPressed={stub} />);

            element.handleClick(evt);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('will not trigger `onPressed` if the button is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onPressed={stub} disabled />);

            element.handleClick(evt);

            expect(stub.called).toBe(false);
        });
    });

    describe('on "Enter" key', () => {
        it('triggers `props.onKeyDown` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onKeyDown={stub} />);

            element.handleKeyDown({...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={true} onUnpressed={stub} />);

            element.handleKeyDown({...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={false} onPressed={stub} />);

            element.handleKeyDown({...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onPressed` even if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onPressed={stub} />);

            element.handleKeyDown({...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('will not trigger `onPressed` if the button is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onPressed={stub} disabled />);

            element.handleKeyDown({...evt, key: 'Enter'});

            expect(stub.called).toBe(false);
        });
    });

    describe('on "Space" key', () => {
        it('triggers `props.onKeyDown` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onKeyDown={stub} />);

            element.handleKeyDown({...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={true} onUnpressed={stub} />);

            element.handleKeyDown({...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={false} onPressed={stub} />);

            element.handleKeyDown({...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('triggers `onPressed` even if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onPressed={stub} />);

            element.handleKeyDown({...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(evt)).toBe(true);
        });

        it('will not trigger `onPressed` if the button is disabled', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onPressed={stub} disabled />);

            element.handleKeyDown({...evt, key: 'Space'});

            expect(stub.called).toBe(false);
        });
    });

    it('on non-handled keydown, it triggers `props.onKeyDown` if provided', () => {
        const stub = sandbox.stub();
        const element = render(<UIButton onKeyDown={stub} />);

        element.handleKeyDown({...evt, key: '*'});

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWithMatch(evt)).toBe(true);
    });
});
