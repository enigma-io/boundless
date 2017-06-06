/* eslint no-unused-expressions:0 */

import { createElement } from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Popover from './index';
import { $, conformanceChecker } from '../boundless-utils-test-helpers/index';

describe('Popover component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = (vdom) => ReactDOM.render(vdom, mountNode);
    const sandbox = sinon.sandbox.create();

    const body = mountNode;
    const baseProps = { anchor: body, autoReposition: false };
    const preset = Popover.preset;

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sinon.sandbox.restore();
    });

    it('conforms to the Boundless prop interface standards', () => conformanceChecker(render, Popover, baseProps, 'dialog.$wrapper'));

    describe('CSS hook(s)', () => {
        it('renders .b-popover', () => {
            render(<Popover {...baseProps} />);
            expect($('.b-popover')).not.toBe(null);
        });

        it('renders .b-popover-anchor-x-start', () => {
            render(<Popover {...baseProps} preset={preset.W} />);
            expect($('.b-popover-anchor-x-start')).not.toBe(null);
        });

        it('renders .b-popover-anchor-x-middle', () => {
            render(<Popover {...baseProps} preset={preset.N} />);
            expect($('.b-popover-anchor-x-middle')).not.toBe(null);
        });

        it('renders .b-popover-anchor-x-end', () => {
            render(<Popover {...baseProps} preset={preset.E} />);
            expect($('.b-popover-anchor-x-end')).not.toBe(null);
        });

        it('renders .b-popover-anchor-y-start', () => {
            render(<Popover {...baseProps} preset={preset.N} />);
            expect($('.b-popover-anchor-y-start')).not.toBe(null);
        });

        it('renders .b-popover-anchor-y-middle', () => {
            render(<Popover {...baseProps} preset={preset.W} />);
            expect($('.b-popover-anchor-y-middle')).not.toBe(null);
        });

        it('renders .b-popover-anchor-y-end', () => {
            render(<Popover {...baseProps} preset={preset.S} />);
            expect($('.b-popover-anchor-y-end')).not.toBe(null);
        });

        it('renders .b-popover-self-x-start', () => {
            render(<Popover {...baseProps} preset={preset.E} />);
            expect($('.b-popover-self-x-start')).not.toBe(null);
        });

        it('renders .b-popover-self-x-middle', () => {
            render(<Popover {...baseProps} preset={preset.N} />);
            expect($('.b-popover-self-x-middle')).not.toBe(null);
        });

        it('renders .b-popover-self-x-end', () => {
            render(<Popover {...baseProps} preset={preset.W} />);
            expect($('.b-popover-self-x-end')).not.toBe(null);
        });

        it('renders .b-popover-self-y-start', () => {
            render(<Popover {...baseProps} preset={preset.S} />);
            expect($('.b-popover-self-y-start')).not.toBe(null);
        });

        it('renders .b-popover-self-y-middle', () => {
            render(<Popover {...baseProps} preset={preset.W} />);
            expect($('.b-popover-self-y-middle')).not.toBe(null);
        });

        it('renders .b-popover-self-y-end', () => {
            render(<Popover {...baseProps} preset={preset.N} />);
            expect($('.b-popover-self-y-end')).not.toBe(null);
        });
    });

    describe('presets', () => {
        it('configures the popover for the NNW preset', () => {
            render(<Popover {...baseProps} preset={preset.NNW} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the N preset', () => {
            render(<Popover {...baseProps} preset={preset.N} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the NNE preset', () => {
            render(<Popover {...baseProps} preset={preset.NNE} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the ENE preset', () => {
            render(<Popover {...baseProps} preset={preset.ENE} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('configures the popover for the E preset', () => {
            render(<Popover {...baseProps} preset={preset.E} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-middle')).toBeTruthy();
        });

        it('configures the popover for the ESE preset', () => {
            render(<Popover {...baseProps} preset={preset.ESE} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the SSE preset', () => {
            render(<Popover {...baseProps} preset={preset.SSE} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('configures the popover for the S preset', () => {
            render(<Popover {...baseProps} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('configures the popover for the SSW preset', () => {
            render(<Popover {...baseProps} preset={preset.SSW} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('configures the popover for the WSW preset', () => {
            render(<Popover {...baseProps} preset={preset.WSW} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('configures the popover for the W preset', () => {
            render(<Popover {...baseProps} preset={preset.W} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-middle')).toBeTruthy();
        });

        it('configures the popover for the WNW preset', () => {
            render(<Popover {...baseProps} preset={preset.WNW} />);

            const popoverNode = $('.b-popover');

            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });
    });

    describe('autoReposition', () => {
        let anchor;

        beforeEach(() => {
            anchor = document.createElement('div');

            anchor.height = 10;
            anchor.width = 10;

            document.body.appendChild(anchor);
        });

        afterEach(() => {
            document.body.removeChild(anchor);
        });

        /* JSDOM doesn't have a layout engine, so we have to fake all the viewport-related stuff */

        it('our JSDOM layout assumptions are valid', () => {
            expect(window.innerWidth).toBe(1024);
            expect(window.innerHeight).toBe(768);
        });

        it('selects a different option from the same cardinal if one is valid', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: 0, left: 0, right: 5, bottom: 5, height: 5, width: 5,
            });

            Object.defineProperty(popoverNode, 'clientWidth', { value: 50 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 50 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.S} />);

            // should become SSW
            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('selects a different option from the opposite cardinal if one is valid', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: window.innerHeight - 5, left: 0, right: 5, bottom: window.innerHeight, height: 5, width: 5,
            });

            Object.defineProperty(popoverNode, 'clientWidth', { value: 50 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 50 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.S} />);

            // should become NNW
            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('selects any valid fallback if the same or opposite cardinals will not be valid', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: 300, left: 0, right: 5, bottom: 305, height: 5, width: 5,
            });

            // 300 - 500 is neg and 300 + 500 > 768, so that should force the
            Object.defineProperty(popoverNode, 'clientWidth', { value: 1 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 500 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.S} />);

            // should become E
            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-middle')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-middle')).toBeTruthy();
        });

        it('takes into account if the anchor is bottom-occluded', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: 768, left: 0, right: 5, bottom: 773, height: 5, width: 5,
            });

            Object.defineProperty(popoverNode, 'clientWidth', { value: 50 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 50 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.W} />);

            // should become NNW
            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-end')).toBeTruthy();
        });

        it('takes into account if the anchor is left-occluded', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: 0, left: -2, right: 3, bottom: 5, height: 5, width: 5,
            });

            Object.defineProperty(popoverNode, 'clientWidth', { value: 50 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 50 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.SSW} />);

            // should become ENE
            expect(popoverNode.classList.contains('b-popover-anchor-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('takes into account if the anchor is top-occluded', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: -2, left: 0, right: 5, bottom: 3, height: 5, width: 5,
            });

            Object.defineProperty(popoverNode, 'clientWidth', { value: 50 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 50 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.E} />);

            // should become SSW
            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });

        it('takes into account if the anchor is right-occluded', () => {
            sandbox.stub(document.body, 'getBoundingClientRect').returns({ top: 0, left: 0 });

            render(<Popover {...baseProps} anchor={anchor} preset={preset.S} />);

            const popoverNode = $('.b-popover');

            sandbox.stub(anchor, 'getBoundingClientRect').returns({
                top: 0, left: window.innerWidth - 4, right: window.innerWidth + 1, bottom: 5, height: 5, width: 5,
            });

            Object.defineProperty(popoverNode, 'clientWidth', { value: 50 });
            Object.defineProperty(popoverNode, 'clientHeight', { value: 50 });

            render(<Popover {...baseProps} anchor={anchor} autoReposition={true} preset={preset.E} />);

            // should become WNW
            expect(popoverNode.classList.contains('b-popover-anchor-x-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-x-end')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-anchor-y-start')).toBeTruthy();
            expect(popoverNode.classList.contains('b-popover-self-y-start')).toBeTruthy();
        });
    });

    describe('passthrough to Dialog', () => {
        beforeEach(() => {
            render(
                <Popover {...baseProps} autoReposition={false}>
                    bar
                </Popover>
            );
        });

        it('passes down nested children', () => {
            expect($('.b-dialog').textContent).toContain('bar');
        });
    });

    describe('passthrough to Portal', () => {
        beforeEach(() => {
            render(
                <Popover
                    {...baseProps}
                    autoReposition={false}
                    portalProps={{ className: 'foo', id: 'bar', portalId: 'baz' }}>
                    bar
                </Popover>
            );
        });

        it('passes down arbitrary props', () => {
            expect($('[data-portal-id]').classList.contains('foo')).toBe(true);
            expect($('#bar[data-portal-id]')).not.toBeNull();
            expect($('[data-portal-id="baz"]')).not.toBeNull();
        });
    });
});
