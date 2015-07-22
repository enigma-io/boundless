/* eslint no-unused-expressions:0 */

import UIDialog from './index.jsx';
import React from 'react';

describe('UIDialog', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            const dialog = React.render(<UIDialog id='diag1' data-id='xr1' />, document.body);
            const node = React.findDOMNode(dialog);

            expect(node.getAttribute('id')).to.equal('diag1');
            expect(node.getAttribute('data-id')).to.equal('xr1');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const dialog = React.render(<UIDialog className='abc' />, document.body);
            const node = React.findDOMNode(dialog);

            expect(node.getAttribute('class')).to.equal('ui-dialog abc');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const dialog = React.render(<UIDialog className={['abc', '123']} />, document.body);
            const node = React.findDOMNode(dialog);

            expect(node.getAttribute('class')).to.equal('ui-dialog abc 123');
        });

        it('renderable header content', () => {
            const dialog = React.render(<UIDialog headerContent='ABC123' />, document.body);
            const node = React.findDOMNode(dialog.refs.header);

            expect(node.textContent).to.equal('ABC123');
        });

        it('renderable body content', () => {
            const dialog = React.render(<UIDialog bodyContent='ABC123' />, document.body);
            const node = React.findDOMNode(dialog.refs.body);

            expect(node.textContent).to.equal('ABC123');
        });

        it('renderable footer content', () => {
            const dialog = React.render(<UIDialog footerContent='ABC123' />, document.body);
            const node = React.findDOMNode(dialog.refs.footer);

            expect(node.textContent).to.equal('ABC123');
        });
    });

    describe('CSS hook', () => {
        it('ui-dialog is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);
            const node = React.findDOMNode(dialog);

            expect(node.className).to.contain('ui-dialog');
        });

        it('ui-dialog-header is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);
            const node = React.findDOMNode(dialog.refs.header);

            expect(node.className).to.contain('ui-dialog-header');
        });

        it('ui-dialog-body is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);
            const node = React.findDOMNode(dialog.refs.body);

            expect(node.className).to.contain('ui-dialog-body');
        });

        it('ui-dialog-footer is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);
            const node = React.findDOMNode(dialog.refs.footer);

            expect(node.className).to.contain('ui-dialog-footer');
        });
    });

    describe('focus', () => {
        it('should be applied to the dialog on render', () => {
            const dialog = React.render(<UIDialog className='abc' />, document.body);
            const node = React.findDOMNode(dialog);

            expect(document.activeElement).to.equal(node);
        });

        it('should not leave the dialog', () => {
            const dialog = React.render(<UIDialog className='abc' />, document.body);
            const node = React.findDOMNode(dialog);

            document.body.focus();

            expect(document.activeElement).to.equal(node);
        });
    });

    describe('closeOnEscKey', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const dialog = React.render(<UIDialog closeOnEscKey={true} onClose={stub} />, document.body);

            dialog.handleKeydown({key: 'Escape'});

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const dialog = React.render(<UIDialog onClose={stub} />, document.body);

            dialog.handleKeydown({key: 'Escape'});

            expect(stub).to.not.have.been.called;
        });
    });

    describe('closeOnOutsideClick', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const dialog = React.render(<UIDialog closeOnOutsideClick={true} onClose={stub} />, document.body);

            dialog.handleOutsideClick({target: document.body});

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const dialog = React.render(<UIDialog onClose={stub} />, document.body);

            dialog.handleOutsideClick({target: document.body});

            expect(stub).to.have.been.called;
        });
    });
});
