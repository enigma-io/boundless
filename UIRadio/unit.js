/* eslint no-unused-expressions:0 */

import UIRadio from './index';
import React from 'react';

describe('UIRadio', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the rendered input', () => {
            const radio = React.render(<UIRadio data-id='foo' />, document.body);
            const node = React.findDOMNode(radio.refs.input);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered wrapper', () => {
            const radio = React.render(<UIRadio wrapperAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(radio);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the rendered label', () => {
            const radio = React.render(<UIRadio labelAttributes={{ 'data-id': 'foo' }} label='foo' />, document.body);
            const node = React.findDOMNode(radio.refs.label);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('a string label', () => {
            const radio = React.render(<UIRadio name='foo' label='foo' />, document.body);
            const node = React.findDOMNode(radio.refs.label);

            expect(node.textContent).to.equal('foo');
        });

        it('an element label', () => {
            const radio = React.render(<UIRadio name='foo' label={<p>foo</p>} />, document.body);
            const node = React.findDOMNode(radio.refs.label);

            expect(node.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-radio-wrapper should be rendered', () => {
            const radio = React.render(<UIRadio />, document.body);

            expect(radio.getWrapperClasses()).to.contain('ui-radio-wrapper');
        });

        it('ui-radio-label should be rendered', () => {
            const radio = React.render(<UIRadio label='foo' />, document.body);

            expect(radio.getLabelClasses()).to.contain('ui-radio-label');
        });

        it('ui-radio should be rendered', () => {
            const radio = React.render(<UIRadio />, document.body);

            expect(radio.getInputClasses()).to.contain('ui-radio');
        });

        it('ui-radio-selected should be rendered when `props.selected` is `true`', () => {
            const radio = React.render(<UIRadio name='foo' selected={true} />, document.body);

            expect(radio.getInputClasses()).to.contain('ui-radio-selected');
        });

        it('ui-radio-selected should not be rendered when `props.selected` is falsy', () => {
            const radio = React.render(<UIRadio name='foo' />, document.body);

            expect(radio.getInputClasses()).to.not.contain('ui-radio-selected');
        });
    });

    describe('onSelected', () => {
        it('should be called on a `change` event when `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const radio = React.render(<UIRadio name='foo' onSelected={stub} />, document.body);

            radio.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('should not be called on a `change` event when `props.selected` is `true`', () => {
            const stub = sandbox.stub();
            const radio = React.render(<UIRadio name='foo' selected={true} onSelected={stub} />, document.body);

            radio.handleChange();

            expect(stub).to.not.have.been.called;
        });
    });

    describe('clicking on the label', () => {
        it('should trigger `onSelected` if `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const radio = React.render(<UIRadio name='foo' label='test' onSelected={stub} />, document.body);
            const node = React.findDOMNode(radio.refs.label);

            node.click();
            expect(stub).to.have.been.calledOnce;
        });
    });
});
