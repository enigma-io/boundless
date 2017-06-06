/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Progress from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Progress component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Progress));

    it('renders .b-progress-wrapper', () => {
        render(<Progress />);
        expect($('.b-progress-wrapper')).not.toBeNull();
    });

    it('renders .b-progress', () => {
        render(<Progress progress='5%' />);
        expect($('.b-progress')).not.toBeNull();
    });

    it('renders .b-progress-indeterminate', () => {
        render(<Progress onCancel={() => {}} />);
        expect($('.b-progress-indeterminate')).not.toBeNull();
    });

    it('renders .b-progress-cancel', () => {
        render(<Progress onCancel={() => {}} />);
        expect($('.b-progress-cancel')).not.toBeNull();
    });

    it('accepts a specific style property to tween', () => {
        render(<Progress progress='0%' tweenProperty='height' />);
        expect($('.b-progress').getAttribute('style')).toBe('height: 0%;');
    });

    it('accepts arbitrary HTML attributes via props.progressProps', () => {
        render(<Progress progressProps={{ 'data-foo': 'bar' }} />);
        expect($('.b-progress[data-foo="bar"]')).not.toBeNull();
    });

    it('accepts an additional class via props.progressProps.className', () => {
        render(<Progress progressProps={{ className: 'foo' }} />);
        expect($('.b-progress.foo')).not.toBeNull();
    });

    it('accepts arbitrary HTML attributes via props.cancelProps', () => {
        render(<Progress onCancel={sandbox.stub()} cancelProps={{ 'data-foo': 'bar' }} />);
        expect($('.b-progress-cancel[data-foo="bar"]')).not.toBeNull();
    });

    it('accepts an additional class via props.cancelProps.className', () => {
        render(<Progress onCancel={sandbox.stub()} cancelProps={{ className: 'foo' }} />);
        expect($('.b-progress-cancel.foo')).not.toBeNull();
    });

    it('accepts a different wrapper component type', () => {
        render(<Progress component='article' />);
        expect($('article.b-progress-wrapper')).not.toBeNull();
    });

    it('accepts a different progress component type', () => {
        render(<Progress progressComponent='article' />);
        expect($('article.b-progress')).not.toBeNull();
    });

    it('accepts a different cancel component type', () => {
        render(<Progress cancelComponent='i' onCancel={() => {}} />);
        expect($('i.b-progress-cancel')).not.toBeNull();
    });

    describe('progress', () => {
        it('updates as the prop is changed', () => {
            render(<Progress progress='0%' />);

            const node = $('.b-progress');

            expect(node.getAttribute('style')).toBe('width: 0%;');
            render(<Progress progress='10%' />);
            expect(node.getAttribute('style')).toBe('width: 10%;');
        });

        it('does not show as indeterminate if `progress` is passed', () => {
            render(<Progress progress='0%' />);
            expect($('.b-progress.b-progress-indeterminate')).toBeNull();
        });
    });

    describe('cancel button', () => {
        it('renders if the handler is provided', () => {
            const stub = sandbox.stub();

            render(<Progress onCancel={stub} />);
            expect($('.b-progress-cancel')).not.toBeNull();
        });

        it('does not render if no handler is provided', () => {
            render(<Progress />);
            expect($('.b-progress-cancel')).toBeNull();
        });

        it('calls the cancel handler on click', () => {
            const stub = sandbox.stub();

            render(<Progress onCancel={stub} />);

            $('.b-progress-cancel').click();
            expect(stub.calledOnce).toBe(true);
        });
    });
});
