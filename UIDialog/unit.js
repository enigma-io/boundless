/* eslint no-unused-expressions:0 */

import UIDialog from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIDialog', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the root node', () => {
            const dialog = ReactDOM.render(<UIDialog data-id='foo' />, mountNode);
            const node = ReactDOM.findDOMNode(dialog);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the body node', () => {
            const dialog = ReactDOM.render(<UIDialog body='foo' bodyAttributes={{ 'data-id': 'foo' }} />, mountNode);
            const node = dialog.refs.body;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the footer node', () => {
            const dialog = ReactDOM.render(<UIDialog footer='foo' footerAttributes={{ 'data-id': 'foo' }} />, mountNode);
            const node = dialog.refs.footer;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the header node', () => {
            const dialog = ReactDOM.render(<UIDialog header='foo' headerAttributes={{ 'data-id': 'foo' }} />, mountNode);
            const node = dialog.refs.header;

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const dialog = ReactDOM.render(<UIDialog className='foo' />, mountNode);

            expect(dialog.getRootClasses()).to.equal('ui-dialog foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const dialog = ReactDOM.render(<UIDialog className={['foo', 'bar']} />, mountNode);

            expect(dialog.getRootClasses()).to.equal('ui-dialog foo bar');
        });

        it('renderable header content', () => {
            const dialog = ReactDOM.render(<UIDialog header='foo' />, mountNode);
            const node = dialog.refs.header;

            expect(node.textContent).to.equal('foo');
        });

        it('renderable body content', () => {
            const dialog = ReactDOM.render(<UIDialog body='foo' />, mountNode);
            const node = dialog.refs.body;

            expect(node.textContent).to.equal('foo');
        });

        it('renderable footer content', () => {
            const dialog = ReactDOM.render(<UIDialog footer='foo' />, mountNode);
            const node = dialog.refs.footer;

            expect(node.textContent).to.equal('foo');
        });

        it('renderable content as a nested child', () => {
            const dialog = ReactDOM.render(<UIDialog>foo</UIDialog>, mountNode);
            const node = ReactDOM.findDOMNode(dialog);

            expect(node.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        it('ui-dialog is rendered', () => {
            const dialog = ReactDOM.render(<UIDialog />, mountNode);

            expect(dialog.getRootClasses()).to.contain('ui-dialog');
        });

        it('ui-dialog-body is rendered', () => {
            const dialog = ReactDOM.render(<UIDialog />, mountNode);

            expect(dialog.getBodyClasses()).to.contain('ui-dialog-body');
        });

        it('ui-dialog-footer is rendered', () => {
            const dialog = ReactDOM.render(<UIDialog />, mountNode);

            expect(dialog.getFooterClasses()).to.contain('ui-dialog-footer');
        });

        it('ui-dialog-header is rendered', () => {
            const dialog = ReactDOM.render(<UIDialog />, mountNode);

            expect(dialog.getHeaderClasses()).to.contain('ui-dialog-header');
        });
    });

    describe('focus', () => {
        it('should be applied to the dialog on render if `props.captureFocus` is `true`', () => {
            const dialog = ReactDOM.render(<UIDialog className='abc' />, mountNode);
            const node = ReactDOM.findDOMNode(dialog);

            expect(document.activeElement).to.equal(node);
        });

        it('should not be applied to the dialog on render if `props.captureFocus` is `false`', () => {
            const dialog = ReactDOM.render(<UIDialog captureFocus={false} className='abc' />, mountNode);
            const node = ReactDOM.findDOMNode(dialog);

            expect(document.activeElement).to.not.equal(node);
        });

        it('should not leave the dialog if `props.captureFocus` is `true`', () => {
            const dialog = ReactDOM.render(<UIDialog className='abc' />, mountNode);
            const node = ReactDOM.findDOMNode(dialog);

            mountNode.focus();

            expect(document.activeElement).to.equal(node);
        });
    });

    describe('closeOnEscKey', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const dialog = ReactDOM.render(<UIDialog closeOnEscKey={true} onClose={stub} />, mountNode);

            dialog.handleKeydown({key: 'Escape'});

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const dialog = ReactDOM.render(<UIDialog onClose={stub} />, mountNode);

            dialog.handleKeydown({key: 'Escape'});

            expect(stub).to.not.have.been.called;
        });
    });

    describe('closeOnOutsideClick', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const dialog = ReactDOM.render(<UIDialog closeOnOutsideClick={true} onClose={stub} />, mountNode);

            dialog.handleOutsideClick({target: mountNode});

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const dialog = ReactDOM.render(<UIDialog onClose={stub} />, mountNode);

            dialog.handleOutsideClick({target: mountNode});

            expect(stub).to.have.been.called;
        });
    });
});
