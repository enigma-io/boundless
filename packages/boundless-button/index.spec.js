/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';
import sinon from 'sinon';

import {$, conformanceChecker} from '../boundless-utils-test-helpers/index';
import Button from './index';

describe('Button component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const evt = {preventDefault: () => {}};
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Button));

    it('renders b-button', () => {
        render(<Button />);
        expect($('.b-button')).not.toBeNull();
    });

    it('renders b-button as custom element when provided `props.component`', () => {
        render(<Button className='foo' component='div' />);
        expect($('div.foo')).not.toBeNull();
    });

    it('renders b-button-pressable when provided `props.pressed`', () => {
        render(<Button pressed={false} />);
        expect($('.b-button-pressable')).not.toBeNull();
    });

    it('renders b-button-pressed when `props.pressed` is `true`', () => {
        render(<Button pressed={true} />);
        expect($('.b-button-pressed')).not.toBeNull();
    });

    describe('`aria-pressed` HTML attribute', () => {
        it('is "true" if `props.pressed` is `true`', () => {
            render(<Button pressed={true} />);
            expect($('.b-button[aria-pressed=true]')).not.toBeNull();
        });

        it('is "false" if `props.pressed` is `false`', () => {
            render(<Button pressed={false} />);
            expect($('.b-button[aria-pressed=false]')).not.toBeNull();
        });

        it('is not be applied if `props.pressed` is not provided', () => {
            render(<Button />);
            expect($('.b-button')).not.toBeNull();
            expect($('.b-button[aria-pressed]')).toBeNull();
        });
    });

    describe('on click', () => {
        it('triggers `props.onClick` if provided', () => {
            const stub = sandbox.stub();

            render(<Button onClick={stub} />);
            Simulate.click($('.b-button'));

            expect(stub.calledOnce).toBe(true);
        });

        it('passes the synthetic event along to props.onClick', () => {
            const stub = sandbox.stub();

            render(<Button onClick={stub} />);
            Simulate.click($('.b-button'));

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({type: 'click'}));
        });

        it('triggers `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();

            render(<Button pressed={true} onUnpressed={stub} />);
            Simulate.click($('.b-button'));

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();

            render(<Button pressed={false} onPressed={stub} />);
            Simulate.click($('.b-button'));

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers `onPressed` even if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();

            render(<Button onPressed={stub} />);
            Simulate.click($('.b-button'));

            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `onPressed` if the button is disabled', () => {
            const stub = sandbox.stub();

            render(<Button onPressed={stub} disabled />);
            Simulate.click($('.b-button'));

            expect(stub.called).toBe(false);
        });
    });

    it('on non-handled keydown, it triggers `props.onKeyDown` if provided', () => {
        const stub = sandbox.stub();

        render(<Button onKeyDown={stub} />);
        Simulate.keyDown($('.b-button'), {...evt, key: 'Escape'});

        expect(stub.calledOnce).toBe(true);
    });

    describe('on "Enter" key', () => {
        it('triggers `props.onKeyDown` if provided', () => {
            const stub = sandbox.stub();

            render(<Button onKeyDown={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
        });

        it('passes the synthetic event along to props.onKeyDown', () => {
            const stub = sandbox.stub();

            render(<Button onKeyDown={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({type: 'keydown', key: 'Enter'})).toBe(true);
        });

        it('triggers `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();

            render(<Button pressed={true} onUnpressed={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();

            render(<Button pressed={false} onPressed={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers `onPressed` even if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();

            render(<Button onPressed={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Enter'});

            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `onPressed` if the button is disabled', () => {
            const stub = sandbox.stub();

            render(<Button onPressed={stub} disabled />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Enter'});

            expect(stub.called).toBe(false);
        });
    });

    describe('on "Space" key', () => {
        it('triggers `props.onKeyDown` if provided', () => {
            const stub = sandbox.stub();

            render(<Button onKeyDown={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
        });

        it('passes the synthetic event along to props.onKeyDown', () => {
            const stub = sandbox.stub();

            render(<Button onKeyDown={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({type: 'keydown', key: 'Space'})).toBe(true);
        });

        it('triggers `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();

            render(<Button pressed={true} onUnpressed={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();

            render(<Button pressed={false} onPressed={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
        });

        it('triggers `onPressed` even if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();

            render(<Button onPressed={stub} />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Space'});

            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `onPressed` if the button is disabled', () => {
            const stub = sandbox.stub();

            render(<Button onPressed={stub} disabled />);
            Simulate.keyDown($('.b-button'), {...evt, key: 'Space'});

            expect(stub.called).toBe(false);
        });
    });
});
