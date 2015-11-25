/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../../UIUtils/conform';

import UIButton from '../../UIButton';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';
import {assert, expect} from 'chai';

describe('UIButton', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIButton));

    describe('CSS hook', () => {
        it('ui-button should be rendered', () => {
            const element = render(<UIButton />);
            const node = element.refs.button;

            assert(node.classList.contains('ui-button'));
        });

        it('ui-button-pressable should be rendered when provided `props.pressed`', () => {
            const element = render(<UIButton pressed={false} />);
            const node = element.refs.button;

            assert(node.classList.contains('ui-button-pressable'));
        });

        it('ui-button-pressed should be rendered when `props.pressed` is `true`', () => {
            const element = render(<UIButton pressed={true} />);
            const node = element.refs.button;

            assert(node.classList.contains('ui-button-pressed'));
        });
    });

    describe('`aria-pressed` HTML attribute', () => {
        it('should be "true" if `props.pressed` is `true`', () => {
            const element = render(<UIButton pressed={true} />);
            const node = element.refs.button;

            expect(node.getAttribute('aria-pressed')).to.equal('true');
        });

        it('should be "false" if `props.pressed` is `false`', () => {
            const element = render(<UIButton pressed={false} />);
            const node = element.refs.button;

            expect(node.getAttribute('aria-pressed')).to.equal('false');
        });

        it('should not be applied if `props.pressed` is not provided', () => {
            const element = render(<UIButton />);
            const node = element.refs.button;

            expect(node.hasAttribute('aria-pressed')).to.be.false;
        });
    });

    describe('on click', () => {
        let eventStub = {preventDefault: noop};

        it('should trigger `onClick`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onClick={stub} />);

            element.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={true} onUnpressed={stub} />);

            element.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={false} onPressed={stub} />);

            element.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const element = render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />);

            element.handleClick(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });

    describe('on "Enter" key', () => {
        let eventStub = {key: 'Enter', preventDefault: noop};

        it('should trigger `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={true} onUnpressed={stub} />);

            element.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={false} onPressed={stub} />);

            element.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onClick` if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onClick={stub} />);

            element.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const element = render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />);

            element.handleKeyDown(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });

    describe('on "Space" key', () => {
        let eventStub = {key: 'Space', preventDefault: noop};

        it('should trigger `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={true} onUnpressed={stub} />);

            element.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton pressed={false} onPressed={stub} />);

            element.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onClick` if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIButton onClick={stub} />);

            element.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const element = render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />);

            element.handleKeyDown(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });
});
