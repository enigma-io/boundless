/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIProgressiveDisclosure from '../../UIProgressiveDisclosure';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';
import {assert, expect} from 'chai';

describe('UIProgressiveDisclosure', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIProgressiveDisclosure));

    describe('accepts', () => {
        it('a teaser string', () => {
            const element = render(<UIProgressiveDisclosure teaser='foo' />);

            expect(element.refs.toggle.textContent).to.equal('foo');
        });

        it('a teaser element', () => {
            const element = render(<UIProgressiveDisclosure teaser={<p>foo</p>} />);

            expect(element.refs.toggle.textContent).to.equal('foo');
        });

        it('string content', () => {
            const element = render(<UIProgressiveDisclosure>foo</UIProgressiveDisclosure>);

            expect(element.refs.content.textContent).to.equal('foo');
        });

        it('element content', () => {
            const element = render(<UIProgressiveDisclosure><p>foo</p></UIProgressiveDisclosure>);

            expect(element.refs.content.textContent).to.equal('foo');
        });

        it('arbitrary HTML attributes via props.toggleAttrs', () => {
            const element = render(<UIProgressiveDisclosure toggleAttrs={{'data-foo': 'bar'}} />);
            const node = element.refs.toggle;

            expect(node.getAttribute('data-foo')).to.equal('bar');
        });

        it('additional classes via props.toggleAttrs.className', () => {
            const element = render(<UIProgressiveDisclosure toggleAttrs={{className: 'foo'}} />);
            const node = element.refs.toggle;

            expect(node.classList.contains('foo')).to.be.true;
        });
    });

    describe('CSS hook', () => {
        it('ui-disclosure should be rendered', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            assert(node.classList.contains('ui-disclosure'));
        });

        it('ui-disclosure-expanded should be rendered when `props.expanded` is `true`', () => {
            const element = render(<UIProgressiveDisclosure expanded={true} />);
            const node = element.refs.wrapper;

            assert(node.classList.contains('ui-disclosure-expanded'));
        });

        it('ui-disclosure-expanded should not be rendered when `props.expanded` is falsy', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            assert(node.classList.contains('ui-disclosure-expanded') === false);
        });
    });

    describe('click on the toggle', () => {
        it('should should show and hide the content', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            element.handleClick();
            assert(node.classList.contains('ui-disclosure-expanded'));

            element.handleClick();
            assert(node.classList.contains('ui-disclosure-expanded') === false);
        });
    });

    describe('enter key on the toggle', () => {
        it('should should show and hide the content', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            element.handleKeyDown({key: 'Enter', preventDefault: noop});
            assert(node.classList.contains('ui-disclosure-expanded'));

            element.handleKeyDown({key: 'Enter', preventDefault: noop});
            assert(node.classList.contains('ui-disclosure-expanded') === false);
        });
    });

    describe('onExpand', () => {
        it('should be called when the disclosure is expanded', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onExpand={stub} />);

            element.handleClick();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be not called on first render if `props.expanded` is `true`', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onExpand={stub} expanded={true} />);

            expect(stub).to.not.have.been.called;
        });
    });

    describe('onHide', () => {
        it('should be called when the disclosure is hidden', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onHide={stub} />);

            element.handleClick();
            element.handleClick();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be not called on first render if `props.expanded` is falsy', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onExpand={stub} />);

            expect(stub).to.not.have.been.called;
        });
    });
});
