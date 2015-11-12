/* eslint no-unused-expressions:0 */

import UIPopover from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

describe('UIPopover', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const sandbox = sinon.sandbox.create();
    const body = mountNode;
    const baseProps = {anchor: body};
    const position = UIPopover.position;

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIPopover, baseProps, 'dialog'));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const popover = render(<UIPopover {...baseProps} className='foo bar' />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            ['ui-popover', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });
    });

    describe('CSS hook', () => {
        it('ui-popover is rendered', () => {
            const popover = render(<UIPopover {...baseProps} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover')).to.be.true;
        });

        it('ui-popover-anchor-x-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-start')).to.be.true;
        });

        it('ui-popover-anchor-x-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-middle')).to.be.true;
        });

        it('ui-popover-anchor-x-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-end')).to.be.true;
        });

        it('ui-popover-anchor-y-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-start')).to.be.true;
        });

        it('ui-popover-anchor-y-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-middle')).to.be.true;
        });

        it('ui-popover-anchor-y-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-end')).to.be.true;
        });

        it('ui-popover-self-x-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-start')).to.be.true;
        });

        it('ui-popover-self-x-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-middle')).to.be.true;
        });

        it('ui-popover-self-x-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-end')).to.be.true;
        });

        it('ui-popover-self-y-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-start')).to.be.true;
        });

        it('ui-popover-self-y-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-middle')).to.be.true;
        });

        it('ui-popover-self-y-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-end')).to.be.true;
        });
    });
});
