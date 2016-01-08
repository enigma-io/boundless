/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIDialog from '../../UIDialog';
import conformanceChecker from '../../UIUtils/conform';
import noop from '../../UIUtils/noop';

import sinon from 'sinon';

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
                          bodyProps={{'data-id': 'foo'}}
                          footer='foo'
                          footerProps={{'data-id': 'foo'}}
                          header='foo'
                          headerProps={{'data-id': 'foo'}}  />
            )
        });

        it('arbitrary React-supported HTML attributes via props.bodyProps', () => {
            expect(element.refs.body.getAttribute('data-id')).toBe('foo');
        });

        it('arbitrary React-supported HTML attributes via props.footerProps', () => {
            expect(element.refs.footer.getAttribute('data-id')).toBe('foo');
        });

        it('arbitrary React-supported HTML attributes via props.headerProps', () => {
            expect(element.refs.header.getAttribute('data-id')).toBe('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            expect(element.refs.dialog.classList.contains('ui-dialog')).toBe(true);
            expect(element.refs.dialog.classList.contains('foo')).toBe(true);
        });

        it('renderable header content', () => {
            expect(element.refs.header.textContent).toBe('foo');
        });

        it('renderable body content', () => {
            expect(element.refs.body.textContent).toBe('foo');
        });

        it('renderable footer content', () => {
            expect(element.refs.footer.textContent).toBe('foo');
        });

        it('renderable content as a nested child', () => {
            element = render(<UIDialog>foo</UIDialog>);

            expect(element.refs.dialog.textContent).toBe('foo');
        });
    });

    describe('CSS hook', () => {
        const hasClass = (dom, name) => dom.classList.contains(name);
        let element;

        beforeEach(() => {
            element = render(
                <UIDialog body='foo'
                          footer='foo'
                          header='foo' />
            )
        });

        it('ui-dialog is rendered', () => {
            expect(hasClass(element.refs.dialog, 'ui-dialog')).toBe(true);
        });

        it('ui-dialog-body is rendered', () => {
            expect(hasClass(element.refs.body, 'ui-dialog-body')).toBe(true);
        });

        it('ui-dialog-footer is rendered', () => {
            expect(hasClass(element.refs.footer, 'ui-dialog-footer')).toBe(true);
        });

        it('ui-dialog-header is rendered', () => {
            expect(hasClass(element.refs.header, 'ui-dialog-header')).toBe(true);
        });
    });

    describe('focus', () => {
        it('should be applied to the dialog on render if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog />);

            expect(document.activeElement).toBe(element.refs.dialog);
        });

        it('should not be applied to the dialog on render if `props.captureFocus` is `false`', () => {
            const element = render(<UIDialog captureFocus={false} />);

            expect(document.activeElement).not.toBe(element.refs.dialog);
        });

        it('should not leave the dialog if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog captureFocus={true} />);

            element.handleFocus({
                target: mountNode,
                relatedTarget: document.activeElement,
                preventDefault: noop,
            });

            expect(document.activeElement).toBe(element.refs.dialog);
        });
    });

    describe('closeOnEscKey', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnEscKey={true} onClose={stub} />);

            element.handleKeyDown({key: 'Escape'});

            expect(stub.calledOnce).toBe(true);
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleKeyDown({key: 'Escape'});

            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideClick', () => {
        it('should trigger `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnOutsideClick={true} onClose={stub} />);

            element.handleOutsideClick({target: mountNode});

            expect(stub.calledOnce).toBe(true);
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleOutsideClick({target: mountNode});

            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideFocus', () => {
        it('should trigger `props.onClose` if truthy and `props.captureFocus` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={false} closeOnOutsideFocus={true} onClose={stub} />);

            expect(document.activeElement).not.toBe(element.refs.dialog);

            element.handleFocus({target: mountNode});

            expect(stub.calledOnce).toBe(true);
        });

        it('should not trigger `props.onClose` if `props.captureFocus` is truthy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={true} closeOnOutsideFocus={true} onClose={stub} />);

            element.handleFocus({target: mountNode});

            expect(stub.notCalled).toBe(true);
        });

        it('should not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleFocus({target: mountNode});

            expect(stub.notCalled).toBe(true);
        });
    });
});
