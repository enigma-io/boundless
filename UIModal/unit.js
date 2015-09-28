/* eslint no-unused-expressions:0 */

import UIModal from './index';
import React from 'react';

describe('UIModal', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the wrapper node', () => {
            const modal = React.render(<UIModal wrapperAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(modal);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the dialog node', () => {
            const modal = React.render(<UIModal data-id='foo' />, document.body);
            const node = React.findDOMNode(modal.refs.dialog);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the mask node', () => {
            const modal = React.render(<UIModal maskAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(modal.refs.mask);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const modal = React.render(<UIModal className='foo' />, document.body);

            expect(modal.getDialogClasses()).to.equal('ui-modal foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const modal = React.render(<UIModal className={['foo', 'bar']} />, document.body);

            expect(modal.getDialogClasses()).to.equal('ui-modal foo bar');
        });
    });

    describe('CSS hook', () => {
        let modal;

        beforeEach(() => {
            modal = React.render(<UIModal />, document.body);
        });

        it('ui-modal is rendered', () => {
            expect(modal.getDialogClasses()).to.contain('ui-modal');
        });

        it('ui-modal-mask is rendered', () => {
            expect(modal.getMaskClasses()).to.contain('ui-modal-mask');
        });

        it('ui-modal-wrapper is rendered', () => {
            expect(modal.getWrapperClasses()).to.contain('ui-modal-wrapper');
        });
    });
});
