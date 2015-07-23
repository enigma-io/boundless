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
            const bar = React.render(<UIProgress className='smoothed' />, document.body);
            const node = React.findDOMNode(bar);

            expect(node.getAttribute('class')).to.equal('ui-progress-wrapper smoothed');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const bar = React.render(<UIProgress className={['smoothed', 'blurred']} />, document.body);
            const node = React.findDOMNode(bar);

            expect(node.getAttribute('class')).to.equal('ui-progress-wrapper smoothed blurred');
        });

        it('a specific style property to tween', () => {
            const bar = React.render(<UIProgress progress='0%' tweenProperty='height' />, document.body);
            const node = React.findDOMNode(bar.refs.progress);

            expect(node.getAttribute('style')).to.equal('height:0%;');
        });
    });

    describe('progress', () => {
        it('should update as the prop is changed', () => {
            const bar = React.render(<UIProgress progress='0%' />, document.body);
            const node = React.findDOMNode(bar.refs.progress);

            expect(node.getAttribute('style')).to.equal('width:0%;');

            React.render(<UIProgress progress='10%' />, document.body);

            expect(node.getAttribute('style')).to.equal('width: 10%;');
        });
    });

    describe('cancel button', () => {
        it('should render if the handler is provided', () => {
            const stub = sandbox.stub();
            const bar = React.render(<UIProgress onCancel={stub} />, document.body);

            expect(bar.refs.cancel).to.not.be.undefined;
        });

        it('should call the cancel handler on click', () => {
            const stub = sandbox.stub();
            const bar = React.render(<UIProgress onCancel={stub} />, document.body);
            const node = React.findDOMNode(bar.refs.cancel);

            node.click();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('progress label', () => {
        it('should render if provided', () => {
            const bar = React.render(<UIProgress label='50%' />, document.body);

            expect(bar.refs.label).to.not.be.undefined;
        });
    });
});
