/* eslint no-unused-expressions:0 */

import UIProgress from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIProgress', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const progress = ReactDOM.render(<UIProgress className='foo bar' />, mountNode);
            const node = progress.refs.progress;

            ['ui-progress', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });

        it('a specific style property to tween', () => {
            const progress = ReactDOM.render(<UIProgress progress='0%' tweenProperty='height' />, mountNode);

            expect(progress.refs.progress.getAttribute('style')).to.equal('height:0%;');
        });
    });

    describe('CSS hook', () => {
        let progress;

        beforeEach(() => {
            progress = ReactDOM.render(<UIProgress label='foo' onCancel={function(){}} />, mountNode);
        });

        it('ui-progress-wrapper should be rendered', () => {
            assert(ReactDOM.findDOMNode(progress).classList.contains('ui-progress-wrapper'));
        });

        it('ui-progress should be rendered', () => {
            assert(progress.refs.progress.classList.contains('ui-progress'));
        });

        it('ui-progress-indeterminate should be rendered', () => {
            assert(progress.refs.progress.classList.contains('ui-progress-indeterminate'));
        });

        it('ui-progress-cancel should be rendered', () => {
            assert(ReactDOM.findDOMNode(progress.refs.cancel).classList.contains('ui-progress-cancel'));
        });

        it('ui-progress-label should be rendered', () => {
            assert(progress.refs.label.classList.contains('ui-progress-label'));
        });
    });

    describe('progress', () => {
        it('should update as the prop is changed', () => {
            const progress = ReactDOM.render(<UIProgress progress='0%' />, mountNode);
            const node = progress.refs.progress;

            expect(node.getAttribute('style')).to.equal('width:0%;');

            ReactDOM.render(<UIProgress progress='10%' />, mountNode);

            expect(node.getAttribute('style')).to.equal('width: 10%;');
        });

        it('should not show as indeterminate if `progress` is passed', () => {
            const progress = ReactDOM.render(<UIProgress progress='0%' />, mountNode);

            assert(progress.refs.progress.classList.contains('ui-progress-indeterminate') === false);
        });
    });

    describe('cancel button', () => {
        it('should render if the handler is provided', () => {
            const stub = sandbox.stub();
            const progress = ReactDOM.render(<UIProgress onCancel={stub} />, mountNode);

            expect(progress.refs.cancel).to.not.be.undefined;
        });

        it('should call the cancel handler on click', () => {
            const stub = sandbox.stub();
            const progress = ReactDOM.render(<UIProgress onCancel={stub} />, mountNode);
            const node = ReactDOM.findDOMNode(progress.refs.cancel);

            node.click();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('progress label', () => {
        it('should render if provided', () => {
            const progress = ReactDOM.render(<UIProgress label='50%' />, mountNode);

            expect(progress.refs.label).to.not.be.undefined;
        });
    });
});
