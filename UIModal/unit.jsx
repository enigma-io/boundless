/* eslint no-unused-expressions:0 */

import UIModal from './index.jsx';
import React from 'react';

describe('UIModal', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const modal = React.render(<UIModal id='diag1' data-id='xr1' />, document.body);
            const node = React.findDOMNode(modal);

            expect(node.getAttribute('id')).to.equal('diag1');
            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const modal = React.render(<UIModal className='abc' />, document.body);
            const node = React.findDOMNode(modal);

            expect(node.className).to.equal('ui-modal-wrapper abc');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const modal = React.render(<UIModal className={['abc', '123']} />, document.body);
            const node = React.findDOMNode(modal);

            expect(node.className).to.equal('ui-modal-wrapper abc 123');
        });
    });

    describe('CSS hook', () => {
        it('ui-modal is rendered', () => {
            const modal = React.render(<UIModal />, document.body);
            const node = React.findDOMNode(modal.refs.dialog);

            expect(node.className).to.contain('ui-modal');
        });

        it('ui-modal-mask is rendered', () => {
            const modal = React.render(<UIModal />, document.body);
            const node = React.findDOMNode(modal.refs.mask);

            expect(node.className).to.contain('ui-modal-mask');
        });

        it('ui-modal-wrapper is rendered', () => {
            const modal = React.render(<UIModal />, document.body);
            const node = React.findDOMNode(modal);

            expect(node.className).to.contain('ui-modal-wrapper');
        });
    });
});
