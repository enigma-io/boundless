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
        let dialog;

        beforeEach(() => {
            dialog = ReactDOM.render(
                <UIDialog className='foo'
                          attrs={{'data-id': 'foo'}}
                          body='foo'
                          bodyAttrs={{'data-id': 'foo'}}
                          footer='foo'
                          footerAttrs={{'data-id': 'foo'}}
                          header='foo'
                          headerAttrs={{'data-id': 'foo'}}  />, mountNode
            )
        });

        it('arbitrary React-supported HTML attributes via attrs prop', () => {
            expect(ReactDOM.findDOMNode(dialog).getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary React-supported HTML attributes via bodyAttrs prop', () => {
            expect(dialog.refs.body.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary React-supported HTML attributes via footerAttrs prop', () => {
            expect(dialog.refs.footer.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary React-supported HTML attributes via headerAttrs prop', () => {
            expect(dialog.refs.header.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            assert(ReactDOM.findDOMNode(dialog).classList.contains('ui-dialog'));
            assert(ReactDOM.findDOMNode(dialog).classList.contains('foo'));
        });

        it('renderable header content', () => {
            expect(dialog.refs.header.textContent).to.equal('foo');
        });

        it('renderable body content', () => {
            expect(dialog.refs.body.textContent).to.equal('foo');
        });

        it('renderable footer content', () => {
            expect(dialog.refs.footer.textContent).to.equal('foo');
        });

        it('renderable content as a nested child', () => {
            dialog = ReactDOM.render(<UIDialog>foo</UIDialog>, mountNode);

            expect(ReactDOM.findDOMNode(dialog).textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        let dialog;

        beforeEach(() => {
            dialog = ReactDOM.render(
                <UIDialog body='foo'
                          footer='foo'
                          header='foo' />, mountNode
            )
        });

        it('ui-dialog is rendered', () => {
            assert(ReactDOM.findDOMNode(dialog).classList.contains('ui-dialog'));
        });

        it('ui-dialog-body is rendered', () => {
            assert(dialog.refs.body.classList.contains('ui-dialog-body'));
        });

        it('ui-dialog-footer is rendered', () => {
            assert(dialog.refs.footer.classList.contains('ui-dialog-footer'));
        });

        it('ui-dialog-header is rendered', () => {
            assert(dialog.refs.header.classList.contains('ui-dialog-header'));
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
