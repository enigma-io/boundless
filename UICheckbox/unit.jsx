/* eslint no-unused-expressions:0 */

import UICheckbox from './index.jsx';
import React from 'react';

describe('UICheckbox', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('a default truthy value', () => {
            const box = React.render(<UICheckbox name='box1' checked={true} />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(node.getAttribute('aria-checked')).to.equal('true');
            expect(node.hasAttribute('checked')).to.be.true;
        });

        it('a default falsy value', () => {
            const box = React.render(<UICheckbox name='box1' checked={false} />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(node.getAttribute('aria-checked')).to.equal('false');
            expect(node.hasAttribute('checked')).to.be.false;
        });

        it('a string label', () => {
            const box = React.render(<UICheckbox name='box1' checked={false} label='Box1' />, document.body);
            const node = React.findDOMNode(box.refs.label);

            expect(node.textContent).to.equal('Box1');
        });

        it('an element label', () => {
            const box = React.render(<UICheckbox name='box1' checked={false} label={<p>Box1</p>} />, document.body);
            const node = React.findDOMNode(box.refs.label);

            expect(node.textContent).to.equal('Box1');
        });
    });

    describe('CSS hook', () => {
        it('should be added for the wrapper element', () => {
            const box = React.render(<UICheckbox />, document.body);
            const node = React.findDOMNode(box);

            expect(node.className).to.contain('ui-checkbox-wrapper');
        });

        it('should be added for the label element', () => {
            const box = React.render(<UICheckbox label='xyz' />, document.body);
            const node = React.findDOMNode(box.refs.label);

            expect(node.className).to.contain('ui-checkbox-label');
        });

        it('should be added for the checkbox element', () => {
            const box = React.render(<UICheckbox />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(node.className).to.contain('ui-checkbox');
        });

        it('should be added when the checkbox value is truthy', () => {
            const box = React.render(<UICheckbox name='box1' checked={true} />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(node.className).to.contain('ui-checkbox-checked');
        });

        it('should be added when the checkbox value is falsy', () => {
            const box = React.render(<UICheckbox name='box1' checked={false} />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(node.className).to.contain('ui-checkbox-unchecked');
        });

        it('should be added when the checkbox is indeterminate', () => {
            const box = React.render(<UICheckbox name='box1' checked={true} indeterminate={true} />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(node.className).to.contain('ui-checkbox-mixed');
        });
    });

    describe('calls the appropriate handler', () => {
        it('when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const box = React.render(<UICheckbox name='box1' checked={false} onChecked={stub} />, document.body);

            box.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const box = React.render(<UICheckbox name='box1' checked={true} onUnchecked={stub} />, document.body);

            box.handleChange();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('clicking on the label', () => {
        it('should toggle the checkbox state', () => {
            const stub = sandbox.stub();
            const box = React.render(<UICheckbox name='box1' label='test' onChecked={stub} />, document.body);
            const node = React.findDOMNode(box.refs.label);

            node.click();
            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('autofocus', () => {
        it('should appropriately set focus on first render', () => {
            const box = React.render(<UICheckbox name='box1' autofocus={true} checked={false} />, document.body);
            const node = React.findDOMNode(box.refs.checkbox);

            expect(document.activeElement).to.equal(node);
        });
    });
});
