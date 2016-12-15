/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../boundless-utils-conformance/index';

import Modal from './index';

describe('Modal component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Modal, {}, '$modal'));

    it('renders .b-modal', () => {
        render(<Modal>foo</Modal>);
        expect(document.querySelector('.b-modal')).not.toBe(null);
    });

    it('renders .b-modal-mask', () => {
        render(<Modal>foo</Modal>);
        expect(document.querySelector('.b-modal-mask')).not.toBe(null);
    });

    it('renders .b-modal-wrapper', () => {
        render(<Modal>foo</Modal>);
        expect(document.querySelector('.b-modal-wrapper')).not.toBe(null);
    });

    it('accepts arbitrary HTML attributes via props.modalProps', () => {
        render(<Modal modalProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.b-modal').getAttribute('data-id')).toBe('foo');
    });

    it('accepts extra classes via props.modalProps.className', () => {
        render(<Modal modalProps={{className: 'foo'}} />);
        expect(document.querySelector('.b-modal').classList.contains('foo')).toBe(true);
    });

    it('accepts arbitrary HTML attributes via props.maskProps', () => {
        render(<Modal maskProps={{'data-id': 'foo'}} />);
        expect(document.querySelector('.b-modal-mask').getAttribute('data-id')).toBe('foo');
    });

    it('accepts extra classes via props.maskProps.className', () => {
        render(<Modal maskProps={{className: 'foo'}} />);
        expect(document.querySelector('.b-modal-mask').classList.contains('foo')).toBe(true);
    });

    describe('passthrough to Dialog', () => {
        beforeEach(() => {
            render(
                <Modal
                    header='foo'
                    headerProps={{className: 'foo'}}
                    bodyProps={{className: 'foo'}}
                    footer='baz'
                    footerProps={{className: 'foo'}}>
                    bar
                </Modal>
            );
        });

        it('passes down props.header', () => {
            expect(document.querySelector('.b-dialog-header').textContent).toContain('foo');
        });

        it('passes down props.headerProps', () => {
            expect(document.querySelector('.b-dialog-header').classList.contains('foo')).toBe(true);
        });

        it('passes down nested children', () => {
            render(<Modal>foo</Modal>);
            expect(document.querySelector('.b-dialog-body').textContent).toContain('foo');
        });

        it('passes down props.bodyProps', () => {
            expect(document.querySelector('.b-dialog-body').classList.contains('foo')).toBe(true);
        });

        it('passes down props.footer', () => {
            expect(document.querySelector('.b-dialog-footer').textContent).toContain('baz');
        });

        it('passes down props.footerProps', () => {
            expect(document.querySelector('.b-dialog-footer').classList.contains('foo')).toBe(true);
        });
    });

    describe('passthrough to Portal', () => {
        beforeEach(() => {
            render(
                <Modal portalProps={{className: 'foo', id: 'bar', portalId: 'baz'}}>
                    bar
                </Modal>
            );
        });

        it('passes down arbitrary props', () => {
            expect(document.querySelector('[data-portal-id]').classList.contains('foo')).toBe(true);
            expect(document.querySelector('#bar[data-portal-id]')).not.toBeNull();
            expect(document.querySelector('[data-portal-id="baz"]')).not.toBeNull();
        });
    });
});
