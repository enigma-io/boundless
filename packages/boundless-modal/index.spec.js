/* eslint no-unused-expressions:0 */

import {createElement} from 'react';
import ReactDOM from 'react-dom';
import {$, conformanceChecker} from '../boundless-utils-test-helpers/index';

import Modal from './index';

describe('Modal component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Modal, {}, '$modal'));

    it('renders .b-modal', () => {
        render(<Modal>foo</Modal>);
        expect($('.b-modal')).not.toBe(null);
    });

    it('renders .b-modal-mask', () => {
        render(<Modal>foo</Modal>);
        expect($('.b-modal-mask')).not.toBe(null);
    });

    it('renders .b-modal-wrapper', () => {
        render(<Modal>foo</Modal>);
        expect($('.b-modal-wrapper')).not.toBe(null);
    });

    it('accepts arbitrary HTML attributes via props.modalProps', () => {
        render(<Modal modalProps={{'data-id': 'foo'}} />);
        expect($('.b-modal').getAttribute('data-id')).toBe('foo');
    });

    it('accepts extra classes via props.modalProps.className', () => {
        render(<Modal modalProps={{className: 'foo'}} />);
        expect($('.b-modal').classList.contains('foo')).toBe(true);
    });

    it('accepts arbitrary HTML attributes via props.maskProps', () => {
        render(<Modal maskProps={{'data-id': 'foo'}} />);
        expect($('.b-modal-mask').getAttribute('data-id')).toBe('foo');
    });

    it('accepts extra classes via props.maskProps.className', () => {
        render(<Modal maskProps={{className: 'foo'}} />);
        expect($('.b-modal-mask').classList.contains('foo')).toBe(true);
    });

    it('passes down nested children to Dialog', () => {
        render(<Modal>foo</Modal>);
        expect($('.b-dialog').textContent).toContain('foo');
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
            expect($('[data-portal-id]').classList.contains('foo')).toBe(true);
            expect($('#bar[data-portal-id]')).not.toBeNull();
            expect($('[data-portal-id="baz"]')).not.toBeNull();
        });
    });
});
