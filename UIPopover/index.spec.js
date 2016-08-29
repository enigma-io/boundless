/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIPopover from './index';
import conformanceChecker from '../UIUtils/conform';

describe('UIPopover component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const body = mountNode;
    const baseProps = {anchor: body};
    const position = UIPopover.position;

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIPopover, baseProps, '$dialog'));

    describe('CSS hook(s)', () => {
        it('renders .ui-popover', () => {
            const popover = render(<UIPopover {...baseProps} />);

            expect(document.querySelector('.ui-popover')).not.toBe(null);
        });

        it('renders .ui-popover-anchor-x-start', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.START} />);

            expect(document.querySelector('.ui-popover-anchor-x-start')).not.toBe(null);
        });

        it('renders .ui-popover-anchor-x-middle', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-anchor-x-middle')).not.toBe(null);
        });

        it('renders .ui-popover-anchor-x-end', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-anchor-x-end')).not.toBe(null);
        });

        it('renders .ui-popover-anchor-y-start', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-anchor-y-start')).not.toBe(null);
        });

        it('renders .ui-popover-anchor-y-middle', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-anchor-y-middle')).not.toBe(null);
        });

        it('renders .ui-popover-anchor-y-end', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-anchor-y-end')).not.toBe(null);
        });

        it('renders .ui-popover-self-x-start', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-self-x-start')).not.toBe(null);
        });

        it('renders .ui-popover-self-x-middle', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-self-x-middle')).not.toBe(null);
        });

        it('renders .ui-popover-self-x-end', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-self-x-end')).not.toBe(null);
        });

        it('renders .ui-popover-self-y-start', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-self-y-start')).not.toBe(null);
        });

        it('renders .ui-popover-self-y-middle', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-self-y-middle')).not.toBe(null);
        });

        it('renders .ui-popover-self-y-end', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(document.querySelector('.ui-popover-self-y-end')).not.toBe(null);
        });
    });

    describe('presets', () => {
        it('configures the popover for the ABOVE preset', () => {
            render(<UIPopover {...baseProps} autoReposition={false} preset={UIPopover.preset.ABOVE} />);

            const popoverNode = document.querySelector('.ui-popover');

            expect(popoverNode.classList.contains('ui-popover-anchor-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the BELOW preset', () => {
            render(<UIPopover {...baseProps} autoReposition={false} preset={UIPopover.preset.BELOW} />);

            const popoverNode = document.querySelector('.ui-popover');

            expect(popoverNode.classList.contains('ui-popover-anchor-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-y-start')).toBeTruthy();
        });

        it('configures the popover for the LEFT preset', () => {
            render(<UIPopover {...baseProps} autoReposition={false} preset={UIPopover.preset.LEFT} />);

            const popoverNode = document.querySelector('.ui-popover');

            expect(popoverNode.classList.contains('ui-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-y-middle')).toBeTruthy();
        });

        it('configures the popover for the RIGHT preset', () => {
            render(<UIPopover {...baseProps} autoReposition={false} preset={UIPopover.preset.RIGHT} />);

            const popoverNode = document.querySelector('.ui-popover');

            expect(popoverNode.classList.contains('ui-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('ui-popover-self-y-middle')).toBeTruthy();
        });
    });

    describe('passthrough to UIDialog', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UIPopover
                    {...baseProps}
                    autoReposition={false}
                    header='foo'
                    headerProps={{className: 'foo'}}
                    bodyProps={{className: 'foo'}}
                    footer='baz'
                    footerProps={{className: 'foo'}}>
                    bar
                </UIPopover>
            );
        });

        it('passes down props.header', () => {
            expect(document.querySelector('.ui-dialog-header').textContent).toContain('foo');
        });

        it('passes down props.headerProps', () => {
            expect(document.querySelector('.ui-dialog-header').classList.contains('foo')).toBe(true);
        });

        it('passes down nested children', () => {
            expect(document.querySelector('.ui-dialog-body').textContent).toContain('bar');
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
