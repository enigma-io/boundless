/* eslint no-unused-expressions:0 */

import UICheckbox from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UICheckbox', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the rendered input', () => {
            const box = ReactDOM.render(<UICheckbox data-id='foo' />, mountNode);

            expect(box.refs.input.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered wrapper', () => {
            const box = ReactDOM.render(<UICheckbox wrapperAttributes={{ 'data-id': 'foo' }} />, mountNode);
            const node = ReactDOM.findDOMNode(box);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered label', () => {
            const box = ReactDOM.render(<UICheckbox labelAttributes={{ 'data-id': 'foo' }} label='foo' />, mountNode);

            expect(box.refs.label.getAttribute('data-id')).to.equal('foo');
        });

        it('a default truthy value', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={true} />, mountNode);
            const node = box.refs.input;

            expect(node.getAttribute('aria-checked')).to.equal('true');
            expect(node.hasAttribute('checked')).to.be.true;
        });

        it('a default falsy value', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={false} />, mountNode);
            const node = box.refs.input;

            expect(node.getAttribute('aria-checked')).to.equal('false');
            expect(node.hasAttribute('checked')).to.be.false;
        });

        it('a string label', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={false} label='foo' />, mountNode);

            expect(box.refs.label.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={false} label={<p>foo</p>} />, mountNode);

            expect(box.refs.label.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-checkbox-wrapper should be rendered', () => {
            const box = ReactDOM.render(<UICheckbox />, mountNode);

            expect(box.getWrapperClasses()).to.contain('ui-checkbox-wrapper');
        });

        it('ui-checkbox-label should be rendered', () => {
            const box = ReactDOM.render(<UICheckbox label='foo' />, mountNode);

            expect(box.getLabelClasses()).to.contain('ui-checkbox-label');
        });

        it('ui-checkbox should be rendered', () => {
            const box = ReactDOM.render(<UICheckbox />, mountNode);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox');
        });

        it('ui-checkbox-checked should be rendered when the checkbox value is truthy', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={true} />, mountNode);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox-checked');
        });

        it('ui-checkbox-unchecked should be rendered when the checkbox value is falsy', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={false} />, mountNode);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox-unchecked');
        });

        it('ui-checkbox-mixed should be rendered when the checkbox is indeterminate', () => {
            const box = ReactDOM.render(<UICheckbox name='foo' checked={true} indeterminate={true} />, mountNode);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox-mixed');
        });
    });

    describe('calls the appropriate handler', () => {
        it('when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const box = ReactDOM.render(<UICheckbox name='foo' checked={false} onChecked={stub} />, mountNode);

            box.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const box = ReactDOM.render(<UICheckbox name='foo' checked={true} onUnchecked={stub} />, mountNode);

            box.handleChange();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('clicking on the label', () => {
        it('should toggle the checkbox state', () => {
            const stub = sandbox.stub();
            const box = ReactDOM.render(<UICheckbox name='foo' label='test' onChecked={stub} />, mountNode);

            box.refs.label.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
