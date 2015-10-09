/* eslint no-unused-expressions:0 */

import UIRadio from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIRadio', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the rendered input', () => {
            const radio = ReactDOM.render(<UIRadio data-id='foo' />, mountNode);

            expect(radio.refs.input.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered wrapper', () => {
            const radio = ReactDOM.render(<UIRadio wrapperAttributes={{ 'data-id': 'foo' }} />, mountNode);
            const node = ReactDOM.findDOMNode(radio);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered label', () => {
            const radio = ReactDOM.render(<UIRadio labelAttributes={{ 'data-id': 'foo' }} label='foo' />, mountNode);

            expect(radio.refs.label.getAttribute('data-id')).to.equal('foo');
        });

        it('a string label', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' label='foo' />, mountNode);

            expect(radio.refs.label.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' label={<p>foo</p>} />, mountNode);

            expect(radio.refs.label.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-radio-wrapper should be rendered', () => {
            const radio = ReactDOM.render(<UIRadio />, mountNode);

            expect(radio.getWrapperClasses()).to.contain('ui-radio-wrapper');
        });

        it('ui-radio-label should be rendered', () => {
            const radio = ReactDOM.render(<UIRadio label='foo' />, mountNode);

            expect(radio.getLabelClasses()).to.contain('ui-radio-label');
        });

        it('ui-radio should be rendered', () => {
            const radio = ReactDOM.render(<UIRadio />, mountNode);

            expect(radio.getInputClasses()).to.contain('ui-radio');
        });

        it('ui-radio-selected should be rendered when `props.selected` is `true`', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' selected={true} />, mountNode);

            expect(radio.getInputClasses()).to.contain('ui-radio-selected');
        });

        it('ui-radio-selected should not be rendered when `props.selected` is falsy', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' />, mountNode);

            expect(radio.getInputClasses()).to.not.contain('ui-radio-selected');
        });
    });

    describe('onSelected', () => {
        it('should be called on a `change` event when `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const radio = ReactDOM.render(<UIRadio name='foo' onSelected={stub} />, mountNode);

            radio.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('should not be called on a `change` event when `props.selected` is `true`', () => {
            const stub = sandbox.stub();
            const radio = ReactDOM.render(<UIRadio name='foo' selected={true} onSelected={stub} />, mountNode);

            radio.handleChange();

            expect(stub).to.not.have.been.called;
        });
    });

    describe('clicking on the label', () => {
        it('should trigger `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const radio = ReactDOM.render(<UIRadio name='foo' label='test' onSelected={stub} />, mountNode);

            radio.refs.label.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
