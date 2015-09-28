/* eslint no-unused-expressions:0 */

import UIPopover from './index';
import React from 'react';

describe('UIPopover', () => {
    const sandbox = sinon.sandbox.create();
    const body = document.body;
    const constants = UIPopover.Constants;

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes', () => {
            React.render(<UIPopover anchor={body} data-id='foo' />, document.body);

            const node = document.body.querySelector('.ui-popover');

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const popover = React.render(<UIPopover anchor={body} className='foo' />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover ');
            expect(popover.getClasses()).to.contain('foo');
        });

        it('additional classes as an array of strings without replacing the core hook', () => {
            const popover = React.render(<UIPopover anchor={body} className={['foo', 'bar']} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover ');
            expect(popover.getClasses()).to.contain('foo ');
            expect(popover.getClasses()).to.contain(' bar');
        });
    });

    describe('CSS hook', () => {
        it('ui-popover is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover ');
        });

        it('ui-popover-anchor-x-start is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} anchorXAlign={constants.START} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-anchor-x-start');
        });

        it('ui-popover-anchor-x-middle is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} anchorXAlign={constants.MIDDLE} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-anchor-x-middle');
        });

        it('ui-popover-anchor-x-end is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} anchorXAlign={constants.END} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-anchor-x-end');
        });

        it('ui-popover-anchor-y-start is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} anchorYAlign={constants.START} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-anchor-y-start');
        });

        it('ui-popover-anchor-y-middle is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} anchorYAlign={constants.MIDDLE} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-anchor-y-middle');
        });

        it('ui-popover-anchor-y-end is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} anchorYAlign={constants.END} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-anchor-y-end');
        });

        it('ui-popover-self-x-start is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} selfXAlign={constants.START} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-self-x-start');
        });

        it('ui-popover-self-x-middle is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} selfXAlign={constants.MIDDLE} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-self-x-middle');
        });

        it('ui-popover-self-x-end is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} selfXAlign={constants.END} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-self-x-end');
        });

        it('ui-popover-self-y-start is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} selfYAlign={constants.START} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-self-y-start');
        });

        it('ui-popover-self-y-middle is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} selfYAlign={constants.MIDDLE} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-self-y-middle');
        });

        it('ui-popover-self-y-end is rendered', () => {
            const popover = React.render(<UIPopover anchor={body} selfYAlign={constants.END} />, document.body);

            expect(popover.getClasses()).to.contain('ui-popover-self-y-end');
        });
    });
});
