/* eslint no-unused-expressions:0 */

import UIPopover from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIPopover', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();
    const body = mountNode;
    const position = UIPopover.position;

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('arbitrary HTML attributes via props.attrs', () => {
            ReactDOM.render(<UIPopover anchor={body} attrs={{'data-id':'foo'}} />, mountNode);

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

            expect(node.classList.contains('ui-popover')).to.be.true;
        });

        it('ui-popover-anchor-x-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorXAlign={position.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-start')).to.be.true;
        });

        it('ui-popover-anchor-x-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorXAlign={position.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-middle')).to.be.true;
        });

        it('ui-popover-anchor-x-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorXAlign={position.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-end')).to.be.true;
        });

        it('ui-popover-anchor-y-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorYAlign={position.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-start')).to.be.true;
        });

        it('ui-popover-anchor-y-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorYAlign={position.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-middle')).to.be.true;
        });

        it('ui-popover-anchor-y-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} anchorYAlign={position.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-end')).to.be.true;
        });

        it('ui-popover-self-x-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfXAlign={position.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-start')).to.be.true;
        });

        it('ui-popover-self-x-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfXAlign={position.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-middle')).to.be.true;
        });

        it('ui-popover-self-x-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfXAlign={position.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-end')).to.be.true;
        });

        it('ui-popover-self-y-start is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfYAlign={position.START} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-start')).to.be.true;
        });

        it('ui-popover-self-y-middle is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfYAlign={position.MIDDLE} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-middle')).to.be.true;
        });

        it('ui-popover-self-y-end is rendered', () => {
            const popover = ReactDOM.render(<UIPopover anchor={body} selfYAlign={position.END} />, mountNode);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-end')).to.be.true;
        });
    });
});
