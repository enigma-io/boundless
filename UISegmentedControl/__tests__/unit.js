/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UISegmentedControl from '../../UISegmentedControl';
import conformanceChecker from '../../UIUtils/conform';

import sinon from 'sinon';

describe('UISegmentedControl', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const eventBase = {preventDefault: () => {}};
    const sandbox = sinon.sandbox.create();

    const baseProps = {
        options: [{
            selected: true,
            value: 'foo-val',
            content: 'foo'
        }, {
            selected: false,
            value: 'bar-val',
            content: 'bar'
        }]
    };

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UISegmentedControl, baseProps));

    describe('CSS hook', () => {
        const hasClass = (dom, name) => dom.classList.contains(name);
        let element;

        beforeEach(() => element = render(<UISegmentedControl {...baseProps} />));

        it('ui-segmented-control should be rendered', () => {
            expect(hasClass(element.refs.wrapper, 'ui-segmented-control')).toBe(true);
        });

        it('ui-segmented-control-option should be rendered for child node', () => {
            expect(hasClass(element.refs['option_$0'], 'ui-segmented-control-option')).toBe(true);

            expect(hasClass(element.refs['option_$1'], 'ui-segmented-control-option')).toBe(true);
        });

        it('ui-segmented-control-option-selected should be rendered for child node when `props.selected` is `true`', () => {
            expect(hasClass(element.refs['option_$0'], 'ui-segmented-control-option-selected')).toBe(true);
        });

        it('ui-segmented-control-option-selected should not be rendered for child node when `props.selected` is falsy', () => {
            expect(hasClass(element.refs['option_$1'], 'ui-segmented-control-option-selected')).toBe(false);
        });
    });

    describe('Keyboard navigation', () => {
        it('selected option should have tabIndex=0', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$0'];

            expect(node.getAttribute('tabIndex')).toBe('0');
        });

        it('unselected option should have tabIndex=-1', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);
            const node = element.refs['option_$1'];

            expect(node.getAttribute('tabIndex')).toBe('-1');
        });

        it('right arrow on last child should send focus to first child', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);

            Simulate.focus(element.refs['option_$1']);

            element.handleKeyDown({...eventBase, key: 'ArrowRight'});
            expect(document.activeElement).toBe(element.refs['option_$0']);
        });

        it('left arrow on first child should send focus to last child', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);

            Simulate.focus(element.refs['option_$0']);

            element.handleKeyDown({...eventBase, key: 'ArrowLeft'});
            expect(document.activeElement).toBe(element.refs['option_$1']);
        });
    });

    describe('onOptionSelected', () => {
        it('should be called on a `change` event when `props.selected` is falsy', () => {
            const stub = sandbox.stub();
            const element = render(<UISegmentedControl {...baseProps} name='foo' onOptionSelected={stub} />);
            const node = element.refs['option_$1'];

            Simulate.click(node);

            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('currentValue', () => {
        it('should return the value of the currently selected option', () => {
            const element = render(<UISegmentedControl {...baseProps} name='foo' />);

            expect(element.currentValue()).toBe('foo-val');
        });
    });
});
