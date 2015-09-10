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
        it('React-supported HTML attributes as passthrough attributes to the root node', () => {
            const dialog = React.render(<UIDialog data-id='foo' />, document.body);
            const node = React.findDOMNode(dialog);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the body node', () => {
            const dialog = React.render(<UIDialog body='foo' bodyAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(dialog.refs.body);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the footer node', () => {
            const dialog = React.render(<UIDialog footer='foo' footerAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(dialog.refs.footer);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the header node', () => {
            const dialog = React.render(<UIDialog header='foo' headerAttributes={{ 'data-id': 'foo' }} />, document.body);
            const node = React.findDOMNode(dialog.refs.header);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const dialog = React.render(<UIDialog className='foo' />, document.body);

            expect(dialog.getRootClasses()).to.equal('ui-dialog foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const dialog = React.render(<UIDialog className={['foo', 'bar']} />, document.body);

            expect(dialog.getRootClasses()).to.equal('ui-dialog foo bar');
        });

        it('renderable header content', () => {
            const dialog = React.render(<UIDialog header='foo' />, document.body);
            const node = React.findDOMNode(dialog.refs.header);

            expect(node.textContent).to.equal('foo');
        });

        it('renderable body content', () => {
            const dialog = React.render(<UIDialog body='foo' />, document.body);
            const node = React.findDOMNode(dialog.refs.body);

            expect(node.textContent).to.equal('foo');
        });

        it('renderable footer content', () => {
            const dialog = React.render(<UIDialog footer='foo' />, document.body);
            const node = React.findDOMNode(dialog.refs.footer);

            expect(node.textContent).to.equal('foo');
        });

        it('renderable content as a nested child', () => {
            const dialog = React.render(<UIDialog>foo</UIDialog>, document.body);
            const node = React.findDOMNode(dialog);

            expect(node.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-dialog is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);

            expect(dialog.getRootClasses()).to.contain('ui-dialog');
        });

        it('ui-dialog-body is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);

            expect(dialog.getBodyClasses()).to.contain('ui-dialog-body');
        });

        it('ui-dialog-footer is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);

            expect(dialog.getFooterClasses()).to.contain('ui-dialog-footer');
        });

        it('ui-dialog-header is rendered', () => {
            const dialog = React.render(<UIDialog />, document.body);

            expect(dialog.getHeaderClasses()).to.contain('ui-dialog-header');
        });
    });

    describe('focus', () => {
        it('should be applied to the dialog on render if `props.captureFocus` is `true`', () => {
            const dialog = React.render(<UIDialog className='abc' />, document.body);
            const node = React.findDOMNode(dialog);

            expect(document.activeElement).to.equal(node);
        });

        it('should not be applied to the dialog on render if `props.captureFocus` is `false`', () => {
            const dialog = React.render(<UIDialog captureFocus={false} className='abc' />, document.body);
            const node = React.findDOMNode(dialog);

            expect(document.activeElement).to.not.equal(node);
        });

        it('should not leave the dialog if `props.captureFocus` is `true`', () => {
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
