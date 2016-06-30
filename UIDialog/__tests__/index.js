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

    let element;

    beforeEach(() => sandbox.useFakeTimers());
    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.reset();
    })

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIDialog, {}, '$dialog'));

    it('renders .ui-dialog', () => {
        render(<UIDialog />);
        expect(document.querySelector('.ui-dialog')).not.toBe(null);
    });

    it('renders .ui-dialog-body', () => {
        render(<UIDialog />);
        expect(document.querySelector('.ui-dialog-body')).not.toBe(null);
    });

    it('renders .ui-dialog-footer', () => {
        render(<UIDialog footer='x' />);
        expect(document.querySelector('.ui-dialog-footer')).not.toBe(null);
    });

    it('renders .ui-dialog-header', () => {
        render(<UIDialog header='x' />);
        expect(document.querySelector('.ui-dialog-header')).not.toBe(null);
    });

    it('accepts arbitrary React-supported HTML attributes via props.bodyProps', () => {
        render(<UIDialog bodyProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.ui-dialog-body').getAttribute('data-id')).toBe('foo');
    });

    it('accepts arbitrary React-supported HTML attributes via props.footerProps', () => {
        render(<UIDialog footer='x' footerProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.ui-dialog-footer').getAttribute('data-id')).toBe('foo');
    });

    it('accepts arbitrary React-supported HTML attributes via props.headerProps', () => {
        render(<UIDialog header='x' headerProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.ui-dialog-header').getAttribute('data-id')).toBe('foo');
    });

    it('accepts an additional class as a string without replacing the core hook', () => {
        render(<UIDialog className='foo' />);
        expect(document.querySelector('.ui-dialog').classList.contains('ui-dialog')).toBe(true);
        expect(document.querySelector('.ui-dialog').classList.contains('foo')).toBe(true);
    });

    it('accepts renderable header content', () => {
        render(<UIDialog header='foo' />);
        expect(document.querySelector('.ui-dialog-header').textContent).toBe('foo');
    });

    it('accepts renderable footer content', () => {
        render(<UIDialog footer='foo' />);
        expect(document.querySelector('.ui-dialog-footer').textContent).toBe('foo');
    });

    it('accepts renderable content as a nested child', () => {
        render(<UIDialog>foo</UIDialog>);
        expect(document.querySelector('.ui-dialog-body').textContent).toBe('foo');
    });

    it('renders focus boundary nodes if `props.captureFocus` is `true`', () => {
        const element = render(<UIDialog captureFocus={true} />);

        expect(document.querySelectorAll('.ui-offscreen[tabindex="0"]').length).toBe(2);
    });

    it('will not render focus boundary nodes if `props.captureFocus` is `false`', () => {
        const element = render(<UIDialog captureFocus={false} />);

        expect(document.querySelectorAll('.ui-offscreen[tabindex="0"]').length).toBe(0);
    });

    describe('focus', () => {
        it('is applied to the dialog on render if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog captureFocus={true} />);

            expect(document.activeElement).toBe(document.querySelector('.ui-dialog'));
        });

        it('is not applied to the dialog on render if `props.captureFocus` is `false`', () => {
            console.log(document.activeElement.className);

            const element = render(<UIDialog captureFocus={false} />);

            expect(document.activeElement).not.toBe(document.querySelector('.ui-dialog'));
        });

        it('will not leave the dialog if `props.captureFocus` is `true`', () => {
            const element = render(<UIDialog captureFocus={true} />);

            element.handleFocus({
                target: mountNode,
                relatedTarget: document.activeElement,
                preventDefault: noop,
            });

            expect(document.activeElement).toBe(document.querySelector('.ui-dialog'));
        });
    });

    describe('keydown event', () => {
        it('is forwarded if `props.onKeyDown` is passed', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onKeyDown={stub} />);

            element.handleKeyDown({persist: noop});

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch({persist: noop})).toBe(true);
        });
    });

    describe('closeOnEscKey', () => {
        it('triggers `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnEscKey={true} onClose={stub} />);

            element.handleKeyDown({key: 'Escape'});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleKeyDown({key: 'Escape'});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideClick', () => {
        it('triggers `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnOutsideClick={true} onClose={stub} />);

            element.handleOutsideClick({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleOutsideClick({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideFocus', () => {
        it('triggers `props.onClose` if truthy and `props.captureFocus` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={false} closeOnOutsideFocus={true} onClose={stub} />);

            expect(document.activeElement).not.toBe(document.querySelector('.ui-dialog'));

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if `props.captureFocus` is truthy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={true} closeOnOutsideFocus={true} onClose={stub} />);

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy and `props.captureFocus` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog captureFocus={false} closeOnOutsideFocus={false} onClose={stub} />);

            expect(document.activeElement).not.toBe(document.querySelector('.ui-dialog'));

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleFocus({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });

    describe('closeOnOutsideScroll', () => {
        it('triggers `props.onClose` if `true`', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog closeOnOutsideScroll={true} onClose={stub} />);

            element.handleOutsideScrollWheel({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.calledOnce).toBe(true);
        });

        it('will not trigger `props.onClose` if falsy or not provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIDialog onClose={stub} />);

            element.handleOutsideScrollWheel({target: mountNode});
            sandbox.clock.tick(1);
            expect(stub.notCalled).toBe(true);
        });
    });
});
