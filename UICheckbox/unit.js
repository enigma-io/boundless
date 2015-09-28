/* eslint no-unused-expressions:0 */

import UICheckbox from './index';
import React from 'react';

describe('UICheckbox', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the rendered input', () => {
            const box = React.render(<UICheckbox data-id='foo' />, document.body);
            const node = React.findDOMNode(box.refs.input);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered wrapper', () => {
            const box = React.render(<UICheckbox wrapperAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(box);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered label', () => {
            const box = React.render(<UICheckbox labelAttributes={{ 'data-id': 'foo' }} label='foo' />, document.body);
            const node = React.findDOMNode(box.refs.label);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('a default truthy value', () => {
            const box = React.render(<UICheckbox name='foo' checked={true} />, document.body);
            const node = React.findDOMNode(box.refs.input);

            expect(node.getAttribute('aria-checked')).to.equal('true');
            expect(node.hasAttribute('checked')).to.be.true;
        });

        it('a default falsy value', () => {
            const box = React.render(<UICheckbox name='foo' checked={false} />, document.body);
            const node = React.findDOMNode(box.refs.input);

            expect(node.getAttribute('aria-checked')).to.equal('false');
            expect(node.hasAttribute('checked')).to.be.false;
        });

        it('a string label', () => {
            const box = React.render(<UICheckbox name='foo' checked={false} label='foo' />, document.body);
            const node = React.findDOMNode(box.refs.label);

            expect(node.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const box = React.render(<UICheckbox name='foo' checked={false} label={<p>foo</p>} />, document.body);
            const node = React.findDOMNode(box.refs.label);

            expect(node.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-checkbox-wrapper should be rendered', () => {
            const box = React.render(<UICheckbox />, document.body);

            expect(box.getWrapperClasses()).to.contain('ui-checkbox-wrapper');
        });

        it('ui-checkbox-label should be rendered', () => {
            const box = React.render(<UICheckbox label='foo' />, document.body);

            expect(box.getLabelClasses()).to.contain('ui-checkbox-label');
        });

        it('ui-checkbox should be rendered', () => {
            const box = React.render(<UICheckbox />, document.body);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox');
        });

        it('ui-checkbox-checked should be rendered when the checkbox value is truthy', () => {
            const box = React.render(<UICheckbox name='foo' checked={true} />, document.body);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox-checked');
        });

        it('ui-checkbox-unchecked should be rendered when the checkbox value is falsy', () => {
            const box = React.render(<UICheckbox name='foo' checked={false} />, document.body);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox-unchecked');
        });

        it('ui-checkbox-mixed should be rendered when the checkbox is indeterminate', () => {
            const box = React.render(<UICheckbox name='foo' checked={true} indeterminate={true} />, document.body);

            expect(box.getCheckboxClasses()).to.contain('ui-checkbox-mixed');
        });
    });

    describe('calls the appropriate handler', () => {
        it('when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const box = React.render(<UICheckbox name='foo' checked={false} onChecked={stub} />, document.body);

            box.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const box = React.render(<UICheckbox name='foo' checked={true} onUnchecked={stub} />, document.body);

            box.handleChange();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('clicking on the label', () => {
        it('should toggle the checkbox state', () => {
            const stub = sandbox.stub();
            const box = React.render(<UICheckbox name='foo' label='test' onChecked={stub} />, document.body);
            const node = React.findDOMNode(box.refs.label);

            node.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
