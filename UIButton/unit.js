/* eslint no-unused-expressions:0 */

import UIButton from './index';
import React from 'react';
import ReactDOM from 'react-dom';

function noop() {}

describe('UIButton', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const button = ReactDOM.render(<UIButton data-id='foo' />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('additional classes as a string without replacing the core hook', () => {
            const button = ReactDOM.render(<UIButton className='foo bar' />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            ['ui-button', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });
    });

    describe('CSS hook', () => {
        it('ui-button should be rendered', () => {
            const button = ReactDOM.render(<UIButton />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            assert(node.classList.contains('ui-button'));
        });

        it('ui-button-pressable should be rendered when provided `props.pressed`', () => {
            const button = ReactDOM.render(<UIButton pressed={false} />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            assert(node.classList.contains('ui-button-pressable'));
        });

        it('ui-button-pressed should be rendered when `props.pressed` is `true`', () => {
            const button = ReactDOM.render(<UIButton pressed={true} />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            assert(node.classList.contains('ui-button-pressed'));
        });
    });

    describe('`aria-pressed` HTML attribute', () => {
        it('should be "true" if `props.pressed` is `true`', () => {
            const button = ReactDOM.render(<UIButton pressed={true} />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            expect(node.getAttribute('aria-pressed')).to.equal('true');
        });

        it('should be "false" if `props.pressed` is `false`', () => {
            const button = ReactDOM.render(<UIButton pressed={false} />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            expect(node.getAttribute('aria-pressed')).to.equal('false');
        });

        it('should not be applied if `props.pressed` is not provided', () => {
            const button = ReactDOM.render(<UIButton />, mountNode);
            const node = ReactDOM.findDOMNode(button);

            expect(node.hasAttribute('aria-pressed')).to.be.false;
        });
    });

    describe('on click', () => {
        let eventStub = {preventDefault: noop};

        it('should trigger `onClick`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton onClick={stub} />, mountNode);

            button.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton pressed={true} onUnpressed={stub} />, mountNode);

            button.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton pressed={false} onPressed={stub} />, mountNode);

            button.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const button = ReactDOM.render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />, mountNode);

            button.handleClick(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });

    describe('on "Enter" key', () => {
        let eventStub = {key: 'Enter', preventDefault: noop};

        it('should trigger `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton pressed={true} onUnpressed={stub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton pressed={false} onPressed={stub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onClick` if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton onClick={stub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const button = ReactDOM.render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });

    describe('on "Space" key', () => {
        let eventStub = {key: 'Space', preventDefault: noop};

        it('should trigger `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton pressed={true} onUnpressed={stub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton pressed={false} onPressed={stub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should trigger `onClick` if `props.pressed` is not provided', () => {
            const stub = sandbox.stub();
            const button = ReactDOM.render(<UIButton onClick={stub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const button = ReactDOM.render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />, mountNode);

            button.handleKeyDown(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });
});
