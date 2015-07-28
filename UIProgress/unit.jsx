/* eslint no-unused-expressions:0 */

import UIProgress from './index.jsx';
import React from 'react';

describe('UIProgress', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const progress = React.render(<UIProgress className='foo' />, document.body);

            expect(progress.getProgressClasses()).to.equal('ui-progress foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const progress = React.render(<UIProgress className={['foo', 'bar']} />, document.body);

            expect(progress.getProgressClasses()).to.equal('ui-progress foo bar');
        });

        it('a specific style property to tween', () => {
            const progress = React.render(<UIProgress progress='0%' tweenProperty='height' />, document.body);
            const node = React.findDOMNode(progress.refs.progress);

            expect(node.getAttribute('style')).to.equal('height:0%;');
        });
    });

    describe('CSS hook', () => {
        let progress;

        beforeEach(() => {
            progress = React.render(<UIProgress />, document.body);
        });

        it('ui-progress-wrapper should be rendered', () => {
            expect(progress.getWrapperClasses()).to.contain('ui-progress-wrapper');
        });

        it('ui-progress should be rendered', () => {
            expect(progress.getProgressClasses()).to.contain('ui-progress');
        });

        it('ui-progress-cancel should be rendered', () => {
            expect(progress.getCancelClasses()).to.contain('ui-progress-cancel');
        });

        it('ui-progress-label should be rendered', () => {
            expect(progress.getLabelClasses()).to.contain('ui-progress-label');
        });
    });

    describe('progress', () => {
        it('should update as the prop is changed', () => {
            const progress = React.render(<UIProgress progress='0%' />, document.body);
            const node = React.findDOMNode(progress.refs.progress);

            expect(node.getAttribute('style')).to.equal('width:0%;');

            React.render(<UIProgress progress='10%' />, document.body);

            expect(node.getAttribute('style')).to.equal('width: 10%;');
        });
    });

    describe('cancel button', () => {
        it('should render if the handler is provided', () => {
            const stub = sandbox.stub();
            const progress = React.render(<UIProgress onCancel={stub} />, document.body);

            expect(progress.refs.cancel).to.not.be.undefined;
        });

        it('should call the cancel handler on click', () => {
            const stub = sandbox.stub();
            const progress = React.render(<UIProgress onCancel={stub} />, document.body);
            const node = React.findDOMNode(progress.refs.cancel);

            node.click();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('progress label', () => {
        it('should render if provided', () => {
            const progress = React.render(<UIProgress labelContent='50%' />, document.body);

            expect(progress.refs.label).to.not.be.undefined;
        });
    });
});
