/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import Popover from './index';
import conformanceChecker from '../boundless-utils-conformance/index';

describe('Popover component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);

    const body = mountNode;
    const baseProps = {anchor: body};
    const position = Popover.position;

    afterEach(() => ReactDOM.unmountComponentAtNode(mountNode));

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Popover, baseProps, 'dialog.$dialog'));

    describe('CSS hook(s)', () => {
        it('renders .b-popover', () => {
            render(<Popover {...baseProps} />);
            expect(document.querySelector('.b-popover')).not.toBe(null);
        });

        it('renders .b-popover-anchor-x-start', () => {
            render(<Popover {...baseProps} anchorXAlign={position.START} />);
            expect(document.querySelector('.b-popover-anchor-x-start')).not.toBe(null);
        });

        it('renders .b-popover-anchor-x-middle', () => {
            render(<Popover {...baseProps} anchorXAlign={position.MIDDLE} />);
            expect(document.querySelector('.b-popover-anchor-x-middle')).not.toBe(null);
        });

        it('renders .b-popover-anchor-x-end', () => {
            render(<Popover {...baseProps} anchorXAlign={position.END} />);
            expect(document.querySelector('.b-popover-anchor-x-end')).not.toBe(null);
        });

        it('renders .b-popover-anchor-y-start', () => {
            render(<Popover {...baseProps} anchorYAlign={position.START} />);
            expect(document.querySelector('.b-popover-anchor-y-start')).not.toBe(null);
        });

        it('renders .b-popover-anchor-y-middle', () => {
            render(<Popover {...baseProps} anchorYAlign={position.MIDDLE} />);
            expect(document.querySelector('.b-popover-anchor-y-middle')).not.toBe(null);
        });

        it('renders .b-popover-anchor-y-end', () => {
            render(<Popover {...baseProps} anchorYAlign={position.END} />);
            expect(document.querySelector('.b-popover-anchor-y-end')).not.toBe(null);
        });

        it('renders .b-popover-self-x-start', () => {
            render(<Popover {...baseProps} selfXAlign={position.START} />);
            expect(document.querySelector('.b-popover-self-x-start')).not.toBe(null);
        });

        it('renders .b-popover-self-x-middle', () => {
            render(<Popover {...baseProps} selfXAlign={position.MIDDLE} />);
            expect(document.querySelector('.b-popover-self-x-middle')).not.toBe(null);
        });

        it('renders .b-popover-self-x-end', () => {
            render(<Popover {...baseProps} selfXAlign={position.END} />);
            expect(document.querySelector('.b-popover-self-x-end')).not.toBe(null);
        });

        it('renders .b-popover-self-y-start', () => {
            render(<Popover {...baseProps} selfYAlign={position.START} />);
            expect(document.querySelector('.b-popover-self-y-start')).not.toBe(null);
        });

        it('renders .b-popover-self-y-middle', () => {
            render(<Popover {...baseProps} selfYAlign={position.MIDDLE} />);
            expect(document.querySelector('.b-popover-self-y-middle')).not.toBe(null);
        });

        it('renders .b-popover-self-y-end', () => {
            render(<Popover {...baseProps} selfYAlign={position.END} />);
            expect(document.querySelector('.b-popover-self-y-end')).not.toBe(null);
        });
    });

    describe('presets', () => {
        it('configures the popover for the ABOVE preset', () => {
            render(<Popover {...baseProps} autoReposition={false} preset={Popover.preset.ABOVE} />);

            const popoverNode = document.querySelector('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the BELOW preset', () => {
            render(<Popover {...baseProps} autoReposition={false} preset={Popover.preset.BELOW} />);

            const popoverNode = document.querySelector('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('configures the popover for the LEFT preset', () => {
            render(<Popover {...baseProps} autoReposition={false} preset={Popover.preset.LEFT} />);

            const popoverNode = document.querySelector('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-middle')).toBeTruthy();
        });

        it('configures the popover for the RIGHT preset', () => {
            render(<Popover {...baseProps} autoReposition={false} preset={Popover.preset.RIGHT} />);

            const popoverNode = document.querySelector('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-middle')).toBeTruthy();
        });
    });

    describe('passthrough to Dialog', () => {
        beforeEach(() => {
            render(
                <Popover
                    {...baseProps}
                    autoReposition={false}
                    header='foo'
                    headerProps={{className: 'foo'}}
                    bodyProps={{className: 'foo'}}
                    footer='baz'
                    footerProps={{className: 'foo'}}>
                    bar
                </Popover>
            );
        });

        it('passes down props.header', () => {
            expect(document.querySelector('.b-dialog-header').textContent).toContain('foo');
        });

        it('passes down props.headerProps', () => {
            expect(document.querySelector('.b-dialog-header').classList.contains('foo')).toBe(true);
        });

        it('passes down nested children', () => {
            expect(document.querySelector('.b-dialog-body').textContent).toContain('bar');
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
                <Popover
                    {...baseProps}
                    autoReposition={false}
                    portalProps={{className: 'foo', id: 'bar', portalId: 'baz'}}>
                    bar
                </Popover>
            );
        });

        it('passes down arbitrary props', () => {
            expect(document.querySelector('[data-portal-id]').classList.contains('foo')).toBe(true);
            expect(document.querySelector('#bar[data-portal-id]')).not.toBeNull();
            expect(document.querySelector('[data-portal-id="baz"]')).not.toBeNull();
        });
    });
});
