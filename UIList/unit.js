/* eslint no-unused-expressions:0 */

import UIList from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import {merge} from 'lodash';

describe('UIList', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const eventBase = {preventDefault: () => {}};
    const listBase = <UIList attrs={{'data-foo': 'bar'}} items={['apple', 'orange']} />;

    let list;
    let node;

    beforeEach(() => {
        list = ReactDOM.render(listBase, mountNode);
        node = ReactDOM.findDOMNode(list);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
    });

    describe('accepts', () => {
        it('items passed via props.items', () => {
            expect(node.children[0].textContent).to.equal('apple');
            expect(node.children[1].textContent).to.equal('orange');
        });

        it('arbitrary HTML attributes via props.attrs', () => {
            expect(node.hasAttribute('data-foo')).to.be.true;
            expect(node.getAttribute('data-foo')).to.equal('bar');
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
            list = ReactDOM.render(<UIList type='bullet' items={['apple', 'orange']} />, mountNode);
            node = ReactDOM.findDOMNode(list);

            assert(node.classList.contains('ui-list-bulleted'));
        });

        it('ui-list-numbered should be rendered for a numbered list container', () => {
            list = ReactDOM.render(<UIList type='number' items={['apple', 'orange']} />, mountNode);
            node = ReactDOM.findDOMNode(list);

            assert(node.classList.contains('ui-list-numbered'));
        });

        it('ui-list-item should be rendered for each list item', () => {
            expect(node.querySelectorAll('.ui-list-item')).to.have.length(2);
        });
    });

    describe('on keyboard `Tab`', () => {
        it('should move focus to the next child', () => {
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'Tab'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[1]);
        });

        it('should not loop when tabbing from the last child', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'Tab'}, eventBase));

            expect(document.activeElement).to.not.equal(list.refs[0]);
        });
    });

    describe('on keyboard `Shift+Tab`', () => {
        it('should move focus to the previous child', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'Tab', shiftKey: true}, eventBase));

            expect(document.activeElement).to.equal(list.refs[0]);
        });

        it('should not reverse loop when shift-tabbing from the first child', () => {
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'Tab', shiftKey: true}, eventBase));

            expect(document.activeElement).to.not.equal(list.refs[1]);
        });
    });

    describe('on keyboard `ArrowLeft`', () => {
        it('should move focus to the previous child', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowLeft'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[0]);
        });

        it('should move focus to the end if on the first child (reverse loop)', () => {
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowLeft'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[1]);
        });
    });

    describe('on keyboard `ArrowRight`', () => {
        it('should move focus to the next child', () => {
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[1]);
        });

        it('should move focus to the beginning if on the last child (loop)', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[0]);
        });

        it('should move focus to the end if on the first child (loop)', () => {
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[1]);
        });
    });

    describe('on keyboard `ArrowUp`', () => {
        beforeEach(() => {
            list = ReactDOM.render(<UIList type='bullet' items={['apple', 'orange']} />, mountNode);
        });

        it('should have no effect if a type is not supplied', () => {
            list = ReactDOM.render(<UIList items={['apple', 'orange']} />, mountNode);
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(node);
        });

        it('should move focus to the previous child', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[0]);
        });

        it('should loop back to the last item if on the first item', () => {
            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[1]);
        });
    });

    describe('on keyboard `ArrowDown`', () => {
        beforeEach(() => {
            list = ReactDOM.render(<UIList type='bullet' items={['apple', 'orange']} />, mountNode);
        });

        it('should have no effect if a type is not supplied', () => {
            list = ReactDOM.render(<UIList items={['apple', 'orange']} />, mountNode);

            node = list.refs[0];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(node);
        });

        it('should move focus to the next child', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[0]);
        });

        it('should loop back to the first item if on the last item', () => {
            node = list.refs[1];
            node.focus();

            list.handleKeyDown(merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(list.refs[0]);
        });
    });
});
