/* eslint no-unused-expressions:0 */

import {createElement} from 'react';
import ReactDOM from 'react-dom';
import {noop} from 'lodash';
import sinon from 'sinon';

import ProgressiveDisclosure from './index';
import {$, conformanceChecker} from '../boundless-utils-test-helpers/index';

describe('ProgressiveDisclosure component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);
    const event = {preventDefault: noop};

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, ProgressiveDisclosure));

    it('renders .b-disclosure', () => {
        render(<ProgressiveDisclosure />);
        expect($('.b-disclosure')).not.toBeNull();
    });

    it('renders .b-disclosure-expanded when `props.expanded` is `true`', () => {
        render(<ProgressiveDisclosure expanded={true} />);
        expect($('.b-disclosure-expanded')).not.toBeNull();
    });

    it('does not render .b-disclosure-expanded when `props.expanded` is falsy', () => {
        render(<ProgressiveDisclosure />);
        expect($('.b-disclosure-expanded')).toBeNull();
    });

    it('accepts a teaser string', () => {
        render(<ProgressiveDisclosure toggleContent='foo' />);
        expect($('.b-disclosure-toggle').textContent).toBe('foo');
    });

    it('accepts a teaser element', () => {
        render(<ProgressiveDisclosure toggleContent={<p>foo</p>} />);
        expect($('.b-disclosure-toggle').textContent).toBe('foo');
    });

    it('accepts string content', () => {
        render(<ProgressiveDisclosure expanded={true}>foo</ProgressiveDisclosure>);
        expect($('.b-disclosure-content').textContent).toBe('foo');
    });

    it('accepts element content', () => {
        render(<ProgressiveDisclosure expanded={true}><p>foo</p></ProgressiveDisclosure>);
        expect($('.b-disclosure-content').textContent).toBe('foo');
    });

    it('accepts arbitrary HTML attributes via props.toggleProps', () => {
        render(<ProgressiveDisclosure toggleProps={{'data-foo': 'bar'}} />);
        expect($('.b-disclosure-toggle[data-foo="bar"]')).not.toBeNull();
    });

    it('accepts additional classes via props.toggleProps.className', () => {
        render(<ProgressiveDisclosure toggleProps={{className: 'foo'}} />);
        expect($('.b-disclosure-toggle.foo')).not.toBeNull();
    });

    describe('toggle', () => {
        it('accepts a customized component type', () => {
            render(<ProgressiveDisclosure toggleComponent='article' toggleContent='foo' />);
            expect($('article.b-disclosure-toggle')).not.toBeNull();
        });

        it('renders the content in props.toggleContent while unexpanded', () => {
            render(<ProgressiveDisclosure toggleContent='foo' />);
            expect($('.b-disclosure-toggle').textContent).toBe('foo');
        });

        it('accepts JSX', () => {
            const element = render(<ProgressiveDisclosure toggleContent={<p>foo</p>} toggleExpandedContent={<p>bar</p>} />);

            expect($('.b-disclosure-toggle').textContent).toBe('foo');

            element.handleClick();

            expect($('.b-disclosure-toggle').textContent).toBe('bar');
            expect($('.b-disclosure-expanded')).not.toBeNull();
        });

        it('renders the content in props.toggleContentExpanded while expanded', () => {
            const element = render(<ProgressiveDisclosure toggleContent='foo' toggleExpandedContent='bar' />);

            expect($('.b-disclosure-toggle').textContent).toBe('foo');

            element.handleClick();

            expect($('.b-disclosure-toggle').textContent).toBe('bar');
            expect($('.b-disclosure-expanded')).not.toBeNull();
        });

        it('renders the content in props.toggleContent while expanded if props.toggleContentExpanded is not provided', () => {
            const element = render(<ProgressiveDisclosure toggleContent='foo' />);

            expect($('.b-disclosure-toggle').textContent).toBe('foo');

            element.handleClick();

            expect($('.b-disclosure-toggle').textContent).toBe('foo');
            expect($('.b-disclosure-expanded')).not.toBeNull();
        });
    });

    describe('click on the toggle', () => {
        it('shows and hides the content', () => {
            const element = render(<ProgressiveDisclosure />);

            element.handleClick();
            expect($('.b-disclosure-expanded')).not.toBeNull();

            element.handleClick();
            expect($('.b-disclosure-expanded')).toBeNull();
        });

        it('proxies the event to `props.toggleProps.onClick` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<ProgressiveDisclosure toggleProps={{onClick: stub}} />);

            element.handleClick(event);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(event)).toBe(true);
        });
    });

    describe('enter key on the toggle', () => {
        it('shows and hides the content', () => {
            const element = render(<ProgressiveDisclosure />);

            element.handleKeyDown({key: 'Enter', preventDefault: noop});
            expect($('.b-disclosure-expanded')).not.toBeNull();

            element.handleKeyDown({key: 'Enter', preventDefault: noop});
            expect($('.b-disclosure-expanded')).toBeNull();
        });

        it('proxies the event to `props.toggleProps.onKeyDown` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<ProgressiveDisclosure toggleProps={{onKeyDown: stub}} />);

            element.handleKeyDown(event);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(event)).toBe(true);
        });
    });

    describe('rerendering with a changed `props.expanded`', () => {
        it('shows and hides the content', () => {
            render(<ProgressiveDisclosure />);
            expect($('.b-disclosure-expanded')).toBeNull();

            render(<ProgressiveDisclosure expanded />);
            expect($('.b-disclosure-expanded')).not.toBeNull();
        });

        it('calls `props.onExpand` if `props.expanded` is now true', () => {
            const stub = sandbox.stub();

            render(<ProgressiveDisclosure onExpand={stub} />);
            expect(stub.called).toBe(false);

            render(<ProgressiveDisclosure onExpand={stub} expanded />);
            expect(stub.calledOnce).toBe(true);
        });

        it('calls `props.onHide` if `props.expanded` is now false', () => {
            const stub = sandbox.stub();

            render(<ProgressiveDisclosure onHide={stub} expanded />);
            expect(stub.called).toBe(false);

            render(<ProgressiveDisclosure onHide={stub} />);
            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('onExpand', () => {
        it('is called when the disclosure is expanded', () => {
            const stub = sandbox.spy();
            const element = render(<ProgressiveDisclosure onExpand={stub} />);

            element.handleClick();

            expect(stub.calledOnce).toBe(true);
        });

        it('is not called on first render if `props.expanded` is `true`', () => {
            const stub = sandbox.spy();

            render(<ProgressiveDisclosure onExpand={stub} expanded={true} />);
            expect(stub.called).toBe(false);
        });
    });

    describe('onHide', () => {
        it('is called when the disclosure is hidden', () => {
            const stub = sandbox.spy();
            const element = render(<ProgressiveDisclosure onHide={stub} />);

            element.handleClick();
            element.handleClick();

            expect(stub.calledOnce).toBe(true);
        });

        it('is not called on first render if `props.expanded` is falsy', () => {
            const stub = sandbox.spy();

            render(<ProgressiveDisclosure onExpand={stub} />);
            expect(stub.called).toBe(false);
        });
    });
});
