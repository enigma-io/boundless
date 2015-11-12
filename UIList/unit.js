/* eslint no-unused-expressions:0 */

import UIList from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import conformanceChecker from '../UIUtils/conform';

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
            expect(node.children[0].textContent).to.equal('apple');
            expect(node.children[1].textContent).to.equal('orange');
        });
    });

    describe('CSS hook', () => {
        it('ui-list should be rendered', () => {
            assert(node.classList.contains('ui-list'));
        });

        it('ui-list-plain should be rendered for a plain list container', () => {
            assert(node.classList.contains('ui-list-plain'));
        });

        it('ui-list-bulleted should be rendered for a bulleted list container', () => {
            element = render(<UIList type='bullet' items={['apple', 'orange']} />);
            node = element.refs.list;

            assert(node.classList.contains('ui-list-bulleted'));
        });

        it('ui-list-numbered should be rendered for a numbered list container', () => {
            element = render(<UIList type='number' items={['apple', 'orange']} />);
            node = element.refs.list;

            assert(node.classList.contains('ui-list-numbered'));
        });

        it('ui-list-item should be rendered for each list item', () => {
            expect(node.querySelectorAll('.ui-list-item')).to.have.length(2);
        });
    });

    describe('on keyboard `Tab`', () => {
        it('should move focus to the next child', () => {
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'Tab'});

            expect(document.activeElement).to.equal(element.refs['item_1']);
        });

        it('should not loop when tabbing from the last child', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'Tab'});

            expect(document.activeElement).to.not.equal(element.refs['item_0']);
        });
    });

    describe('on keyboard `Shift+Tab`', () => {
        it('should move focus to the previous child', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({
                ...eventBase,
                key: 'Tab',
                shiftKey: true
            });

            expect(document.activeElement).to.equal(element.refs['item_0']);
        });

        it('should not reverse loop when shift-tabbing from the first child', () => {
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({
                ...eventBase,
                key: 'Tab',
                shiftKey: true
            });

            expect(document.activeElement).to.not.equal(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowLeft`', () => {
        it('should move focus to the previous child', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowLeft'});

            expect(document.activeElement).to.equal(element.refs['item_0']);
        });

        it('should move focus to the end if on the first child (reverse loop)', () => {
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowLeft'});

            expect(document.activeElement).to.equal(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowRight`', () => {
        it('should move focus to the next child', () => {
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowRight'});

            expect(document.activeElement).to.equal(element.refs['item_1']);
        });

        it('should move focus to the beginning if on the last child (loop)', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowRight'});

            expect(document.activeElement).to.equal(element.refs['item_0']);
        });

        it('should move focus to the end if on the first child (loop)', () => {
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowRight'});

            expect(document.activeElement).to.equal(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowUp`', () => {
        beforeEach(() => {
            element = render(<UIList type='bullet' items={['apple', 'orange']} />);
        });

        it('should have no effect if a type is not supplied', () => {
            element = render(<UIList items={['apple', 'orange']} />);
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowUp'});

            expect(document.activeElement).to.equal(node);
        });

        it('should move focus to the previous child', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowUp'});

            expect(document.activeElement).to.equal(element.refs['item_0']);
        });

        it('should loop back to the last item if on the first item', () => {
            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowUp'});

            expect(document.activeElement).to.equal(element.refs['item_1']);
        });
    });

    describe('on keyboard `ArrowDown`', () => {
        beforeEach(() => {
            element = render(<UIList type='bullet' items={['apple', 'orange']} />);
        });

        it('should have no effect if a type is not supplied', () => {
            element = render(<UIList items={['apple', 'orange']} />);

            node = element.refs['item_0'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowDown'});

            expect(document.activeElement).to.equal(node);
        });

        it('should move focus to the next child', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowDown'});

            expect(document.activeElement).to.equal(element.refs['item_0']);
        });

        it('should loop back to the first item if on the last item', () => {
            node = element.refs['item_1'];
            node.focus();

            element.handleKeyDown({...eventBase, key: 'ArrowDown'});

            expect(document.activeElement).to.equal(element.refs['item_0']);
        });
    });
});
