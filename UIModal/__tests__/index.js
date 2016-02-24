/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../../UIUtils/conform';

import UIModal from '../../UIModal';

describe('UIModal', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIModal));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.modalProps', () => {
            const element = render(<UIModal modalProps={{'data-id': 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.dialog);

            expect(node.getAttribute('data-id')).toBe('foo');
        });

        it('extra classes via props.modalProps.className', () => {
            const element = render(<UIModal modalProps={{className: 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.dialog);

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('arbitrary HTML attributes via props.maskProps', () => {
            const element = render(<UIModal maskProps={{'data-id': 'foo'}} />);

            expect(element.refs.mask.getAttribute('data-id')).toBe('foo');
        });

        it('extra classes via props.maskProps.className', () => {
            const element = render(<UIModal maskProps={{className: 'foo'}} />);
            const node = element.refs.mask;

            expect(node.classList.contains('foo')).toBe(true);
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UIModal className='foo bar' />);
            const node = element.refs.wrapper;

            ['ui-modal-wrapper', 'foo', 'bar'].forEach(cname => expect(node.classList.contains(cname)).toBe(true));
        });
    });

    describe('CSS hook(s)', () => {
        let element;

        beforeEach(() => {
            element = render(<UIModal />);
        });

        it('ui-modal is rendered', () => {
            expect(ReactDOM.findDOMNode(element.refs.dialog).classList.contains('ui-modal')).toBe(true);
        });

        it('ui-modal-mask is rendered', () => {
            expect(element.refs.mask.classList.contains('ui-modal-mask')).toBe(true);
        });

        it('ui-modal-wrapper is rendered', () => {
            expect(element.refs.wrapper.classList.contains('ui-modal-wrapper')).toBe(true);
        });
    });

    describe('passthrough to UIDialog', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UIModal header='foo'
                         headerProps={{className: 'foo'}}
                         bodyProps={{className: 'foo'}}
                         footer='baz'
                         footerProps={{className: 'foo'}}>
                    bar
                </UIModal>
            );
        });

        it('should correctly pass down props.header', () => {
            expect(element.refs.dialog.refs.header.textContent).toContain('foo');
        });

        it('should correctly pass down props.headerProps', () => {
            expect(element.refs.dialog.refs.header.classList.contains('foo')).toBe(true);
        });

        it('should correctly pass down props.bodyProps', () => {
            expect(element.refs.dialog.refs.body.classList.contains('foo')).toBe(true);
        });

        it('should correctly pass down props.footer', () => {
            expect(element.refs.dialog.refs.footer.textContent).toContain('baz');
        });

        it('should correctly pass down props.footerProps', () => {
            expect(element.refs.dialog.refs.footer.classList.contains('foo')).toBe(true);
        });

        it('should correctly pass down nested children', () => {
            element = render(<UIModal>foo</UIModal>);
            expect(ReactDOM.findDOMNode(element.refs.dialog).textContent).toContain('foo');
        });
    });
});
