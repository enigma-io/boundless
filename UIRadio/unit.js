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
        it('arbitrary HTML attributes via props.attrs', () => {
            const radio = ReactDOM.render(<UIRadio attrs={{'data-id': 'foo'}} name='x' value='x' />, mountNode);

            expect(radio.refs.input.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary HTML attributes via props.wrapperAttrs', () => {
            const radio = ReactDOM.render(<UIRadio name='x' value='x' wrapperAttrs={{ 'data-id': 'foo' }} />, mountNode);
            const node = ReactDOM.findDOMNode(radio);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary HTML attributes via props.labelAttrs', () => {
            const radio = ReactDOM.render(<UIRadio name='x' value='x' labelAttrs={{ 'data-id': 'foo' }} label='foo' />, mountNode);

            expect(radio.refs.label.getAttribute('data-id')).to.equal('foo');
        });

        it('a string label', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' label='foo' value='x' />, mountNode);

            expect(radio.refs.label.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' label={<p>foo</p>} value='x' />, mountNode);

            expect(radio.refs.label.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-radio-wrapper should be rendered', () => {
            const radio = ReactDOM.render(<UIRadio name='x' value='x' />, mountNode);
            const node = ReactDOM.findDOMNode(radio);

            assert(node.classList.contains('ui-radio-wrapper'));
        });

        it('ui-radio-label should be rendered', () => {
            const radio = ReactDOM.render(<UIRadio name='x' value='x' label='foo' />, mountNode);

            assert(radio.refs.label.classList.contains('ui-radio-label'));
        });

        it('ui-radio should be rendered', () => {
            const radio = ReactDOM.render(<UIRadio name='x' value='x' />, mountNode);

            assert(radio.refs.input.classList.contains('ui-radio'));
        });

        it('ui-radio-selected should be rendered when `props.selected` is `true`', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' value='x' selected={true} />, mountNode);

            assert(radio.refs.input.classList.contains('ui-radio-selected'));
        });

        it('ui-radio-selected should not be rendered when `props.selected` is falsy', () => {
            const radio = ReactDOM.render(<UIRadio name='foo' value='x' />, mountNode);
            const node = ReactDOM.findDOMNode(radio);

            assert(node.classList.contains('ui-radio-selected') === false);
        });
    });

    describe('onSelected', () => {
        it('should be called with the proper value', () => {
            const stub = sandbox.stub();
            const radio = ReactDOM.render(<UIRadio name='foo' onSelected={stub} value='abc' />, mountNode);

            radio.refs.input.click();

            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('abc');
        });
    });

    describe('clicking on the label', () => {
        it('should trigger `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const radio = ReactDOM.render(<UIRadio name='foo' value='x' label='test' onSelected={stub} />, mountNode);

            radio.refs.label.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
