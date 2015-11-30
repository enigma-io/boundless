/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../../UIUtils/conform';

import UIModal from '../../UIModal';

import sinon from 'sinon';
import {assert, expect} from 'chai';

describe('UIModal', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIModal));

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.modalAttrs', () => {
            const element = render(<UIModal modalAttrs={{'data-id': 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.dialog);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('extra classes via props.modalAttrs.className', () => {
            const element = render(<UIModal modalAttrs={{className: 'foo'}} />);
            const node = ReactDOM.findDOMNode(element.refs.dialog);

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('arbitrary HTML attributes via props.maskAttrs', () => {
            const element = render(<UIModal maskAttrs={{'data-id': 'foo'}} />);

            expect(element.refs.mask.getAttribute('data-id')).to.equal('foo');
        });

        it('extra classes via props.maskAttrs.className', () => {
            const element = render(<UIModal maskAttrs={{className: 'foo'}} />);
            const node = element.refs.mask;

            expect(node.classList.contains('foo')).to.be.true;
        });

        it('an additional class as a string without replacing the core hook', () => {
            const element = render(<UIModal className='foo bar' />);
            const node = element.refs.wrapper;

            ['ui-modal-wrapper', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });
    });

    describe('CSS hook', () => {
        let element;

        beforeEach(() => {
            element = render(<UIModal />);
        });

        it('ui-modal is rendered', () => {
            assert(ReactDOM.findDOMNode(element.refs.dialog).classList.contains('ui-modal'));
        });

        it('ui-modal-mask is rendered', () => {
            assert(element.refs.mask.classList.contains('ui-modal-mask'));
        });

        it('ui-modal-wrapper is rendered', () => {
            assert(element.refs.wrapper.classList.contains('ui-modal-wrapper'));
        });
    });

    describe('passthrough to UIDialog', () => {
        let element;

        beforeEach(() => {
            element = render(<UIModal header='foo'
                                      headerAttrs={{className: 'foo'}}
                                      body='bar'
                                      bodyAttrs={{className: 'foo'}}
                                      footer='baz'
                                      footerAttrs={{className: 'foo'}} />);
        });

        it('should correctly pass down props.header', () => {
            expect(element.refs.dialog.refs.header.textContent).to.contain('foo');
        });

        it('should correctly pass down props.headerAttrs', () => {
            expect(element.refs.dialog.refs.header.classList.contains('foo')).to.be.true;
        });

        it('should correctly pass down props.body', () => {
            expect(element.refs.dialog.refs.body.textContent).to.contain('bar');
        });

        it('should correctly pass down props.bodyAttrs', () => {
            expect(element.refs.dialog.refs.body.classList.contains('foo')).to.be.true;
        });

        it('should correctly pass down props.footer', () => {
            expect(element.refs.dialog.refs.footer.textContent).to.contain('baz');
        });

        it('should correctly pass down props.footerAttrs', () => {
            expect(element.refs.dialog.refs.footer.classList.contains('foo')).to.be.true;
        });

        it('should correctly pass down nested children', () => {
            element = render(<UIModal>foo</UIModal>);
            expect(ReactDOM.findDOMNode(element.refs.dialog).textContent).to.contain('foo');
        });
    });
});
