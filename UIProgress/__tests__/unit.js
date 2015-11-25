/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../../UIUtils/conform';

import UIProgress from '../../UIProgress';

import sinon from 'sinon';
import {assert, expect} from 'chai';

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

            ['ui-progress-wrapper', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });

        it('a specific style property to tween', () => {
            const element = render(<UIProgress progress='0%' tweenProperty='height' />);

            expect(element.refs.progress.getAttribute('style')).to.equal('height:0%;');
        });

        it('arbitrary HTML attributes via props.progressAttrs', () => {
            const element = render(<UIProgress progressAttrs={{'data-foo': 'bar'}} />);
            const node = element.refs.progress;

            expect(node.hasAttribute('data-foo')).to.be.true;
            expect(node.getAttribute('data-foo')).to.equal('bar');
        });

        it('an additional class via props.progressAttrs.className', () => {
            const element = render(<UIProgress progressAttrs={{className: 'foo'}} />);
            const node = element.refs.progress;

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('arbitrary HTML attributes via props.labelAttrs', () => {
            const element = render(<UIProgress label='hi' labelAttrs={{'data-foo': 'bar'}} />);
            const node = element.refs.label;

            expect(node.hasAttribute('data-foo')).to.be.true;
            expect(node.getAttribute('data-foo')).to.equal('bar');
        });

        it('an additional class via props.labelAttrs.className', () => {
            const element = render(<UIProgress label='hi' labelAttrs={{className: 'foo'}} />);
            const node = element.refs.label;

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('arbitrary HTML attributes via props.cancelAttrs', () => {
            const element = render(<UIProgress onCancel={sandbox.stub()} cancelAttrs={{'data-foo': 'bar'}} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            expect(node.hasAttribute('data-foo')).to.be.true;
            expect(node.getAttribute('data-foo')).to.equal('bar');
        });

        it('an additional class via props.cancelAttrs.className', () => {
            const element = render(<UIProgress onCancel={sandbox.stub()} cancelAttrs={{className: 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            expect(node.classList.contains('foo')).to.be.true;
        });
    });

    describe('CSS hook', () => {
        let element;

        beforeEach(() => {
            element = render(<UIProgress label='foo' onCancel={function(){}} />);
        });

        it('ui-progress-wrapper should be rendered', () => {
            assert(element.refs.wrapper.classList.contains('ui-progress-wrapper'));
        });

        it('ui-progress should be rendered', () => {
            assert(element.refs.progress.classList.contains('ui-progress'));
        });

        it('ui-progress-indeterminate should be rendered', () => {
            assert(element.refs.progress.classList.contains('ui-progress-indeterminate'));
        });

        it('ui-progress-cancel should be rendered', () => {
            assert(ReactDOM.findDOMNode(element.refs.cancel).classList.contains('ui-progress-cancel'));
        });

        it('ui-progress-label should be rendered', () => {
            assert(element.refs.label.classList.contains('ui-progress-label'));
        });
    });

    describe('progress', () => {
        it('should update as the prop is changed', () => {
            const element = render(<UIProgress progress='0%' />);
            const node = element.refs.progress;

            expect(node.getAttribute('style')).to.equal('width:0%;');

            render(<UIProgress progress='10%' />);

            expect(node.getAttribute('style')).to.equal('width: 10%;');
        });

        it('should not show as indeterminate if `progress` is passed', () => {
            const element = render(<UIProgress progress='0%' />);

            assert(element.refs.progress.classList.contains('ui-progress-indeterminate') === false);
        });
    });

    describe('cancel button', () => {
        it('should render if the handler is provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIProgress onCancel={stub} />);

            expect(element.refs.cancel).to.not.be.undefined;
        });

        it('should call the cancel handler on click', () => {
            const stub = sandbox.stub();
            const element = render(<UIProgress onCancel={stub} />);
            const node = ReactDOM.findDOMNode(element.refs.cancel);

            node.click();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('progress label', () => {
        it('should render if provided', () => {
            const element = render(<UIProgress label='50%' />);

            expect(element.refs.label).to.not.be.undefined;
        });
    });
});
