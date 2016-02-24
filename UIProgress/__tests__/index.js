/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIProgress from '../../UIProgress';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';

describe('UIProgress', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIProgress));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UIProgress className='foo bar' />);
            const node = element.refs.wrapper;

            ['ui-progress-wrapper', 'foo', 'bar'].forEach(cname => expect(node.classList.contains(cname)).toBe(true));
        });

        it('a specific style property to tween', () => {
            const element = render(<UIProgress progress='0%' tweenProperty='height' />);

            expect(element.refs.progress.getAttribute('style')).toBe('height:0%;');
        });

        it('arbitrary HTML attributes via props.progressProps', () => {
            const element = render(<UIProgress progressProps={{'data-foo': 'bar'}} />);
            const node = element.refs.progress;

            expect(node.hasAttribute('data-foo')).toBe(true);
            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('an additional class via props.progressProps.className', () => {
            const element = render(<UIProgress progressProps={{className: 'foo'}} />);
            const node = element.refs.progress;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.labelProps', () => {
            const element = render(<UIProgress label='hi' labelProps={{'data-foo': 'bar'}} />);
            const node = element.refs.label;

            expect(node.hasAttribute('data-foo')).toBe(true);
            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('an additional class via props.labelProps.className', () => {
            const element = render(<UIProgress label='hi' labelProps={{className: 'foo'}} />);
            const node = element.refs.label;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.cancelProps', () => {
            const element = render(<UIProgress onCancel={sandbox.stub()} cancelProps={{'data-foo': 'bar'}} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            expect(node.hasAttribute('data-foo')).toBe(true);
            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('an additional class via props.cancelProps.className', () => {
            const element = render(<UIProgress onCancel={sandbox.stub()} cancelProps={{className: 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            expect(node.classList.contains('foo')).toBe(true);
        });
    });

    describe('CSS hook', () => {
        let element;

        beforeEach(() => {
            element = render(<UIProgress label='foo' onCancel={function(){}} />);
        });

        it('ui-progress-wrapper should be rendered', () => {
            expect(element.refs.wrapper.classList.contains('ui-progress-wrapper')).toBe(true);
        });

        it('ui-progress should be rendered', () => {
            expect(element.refs.progress.classList.contains('ui-progress')).toBe(true);
        });

        it('ui-progress-indeterminate should be rendered', () => {
            expect(element.refs.progress.classList.contains('ui-progress-indeterminate')).toBe(true);
        });

        it('ui-progress-cancel should be rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.cancel).classList.contains('ui-progress-cancel')).toBe(true);
        });

        it('ui-progress-label should be rendered', () => {
            expect(element.refs.label.classList.contains('ui-progress-label')).toBe(true);
        });
    });

    describe('progress', () => {
        it('should update as the prop is changed', () => {
            const element = render(<UIProgress progress='0%' />);
            const node = element.refs.progress;

            expect(node.getAttribute('style')).toBe('width:0%;');

            render(<UIProgress progress='10%' />);

            expect(node.getAttribute('style')).toBe('width: 10%;');
        });

        it('should not show as indeterminate if `progress` is passed', () => {
            const element = render(<UIProgress progress='0%' />);

            expect(element.refs.progress.classList.contains('ui-progress-indeterminate')).toBe(false);
        });
    });

    describe('cancel button', () => {
        it('should render if the handler is provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIProgress onCancel={stub} />);

            expect(element.refs.cancel).not.toBe(undefined);
        });

        it('should call the cancel handler on click', () => {
            const stub = sandbox.stub();
            const element = render(<UIProgress onCancel={stub} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            node.click();

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('progress label', () => {
        it('should render if provided', () => {
            const element = render(<UIProgress label='50%' />);

            expect(element.refs.label).not.toBe(undefined);
        });
    });
});
