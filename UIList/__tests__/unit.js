/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Simulate} from 'react-addons-test-utils';

import UIList from '../../UIList';
import conformanceChecker from '../../UIUtils/conform';

describe('UIList', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);

    const eventBase = {preventDefault: () => {}};
    const listBase = <UIList items={['apple', 'orange']} />;

    let element;
    let node;

    beforeEach(() => {
        element = render(listBase);
        node = element.refs.list;
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIList));

    describe('accepts', () => {
        it('items passed via props.items', () => {
            expect(node.children[0].textContent).toBe('apple');
            expect(node.children[1].textContent).toBe('orange');
        });
    });

    describe('CSS hook', () => {
        it('ui-list should be rendered', () => {
            expect(node.classList.contains('ui-list')).toBe(true);
        });

        it('ui-list-plain should be rendered for a plain list container', () => {
            expect(node.classList.contains('ui-list-plain')).toBe(true);
        });

        it('ui-list-bulleted should be rendered for a bulleted list container', () => {
            element = render(<UIList type='bullet' items={['apple', 'orange']} />);
            node = element.refs.list;

            expect(node.classList.contains('ui-list-bulleted')).toBe(true);
        });

        it('ui-list-numbered should be rendered for a numbered list container', () => {
            element = render(<UIList type='number' items={['apple', 'orange']} />);
            node = element.refs.list;

            expect(node.classList.contains('ui-list-numbered')).toBe(true);
        });

        it('ui-list-item should be rendered for each list item', () => {
            expect(node.querySelectorAll('.ui-list-item').length).toBe(2);
        });
    });

    describe('on keyboard `Tab`', () => {
        it('should move focus to the next child', () => {
            Simulate.focus(element.refs['item_0']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'Tab'
            });

            expect(document.activeElement).toBe(element.refs['item_1']);
        });

        it('should not loop when tabbing from the last child', () => {
            Simulate.focus(element.refs['item_1']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'Tab'
            });

            expect(document.activeElement).not.toBe(element.refs['item_0']);
        });
    });

    describe('on keyboard `Shift+Tab`', () => {
        it('should move focus to the previous child', () => {
            Simulate.focus(element.refs['item_1']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'Tab',
                shiftKey: true
            });

            expect(document.activeElement).toBe(element.refs['item_0']);
        });

        it('should not reverse loop when shift-tabbing from the first child', () => {
            Simulate.focus(element.refs['item_0']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'Tab',
                shiftKey: true
            });

            expect(document.activeElement).not.toBe(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowLeft`', () => {
        it('should move focus to the previous child', () => {
            Simulate.focus(element.refs['item_1']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowLeft'
            });

            expect(document.activeElement).toBe(element.refs['item_0']);
        });

        it('should move focus to the end if on the first child (reverse loop)', () => {
            Simulate.focus(element.refs['item_0']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowLeft'
            });

            expect(document.activeElement).toBe(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowRight`', () => {
        it('should move focus to the next child', () => {
            Simulate.focus(element.refs['item_0']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowRight'
            });

            expect(document.activeElement).toBe(element.refs['item_1']);
        });

        it('should move focus to the beginning if on the last child (loop)', () => {
            Simulate.focus(element.refs['item_1']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowRight'
            });

            expect(document.activeElement).toBe(element.refs['item_0']);
        });
    });

    describe('on keyboard `ArrowUp`', () => {
        beforeEach(() => {
            element = render(<UIList type='bullet' items={['apple', 'orange']} />);
        });

        it('should move focus to the previous child', () => {
            Simulate.focus(element.refs['item_1']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowUp'
            });

            expect(document.activeElement).toBe(element.refs['item_0']);
        });

        it('should loop back to the last item if on the first item', () => {
            Simulate.focus(element.refs['item_0']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowUp'
            });

            expect(document.activeElement).toBe(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowDown`', () => {
        beforeEach(() => {
            element = render(<UIList type='bullet' items={['apple', 'orange']} />);
        });

        it('should move focus to the next child', () => {
            Simulate.focus(element.refs['item_0']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowDown'
            });

            expect(document.activeElement).toBe(element.refs['item_1']);
        });

        it('should loop back to the first item if on the last item', () => {
            Simulate.focus(element.refs['item_1']);
            Simulate.keyDown(element.refs.list, {
                ...eventBase,
                key: 'ArrowDown'
            });

            expect(document.activeElement).toBe(element.refs['item_0']);
        });
    });
});
