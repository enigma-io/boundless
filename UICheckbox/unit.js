/* eslint no-unused-expressions:0 */

import UICheckbox from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UICheckbox', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const baseProps = {
        name: 'foo',
        value: 'bar'
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UICheckbox, baseProps));

    it('defaults to being unchecked', () => {
        const element = render(<UICheckbox {...baseProps} />);
        const node = element.refs.input;

        expect(node.getAttribute('aria-checked')).to.equal('false');
        expect(node.hasAttribute('checked')).to.be.false;
    });

    describe('passes through', () => {
        it('props.name to the input node', () => {
            const element = render(<UICheckbox {...baseProps} />);
            const node = element.refs.input;

            expect(node.getAttribute('name')).to.equal('foo');
        });

        it('props.value to the input node', () => {
            const element = render(<UICheckbox {...baseProps} />);
            const node = element.refs.input;

            expect(node.value).to.equal('bar');
        });
    });

    describe('accepts', () => {
        it('arbitrary React-supported HTML attributes via the `inputAttrs` prop', () => {
            const element = render(<UICheckbox {...baseProps} inputAttrs={{'data-id': 'foo'}} />);
            const node = element.refs.input;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary React-supported HTML attributes via the `labelAttrs` prop', () => {
            const element = render(<UICheckbox {...baseProps} labelAttrs={{'data-id': 'foo'}} label='foo' />);
            const node = element.refs.label;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('a truthy value', () => {
            const element = render(<UICheckbox {...baseProps} checked={true} />);
            const node = element.refs.input;

            expect(node.getAttribute('aria-checked')).to.equal('true');
            expect(node.hasAttribute('checked')).to.be.true;
        });

        it('a falsy value', () => {
            const element = render(<UICheckbox {...baseProps} checked={false} />);
            const node = element.refs.input;

            expect(node.getAttribute('aria-checked')).to.equal('false');
            expect(node.hasAttribute('checked')).to.be.false;
        });

        it('a string label', () => {
            const element = render(<UICheckbox {...baseProps} label='foo' />);

            expect(element.refs.label.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const element = render(<UICheckbox {...baseProps} label={<p>foo</p>} />);

            expect(element.refs.label.textContent).to.equal('foo');
        });
    });

    describe('prop', () => {
        it('`checked` should be applied to the input node', () => {
             const element = render(<UICheckbox {...baseProps} checked={true} />);

             expect(element.refs.input.checked).to.be.true;
        });

        it('`name` should be applied to the input node', () => {
             const element = render(<UICheckbox {...baseProps} />);

             expect(element.refs.input.hasAttribute('name')).to.be.true;
             expect(element.refs.input.getAttribute('name')).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-checkbox-wrapper should be rendered', () => {
            const element = render(<UICheckbox {...baseProps} />);

            assert(element.refs.wrapper.classList.contains('ui-checkbox-wrapper'));
        });

        it('ui-checkbox-label should be rendered', () => {
            const element = render(<UICheckbox {...baseProps} label='foo' />);

            assert(element.refs.label.classList.contains('ui-checkbox-label'));
        });

        it('ui-checkbox should be rendered', () => {
            const element = render(<UICheckbox {...baseProps} />);

            assert(element.refs.input.classList.contains('ui-checkbox'));
        });

        it('ui-checkbox-checked should be rendered when the checkbox value is truthy', () => {
            const element = render(<UICheckbox {...baseProps} checked={true} />);

            assert(element.refs.input.classList.contains('ui-checkbox-checked'));
        });

        it('ui-checkbox-unchecked should be rendered when the checkbox value is falsy', () => {
            const element = render(<UICheckbox {...baseProps} />);

            assert(element.refs.input.classList.contains('ui-checkbox-unchecked'));
        });

        it('ui-checkbox-mixed should be rendered when the checkbox is indeterminate', () => {
            const element = render(<UICheckbox {...baseProps} checked={true} indeterminate={true} />);

            assert(element.refs.input.classList.contains('ui-checkbox-mixed'));
        });
    });

    describe('calls the appropriate handler', () => {
        it('when the checkbox value becomes truthy', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} onChecked={stub} />);

            element.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('when the checkbox value becomes falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} checked={true} onUnchecked={stub} />);

            element.handleChange();

            expect(stub).to.have.been.calledOnce;
        });
    });

    describe('clicking on the label', () => {
        it('should toggle the checkbox state', () => {
            const stub = sandbox.stub();
            const element = render(<UICheckbox {...baseProps} label='test' onChecked={stub} />);

            element.refs.label.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
