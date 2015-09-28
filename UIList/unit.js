/* eslint no-unused-expressions:0 */

import UIList from './index';
import React from 'react';
import _ from 'lodash';

describe('UIList', () => {
    const eventBase = {preventDefault: () => {}};
    const listBase = <UIList items={['apple', 'orange']} />;

    let list;

    beforeEach(() => {
        list = React.render(listBase, document.body);
    });

    afterEach(() => {
        React.unmountComponentAtNode(document.body);
    });

    describe('accepts', () => {
        it('items passed via props.items', () => {
            const node = React.findDOMNode(list);

            expect(node.children[0].textContent).to.equal('apple');
            expect(node.children[1].textContent).to.equal('orange');
        });
    });

    describe('CSS hook', () => {
        it('ui-list should be rendered', () => {
            expect(list.getClasses()).to.contain('ui-list');
        });

        it('ui-list-plain should be rendered for a plain list container', () => {
            expect(list.getClasses()).to.contain('ui-list-plain');
        });

        it('ui-list-bulleted should be rendered for a bulleted list container', () => {
            list = React.render(<UIList type='bullet' items={['apple', 'orange']} />, document.body);

            expect(list.getClasses()).to.contain('ui-list-bulleted');
        });

        it('ui-list-numbered should be rendered for a numbered list container', () => {
            list = React.render(<UIList type='number' items={['apple', 'orange']} />, document.body);

            expect(list.getClasses()).to.contain('ui-list-numbered');
        });

        it('ui-list-item should be rendered for each list item', () => {
            const node = React.findDOMNode(list);

            expect(node.querySelectorAll('.ui-list-item')).to.have.length(2);
        });
    });

    describe('on keyboard `Tab`', () => {
        it('should move focus to the next child', () => {
            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'Tab'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });

        it('should not loop when tabbing from the last child', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'Tab'}, eventBase));

            expect(document.activeElement).to.not.equal(React.findDOMNode(list.refs[0]));
        });
    });

    describe('on keyboard `Shift+Tab`', () => {
        it('should move focus to the previous child', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'Tab', shiftKey: true}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should not reverse loop when shift-tabbing from the first child', () => {
            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'Tab', shiftKey: true}, eventBase));

            expect(document.activeElement).to.not.equal(React.findDOMNode(list.refs[1]));
        });
    });

    describe('on keyboard `ArrowLeft`', () => {
        it('should move focus to the previous child', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowLeft'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should move focus to the end if on the first child (reverse loop)', () => {
            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowLeft'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });
    });

    describe('on keyboard `ArrowRight`', () => {
        it('should move focus to the next child', () => {
            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });

        it('should move focus to the beginning if on the last child (loop)', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should move focus to the end if on the first child (loop)', () => {
            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });
    });

    describe('on keyboard `ArrowUp`', () => {
        beforeEach(() => {
            list = React.render(<UIList type='bullet' items={['apple', 'orange']} />, document.body);
        });

        it('should have no effect if a type is not supplied', () => {
            list = React.render(<UIList items={['apple', 'orange']} />, document.body);

            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(node);
        });

        it('should move focus to the previous child', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should loop back to the last item if on the first item', () => {
            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });
    });

    describe('on keyboard `ArrowDown`', () => {
        beforeEach(() => {
            list = React.render(<UIList type='bullet' items={['apple', 'orange']} />, document.body);
        });

        it('should have no effect if a type is not supplied', () => {
            list = React.render(<UIList items={['apple', 'orange']} />, document.body);

            const node = React.findDOMNode(list.refs[0]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(node);
        });

        it('should move focus to the next child', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should loop back to the first item if on the last item', () => {
            const node = React.findDOMNode(list.refs[1]);

            node.focus();
            list.handleKeyDown(_.merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });
    });
});
