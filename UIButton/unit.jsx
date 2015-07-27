/* eslint no-unused-expressions:0 */

import UIButton from './index.jsx';
import React from 'react';

function noop() {}

describe('UIButton', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const button = React.render(<UIButton name='button1' id='button1' data-id='xr1' />, document.body);
            const node = React.findDOMNode(button);

            expect(node.getAttribute('name')).to.equal('button1');
            expect(node.getAttribute('id')).to.equal('button1');
            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const button = React.render(<UIButton className='big-button' />, document.body);
            const node = React.findDOMNode(button);

            expect(node.className).to.equal('ui-button big-button');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const button = React.render(<UIButton className={['big-button', 'primary-button']} />, document.body);
            const node = React.findDOMNode(button);

            expect(node.className).to.equal('ui-button big-button primary-button');
        });
    });

    describe('CSS hook', () => {
        it('should be rendered for the button', () => {
            const button = React.render(<UIButton />, document.body);
            const node = React.findDOMNode(button);

            expect(node.className).to.contain('ui-button');
        });

        it('should be rendered for a button with provided `props.pressed`', () => {
            const button = React.render(<UIButton pressed={false} />, document.body);
            const node = React.findDOMNode(button);

            expect(node.className).to.contain('ui-button-pressable');
        });

        it('should be rendered for a "pressed" button', () => {
            const button = React.render(<UIButton pressed={true} />, document.body);
            const node = React.findDOMNode(button);

            expect(node.className).to.contain('ui-button-pressed');
        });
    });

    describe('`aria-pressed` HTML attribute', () => {
        it('should be "true" if `props.pressed` is `true`', () => {
            const button = React.render(<UIButton pressed={true} />, document.body);
            const node = React.findDOMNode(button);

            expect(node.getAttribute('aria-pressed')).to.equal('true');
        });

        it('should be "false" if `props.pressed` is `false`', () => {
            const button = React.render(<UIButton pressed={false} />, document.body);
            const node = React.findDOMNode(button);

            expect(node.getAttribute('aria-pressed')).to.equal('false');
        });

        it('should not be applied if `props.pressed` is not provided', () => {
            const button = React.render(<UIButton />, document.body);
            const node = React.findDOMNode(button);

            expect(node.hasAttribute('aria-pressed')).to.be.false;
        });
    });

    describe('on click', () => {
        let eventStub = {preventDefault: noop};

        it('should trigger `onClick`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton onClick={stub} />, document.body);

            button.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should toggle `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton pressed={true} onUnpressed={stub} />, document.body);

            button.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should toggle `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton pressed={false} onPressed={stub} />, document.body);

            button.handleClick(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not toggle `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const button = React.render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />, document.body);

            button.handleClick(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });

    describe('on "Enter" key', () => {
        let eventStub = {key: 'Enter', preventDefault: noop};

        it('should toggle `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton pressed={true} onUnpressed={stub} />, document.body);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should toggle `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton pressed={false} onPressed={stub} />, document.body);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not toggle `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const button = React.render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />, document.body);

            button.handleKeyDown(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });

    describe('on "Space" key', () => {
        let eventStub = {key: 'Space', preventDefault: noop};

        it('should toggle `onUnpressed` if `props.pressed` is `true`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton pressed={true} onUnpressed={stub} />, document.body);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should toggle `onPressed` if `props.pressed` is `false`', () => {
            const stub = sandbox.stub();
            const button = React.render(<UIButton pressed={false} onPressed={stub} />, document.body);

            button.handleKeyDown(eventStub);

            expect(stub).to.have.been.calledOnce;
        });

        it('should not toggle `onPressed` or `onUnpressed` if `props.pressed` is not provided', () => {
            const pressedStub = sandbox.stub();
            const unpressedStub = sandbox.stub();
            const button = React.render(<UIButton onPressed={pressedStub} onUnpressed={unpressedStub} />, document.body);

            button.handleKeyDown(eventStub);

            expect(pressedStub).to.not.have.been.called;
            expect(unpressedStub).to.not.have.been.called;
        });
    });
});
