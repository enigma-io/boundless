/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIPopover from '../../UIPopover';
import conformanceChecker from '../../UIUtils/conform';

describe('UIPopover', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const body = mountNode;
    const baseProps = {anchor: body};
    const position = UIPopover.position;

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIPopover, baseProps, 'dialog'));

    describe('accepts', () => {
        it('an additional class as a string without replacing the core hook', () => {
            const popover = render(<UIPopover {...baseProps} className='foo bar' />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            ['ui-popover', 'foo', 'bar'].forEach(cname => expect(node.classList.contains(cname)).toBe(true));
        });
    });

    describe('CSS hook(s)', () => {
        it('ui-popover is rendered', () => {
            const popover = render(<UIPopover {...baseProps} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover')).toBe(true);
        });

        it('ui-popover-anchor-x-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-start')).toBe(true);
        });

        it('ui-popover-anchor-x-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-middle')).toBe(true);
        });

        it('ui-popover-anchor-x-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorXAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-x-end')).toBe(true);
        });

        it('ui-popover-anchor-y-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-start')).toBe(true);
        });

        it('ui-popover-anchor-y-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-middle')).toBe(true);
        });

        it('ui-popover-anchor-y-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} anchorYAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-anchor-y-end')).toBe(true);
        });

        it('ui-popover-self-x-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-start')).toBe(true);
        });

        it('ui-popover-self-x-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-middle')).toBe(true);
        });

        it('ui-popover-self-x-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfXAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-x-end')).toBe(true);
        });

        it('ui-popover-self-y-start is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.START} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-start')).toBe(true);
        });

        it('ui-popover-self-y-middle is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.MIDDLE} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-middle')).toBe(true);
        });

        it('ui-popover-self-y-end is rendered', () => {
            const popover = render(<UIPopover {...baseProps} selfYAlign={position.END} />);
            const node = ReactDOM.findDOMNode(popover.renderDialog());

            expect(node.classList.contains('ui-popover-self-y-end')).toBe(true);
        });
    });

    describe('passthrough to UIDialog', () => {
        let element;

        beforeEach(() => {
            element = render(
                <UIPopover {...baseProps}
                           header='foo'
                           headerProps={{className: 'foo'}}
                           bodyProps={{className: 'foo'}}
                           footer='baz'
                           footerProps={{className: 'foo'}}>
                    bar
                </UIPopover>
            );
        });

        it('should correctly pass down props.header', () => {
            expect(element.refs.dialog.refs.header.textContent).toContain('foo');
        });

        it('should correctly pass down props.headerProps', () => {
            expect(element.refs.dialog.refs.header.classList.contains('foo')).toBe(true);
        });

        it('should correctly pass down props.body', () => {
            expect(element.refs.dialog.refs.body.textContent).toContain('bar');
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
            element = render(<UIPopover {...baseProps}>foo</UIPopover>);
            expect(ReactDOM.findDOMNode(element.refs.dialog).textContent).toContain('foo');
        });
    });
});
