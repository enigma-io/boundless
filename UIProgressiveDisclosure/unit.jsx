/* eslint no-unused-expressions:0 */

import UIProgressiveDisclosure from './index.jsx';
import React from 'react';
import {noop} from 'lodash';

describe('UIProgressiveDisclosure', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the rendered input', () => {
            const disclosure = React.render(<UIProgressiveDisclosure data-id='foo' />, document.body);

            expect(React.findDOMNode(disclosure).getAttribute('data-id')).to.equal('foo');
        });

        it('a teaser string', () => {
            const disclosure = React.render(<UIProgressiveDisclosure teaser='foo' />, document.body);

            expect(React.findDOMNode(disclosure.refs.toggle).textContent).to.equal('foo');
        });

        it('a teaser element', () => {
            const disclosure = React.render(<UIProgressiveDisclosure teaser={<p>foo</p>} />, document.body);

            expect(React.findDOMNode(disclosure.refs.toggle).textContent).to.equal('foo');
        });

        it('string content', () => {
            const disclosure = React.render(<UIProgressiveDisclosure>foo</UIProgressiveDisclosure>, document.body);

            expect(React.findDOMNode(disclosure.refs.content).textContent).to.equal('foo');
        });

        it('element content', () => {
            const disclosure = React.render(<UIProgressiveDisclosure><p>foo</p></UIProgressiveDisclosure>, document.body);

            expect(React.findDOMNode(disclosure.refs.content).textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-disclosure should be rendered', () => {
            const disclosure = React.render(<UIProgressiveDisclosure />, document.body);

            expect(disclosure.getClasses()).to.contain('ui-disclosure');
        });

        it('ui-disclosure-expanded should be rendered when `props.expanded` is `true`', () => {
            const disclosure = React.render(<UIProgressiveDisclosure expanded={true} />, document.body);

            expect(disclosure.getClasses()).to.contain('ui-disclosure-expanded');
        });

        it('ui-disclosure-expanded should not be rendered when `props.expanded` is falsy', () => {
            const disclosure = React.render(<UIProgressiveDisclosure />, document.body);

            expect(disclosure.getClasses()).to.not.contain('ui-disclosure-expanded');
        });
    });

    describe('click on the toggle', () => {
        it('should should show and hide the content', () => {
            const disclosure = React.render(<UIProgressiveDisclosure />, document.body);

            disclosure.handleClick();

            expect(disclosure.getClasses()).to.contain('ui-disclosure-expanded');

            disclosure.handleClick();

            expect(disclosure.getClasses()).to.not.contain('ui-disclosure-expanded');
        });
    });

    describe('enter key on the toggle', () => {
        it('should should show and hide the content', () => {
            const disclosure = React.render(<UIProgressiveDisclosure />, document.body);

            disclosure.handleKeyDown({key: 'Enter', preventDefault: noop});

            expect(disclosure.getClasses()).to.contain('ui-disclosure-expanded');

            disclosure.handleKeyDown({key: 'Enter', preventDefault: noop});

            expect(disclosure.getClasses()).to.not.contain('ui-disclosure-expanded');
        });
    });

    describe('onExpand', () => {
        it('should be called when the disclosure is expanded', () => {
            const stub = sandbox.spy();
            const disclosure = React.render(<UIProgressiveDisclosure onExpand={stub} />, document.body);

            disclosure.handleClick();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be not called on first render if `props.expanded` is `true`', () => {
            const stub = sandbox.spy();
            const disclosure = React.render(<UIProgressiveDisclosure onExpand={stub} expanded={true} />, document.body);

            expect(stub).to.not.have.been.called;
        });
    });

    describe('onHide', () => {
        it('should be called when the disclosure is hidden', () => {
            const stub = sandbox.spy();
            const disclosure = React.render(<UIProgressiveDisclosure onHide={stub} />, document.body);

            disclosure.handleClick();
            disclosure.handleClick();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be not called on first render if `props.expanded` is falsy', () => {
            const stub = sandbox.spy();
            const disclosure = React.render(<UIProgressiveDisclosure onExpand={stub} />, document.body);

            expect(stub).to.not.have.been.called;
        });
    });
});
