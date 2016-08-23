/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

import UIModal from './index';

describe('UIModal component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIModal, {}, 'modal'));

    it('renders .ui-modal', () => {
        const element = render(<UIModal>foo</UIModal>);

        expect(document.querySelector('.ui-modal')).not.toBe(null);
    });

    it('renders .ui-modal-mask', () => {
        const element = render(<UIModal>foo</UIModal>);

        expect(document.querySelector('.ui-modal-mask')).not.toBe(null);
    });

    it('renders .ui-modal-wrapper', () => {
        const element = render(<UIModal>foo</UIModal>);

        expect(document.querySelector('.ui-modal-wrapper')).not.toBe(null);
    });

    it('accepts arbitrary HTML attributes via props.modalProps', () => {
        const element = render(<UIModal modalProps={{'data-id': 'foo'}} />);

        expect(document.querySelector('.ui-modal').getAttribute('data-id')).toBe('foo');
    });

    it('accepts extra classes via props.modalProps.className', () => {
        const element = render(<UIModal modalProps={{className: 'foo'}} />);

        expect(document.querySelector('.ui-modal').classList.contains('foo')).toBe(true);
    });

    it('accepts arbitrary HTML attributes via props.maskProps', () => {
        const element = render(<UIModal maskProps={{'data-id': 'foo'}} />);

        expect(document.querySelector('.ui-modal-mask').getAttribute('data-id')).toBe('foo');
    });

    it('accepts extra classes via props.maskProps.className', () => {
        const element = render(<UIModal maskProps={{className: 'foo'}} />);

        expect(document.querySelector('.ui-modal-mask').classList.contains('foo')).toBe(true);
    });

    describe('passthrough to UIDialog', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UIModal
                    header='foo'
                    headerProps={{className: 'foo'}}
                    bodyProps={{className: 'foo'}}
                    footer='baz'
                    footerProps={{className: 'foo'}}>
                    bar
                </UIModal>
            );
        });

        it('passes down props.header', () => {
            expect(document.querySelector('.ui-dialog-header').textContent).toContain('foo');
        });

        it('passes down props.headerProps', () => {
            expect(document.querySelector('.ui-dialog-header').classList.contains('foo')).toBe(true);
        });

        it('passes down nested children', () => {
            element = render(<UIModal>foo</UIModal>);
            expect(document.querySelector('.ui-dialog-body').textContent).toContain('foo');
        });

        it('passes down props.bodyProps', () => {
            expect(document.querySelector('.ui-dialog-body').classList.contains('foo')).toBe(true);
        });

        it('passes down props.footer', () => {
            expect(document.querySelector('.ui-dialog-footer').textContent).toContain('baz');
        });

        it('passes down props.footerProps', () => {
            expect(document.querySelector('.ui-dialog-footer').classList.contains('foo')).toBe(true);
        });
    });
});
