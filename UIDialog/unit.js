/* eslint no-unused-expressions:0 */

import UIDialog from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UIDialog', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIDialog));

    describe('accepts', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UIDialog className='foo'
                          body='foo'
                          bodyAttrs={{'data-id': 'foo'}}
                          footer='foo'
                          footerAttrs={{'data-id': 'foo'}}
                          header='foo'
                          headerAttrs={{'data-id': 'foo'}}  />
            )
        });

        it('arbitrary React-supported HTML attributes via props.bodyAttrs', () => {
            expect(element.refs.body.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary React-supported HTML attributes via props.footerAttrs', () => {
            expect(element.refs.footer.getAttribute('data-id')).to.equal('foo');
        });

        it('arbitrary React-supported HTML attributes via props.headerAttrs', () => {
            expect(element.refs.header.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            assert(element.refs.dialog.classList.contains('ui-dialog'));
            assert(element.refs.dialog.classList.contains('foo'));
        });

        it('renderable header content', () => {
            expect(element.refs.header.textContent).to.equal('foo');
        });

        it('renderable body content', () => {
            expect(element.refs.body.textContent).to.equal('foo');
        });

        it('renderable footer content', () => {
            expect(element.refs.footer.textContent).to.equal('foo');
        });

        it('renderable content as a nested child', () => {
            element = render(<UIDialog>foo</UIDialog>);

            expect(element.refs.dialog.textContent).to.equal('foo');
        });
    });

    describe('CSS hook', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UIDialog body='foo'
                          footer='foo'
                          header='foo' />
            )
        });

        it('ui-dialog is rendered', () => {
            assert(element.refs.dialog.classList.contains('ui-dialog'));
        });

        it('ui-dialog-body is rendered', () => {
            assert(element.refs.body.classList.contains('ui-dialog-body'));
        });

        it('ui-dialog-footer is rendered', () => {
            assert(element.refs.footer.classList.contains('ui-dialog-footer'));
        });

        it('ui-dialog-header is rendered', () => {
            assert(element.refs.header.classList.contains('ui-dialog-header'));
        });
    });

    describe('focus', () => {
        it('should be applied to the dialog on render if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog className='abc' />);
            const node = element.refs.dialog;

            expect(document.activeElement).to.equal(node);
        });

        it('should not be applied to the dialog on render if `props.captureFocus` is `false`', () => {
            const element = render(<UIDialog captureFocus={false} className='abc' />);
            const node = element.refs.dialog;

            expect(document.activeElement).to.not.equal(node);
        });

        it('should not leave the dialog if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog className='abc' />);
            const node = element.refs.dialog;

            mountNode.focus();

            expect(document.activeElement).to.equal(node);
        });
    });

    describe('closeOnEscKey', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnEscKey={true} onClose={stub} />);

            element.handleKeydown({key: 'Escape'});

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleKeydown({key: 'Escape'});

            expect(stub).to.not.have.been.called;
        });
    });

    describe('closeOnOutsideClick', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnOutsideClick={true} onClose={stub} />);

            element.handleOutsideClick({target: mountNode});

            expect(stub).to.have.been.calledOnce;
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleOutsideClick({target: mountNode});

            expect(stub).to.have.been.called;
        });
    });
});
