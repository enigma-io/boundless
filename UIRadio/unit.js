/* eslint no-unused-expressions:0 */

import UIRadio from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UIRadio', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const baseProps = {name: 'foo', value: 'bar'};

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIRadio, baseProps));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.inputAttrs', () => {
            const element = render(<UIRadio {...baseProps} inputAttrs={{'data-id': 'foo'}} />);
            const node = element.refs.input;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('additional classes via props.inputAttrs.className', () => {
            const element = render(<UIRadio {...baseProps} inputAttrs={{className: 'foo'}} />);
            const node = element.refs.input;

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('arbitrary HTML attributes via props.labelAttrs', () => {
            const element = render(<UIRadio {...baseProps} label='foo' labelAttrs={{'data-id': 'foo'}} />);

            expect(element.refs.label.getAttribute('data-id')).to.equal('foo');
        });

        it('additional classes via props.labelAttrs.className', () => {
            const element = render(<UIRadio {...baseProps} label='foo' labelAttrs={{className: 'foo'}} />);
            const node = element.refs.label;

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('a string label', () => {
            const element = render(<UIRadio {...baseProps} label='foo' />);

            expect(element.refs.label.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const element = render(<UIRadio {...baseProps} label={<p>foo</p>} />);

            expect(element.refs.label.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-radio-wrapper should be rendered', () => {
            const element = render(<UIRadio {...baseProps} />);
            const node = element.refs.wrapper;

            assert(node.classList.contains('ui-radio-wrapper'));
        });

        it('ui-radio-label should be rendered', () => {
            const element = render(<UIRadio {...baseProps} label='foo' />);

            assert(element.refs.label.classList.contains('ui-radio-label'));
        });

        it('ui-radio should be rendered', () => {
            const element = render(<UIRadio {...baseProps} />);

            assert(element.refs.input.classList.contains('ui-radio'));
        });

        it('ui-radio-selected should be rendered when `props.selected` is `true`', () => {
            const element = render(<UIRadio {...baseProps} selected={true} />);

            assert(element.refs.input.classList.contains('ui-radio-selected'));
        });

        it('ui-radio-selected should not be rendered when `props.selected` is falsy', () => {
            const element = render(<UIRadio {...baseProps} />);
            const node = element.refs.wrapper;

            assert(node.classList.contains('ui-radio-selected') === false);
        });
    });

    describe('onSelected', () => {
        it('should be called with the proper value', () => {
            const stub = sandbox.stub();
            const element = render(<UIRadio {...baseProps} onSelected={stub} />);

            element.refs.input.click();

            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('bar');
        });
    });

    describe('clicking on the label', () => {
        it('should trigger `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIRadio {...baseProps} label='test' onSelected={stub} />);

            element.refs.label.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
