/* eslint no-unused-expressions:0 */

import UIButton from './index.jsx';
import React from 'react';

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
    });

    describe('on click', () => {
        let eventStub = {persist: function noop() {}};

        it('should trigger `onClick` if it was a single click', () => {
            const clickStub = sandbox.stub();
            const button = React.render(<UIButton onClick={clickStub} />, document.body);

            button.handleClick(eventStub);

            expect(clickStub).to.have.been.calledOnce;
        });

        it('should trigger `onDoubleClick` if two single clicks arrive within 300ms', () => {
            const clickStub = sandbox.stub();
            const doubleClickStub = sandbox.stub();
            const button = React.render(
                <UIButton onClick={clickStub} onDoubleClick={doubleClickStub} />,
                document.body
            );

            button.handleClick(eventStub);
            button.handleClick(eventStub);

            expect(doubleClickStub).to.have.been.calledOnce;
        });

        it('should not trigger `onClick` if two single clicks arrive within 300ms and `onDoubleClick` is provided', () => {
            const clickStub = sandbox.stub();
            const doubleClickStub = sandbox.stub();
            const button = React.render(
                <UIButton onClick={clickStub} onDoubleClick={doubleClickStub} />,
                document.body
            );

            button.handleClick(eventStub);
            button.handleClick(eventStub);

            expect(clickStub).to.not.have.been.called;
        });
    });

    describe('autofocus', () => {
        it('should appropriately set focus on first render', () => {
            const box = React.render(<UIButton autofocus={true}>Focused</UIButton>, document.body);

            expect(document.activeElement).to.equal(React.findDOMNode(box));
        });
    });
});
