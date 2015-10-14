/* eslint no-unused-expressions:0 */

import UIProgressiveDisclosure from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import {noop} from 'lodash';

describe('UIProgressiveDisclosure', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the rendered input', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure data-id='foo' />, mountNode);

            expect(ReactDOM.findDOMNode(disclosure).getAttribute('data-id')).to.equal('foo');
        });

        it('a teaser string', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure teaser='foo' />, mountNode);

            expect(disclosure.refs.toggle.textContent).to.equal('foo');
        });

        it('a teaser element', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure teaser={<p>foo</p>} />, mountNode);

            expect(disclosure.refs.toggle.textContent).to.equal('foo');
        });

        it('string content', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure>foo</UIProgressiveDisclosure>, mountNode);

            expect(disclosure.refs.content.textContent).to.equal('foo');
        });

        it('element content', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure><p>foo</p></UIProgressiveDisclosure>, mountNode);

            expect(disclosure.refs.content.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-disclosure should be rendered', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure />, mountNode);
            const node = ReactDOM.findDOMNode(disclosure);

            assert(node.classList.contains('ui-disclosure'));
        });

        it('ui-disclosure-expanded should be rendered when `props.expanded` is `true`', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure expanded={true} />, mountNode);
            const node = ReactDOM.findDOMNode(disclosure);

            assert(node.classList.contains('ui-disclosure-expanded'));
        });

        it('ui-disclosure-expanded should not be rendered when `props.expanded` is falsy', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure />, mountNode);
            const node = ReactDOM.findDOMNode(disclosure);

            assert(node.classList.contains('ui-disclosure-expanded') === false);
        });
    });

    describe('click on the toggle', () => {
        it('should should show and hide the content', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure />, mountNode);
            const node = ReactDOM.findDOMNode(disclosure);

            disclosure.handleClick();
            assert(node.classList.contains('ui-disclosure-expanded'));

            disclosure.handleClick();
            assert(node.classList.contains('ui-disclosure-expanded') === false);
        });
    });

    describe('enter key on the toggle', () => {
        it('should should show and hide the content', () => {
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure />, mountNode);
            const node = ReactDOM.findDOMNode(disclosure);

            disclosure.handleKeyDown({key: 'Enter', preventDefault: noop});
            assert(node.classList.contains('ui-disclosure-expanded'));

            disclosure.handleKeyDown({key: 'Enter', preventDefault: noop});
            assert(node.classList.contains('ui-disclosure-expanded') === false);
        });
    });

    describe('onExpand', () => {
        it('should be called when the disclosure is expanded', () => {
            const stub = sandbox.spy();
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure onExpand={stub} />, mountNode);

            disclosure.handleClick();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be not called on first render if `props.expanded` is `true`', () => {
            const stub = sandbox.spy();
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure onExpand={stub} expanded={true} />, mountNode);

            expect(stub).to.not.have.been.called;
        });
    });

    describe('onHide', () => {
        it('should be called when the disclosure is hidden', () => {
            const stub = sandbox.spy();
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure onHide={stub} />, mountNode);

            disclosure.handleClick();
            disclosure.handleClick();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be not called on first render if `props.expanded` is falsy', () => {
            const stub = sandbox.spy();
            const disclosure = ReactDOM.render(<UIProgressiveDisclosure onExpand={stub} />, mountNode);

            expect(stub).to.not.have.been.called;
        });
    });
});
