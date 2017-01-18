/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import Progress from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

import sinon from 'sinon';

describe('Progress component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Progress));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<Progress className='foo bar' />);
            const node = element.refs.wrapper;

            ['b-progress-wrapper', 'foo', 'bar'].forEach((cname) => expect(node.classList.contains(cname)).toBe(true));
        });

        it('a specific style property to tween', () => {
            const element = render(<Progress progress='0%' tweenProperty='height' />);

            expect(element.refs.progress.getAttribute('style')).toBe('height: 0%;');
        });

        it('arbitrary HTML attributes via props.progressProps', () => {
            const element = render(<Progress progressProps={{'data-foo': 'bar'}} />);
            const node = element.refs.progress;

            expect(node.hasAttribute('data-foo')).toBe(true);
            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('an additional class via props.progressProps.className', () => {
            const element = render(<Progress progressProps={{className: 'foo'}} />);
            const node = element.refs.progress;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.labelProps', () => {
            const element = render(<Progress label='hi' labelProps={{'data-foo': 'bar'}} />);
            const node = element.refs.label;

            expect(node.hasAttribute('data-foo')).toBe(true);
            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('an additional class via props.labelProps.className', () => {
            const element = render(<Progress label='hi' labelProps={{className: 'foo'}} />);
            const node = element.refs.label;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.cancelProps', () => {
            const element = render(<Progress onCancel={sandbox.stub()} cancelProps={{'data-foo': 'bar'}} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            expect(node.hasAttribute('data-foo')).toBe(true);
            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('an additional class via props.cancelProps.className', () => {
            const element = render(<Progress onCancel={sandbox.stub()} cancelProps={{className: 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            expect(node.classList.contains('foo')).toBe(true);
        });
    });

    describe('CSS hook', () => {
        let element;

        beforeEach(() => {
            element = render(<Progress label='foo' onCancel={() => {}} />);
        });

        it('renders .b-progress-wrapper', () => {
            expect(element.refs.wrapper.classList.contains('b-progress-wrapper')).toBe(true);
        });

        it('renders .b-progress', () => {
            expect(element.refs.progress.classList.contains('b-progress')).toBe(true);
        });

        it('renders .b-progress-indeterminate', () => {
            expect(element.refs.progress.classList.contains('b-progress-indeterminate')).toBe(true);
        });

        it('renders .b-progress-cancel', () => {
            expect(ReactDOM.findDOMNode(element.refs.cancel).classList.contains('b-progress-cancel')).toBe(true);
        });

        it('renders .b-progress-label', () => {
            expect(element.refs.label.classList.contains('b-progress-label')).toBe(true);
        });
    });

    describe('progress', () => {
        it('updates as the prop is changed', () => {
            const element = render(<Progress progress='0%' />);
            const node = element.refs.progress;

            expect(node.getAttribute('style')).toBe('width: 0%;');

            render(<Progress progress='10%' />);

            expect(node.getAttribute('style')).toBe('width: 10%;');
        });

        it('does not show as indeterminate if `progress` is passed', () => {
            const element = render(<Progress progress='0%' />);

            expect(element.refs.progress.classList.contains('b-progress-indeterminate')).toBe(false);
        });
    });

    describe('cancel button', () => {
        it('renders if the handler is provided', () => {
            const stub = sandbox.stub();
            const element = render(<Progress onCancel={stub} />);

            expect(element.refs.cancel).not.toBe(undefined);
        });

        it('does not render if no handler is provided', () => {
            const element = render(<Progress />);

            expect(element.refs.cancel).toBe(undefined);
        });

        it('calls the cancel handler on click', () => {
            const stub = sandbox.stub();
            const element = render(<Progress onCancel={stub} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            node.click();

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('progress label', () => {
        it('renders if provided', () => {
            const element = render(<Progress label='50%' />);

            expect(element.refs.label).not.toBe(undefined);
        });
    });
});
