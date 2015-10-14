/* eslint no-unused-expressions:0 */

import UIPopover from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIPopover', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();
    const body = mountNode;
    const constants = UIPopover.Constants;

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            ReactDOM.render(<UIPopover anchor={body} data-id='foo' />, mountNode);

            const node = document.querySelector('.ui-popover');

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} className='foo bar' />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            ['ui-popover', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });
    });

    describe('CSS hook', () => {
        it('ui-popover is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover'));
        });

        it('ui-popover-anchor-x-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorXAlign={constants.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-anchor-x-start'));
        });

        it('ui-popover-anchor-x-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorXAlign={constants.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-anchor-x-middle'));
        });

        it('ui-popover-anchor-x-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorXAlign={constants.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-anchor-x-end'));
        });

        it('ui-popover-anchor-y-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorYAlign={constants.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-anchor-y-start'));
        });

        it('ui-popover-anchor-y-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorYAlign={constants.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-anchor-y-middle'));
        });

        it('ui-popover-anchor-y-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorYAlign={constants.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-anchor-y-end'));
        });

        it('ui-popover-self-x-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfXAlign={constants.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-self-x-start'));
        });

        it('ui-popover-self-x-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfXAlign={constants.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-self-x-middle'));
        });

        it('ui-popover-self-x-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfXAlign={constants.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-self-x-end'));
        });

        it('ui-popover-self-y-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfYAlign={constants.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-self-y-start'));
        });

        it('ui-popover-self-y-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfYAlign={constants.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-self-y-middle'));
        });

        it('ui-popover-self-y-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfYAlign={constants.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            assert(node.classList.contains('ui-popover-self-y-end'));
        });
    });
});
