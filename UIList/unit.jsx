import UIList from './index.jsx';
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
        beforeEach(() => {
            list = React.render(listBase, document.body);
        });

        it('items passed via props.items', () => {
            const listNode = React.findDOMNode(list);

            expect(listNode.children[0].textContent).to.equal('apple');
            expect(listNode.children[1].textContent).to.equal('orange');
        });
    });

    describe('on keyboard `Tab`', () => {
        it('should move focus to the next child', () => {
            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'Tab'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });

        it('should not loop when tabbing from the last child', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'Tab'}, eventBase));

            expect(document.activeElement).to.not.equal(React.findDOMNode(list.refs[0]));
        });
    });

    describe('on keyboard `Shift+Tab`', () => {
        it('should move focus to the previous child', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'Tab', shiftKey: true}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should not reverse loop when shift-tabbing from the first child', () => {
            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'Tab', shiftKey: true}, eventBase));

            expect(document.activeElement).to.not.equal(React.findDOMNode(list.refs[1]));
        });
    });

    describe('on keyboard `ArrowLeft`', () => {
        it('should move focus to the previous child', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowLeft'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should move focus to the end if on the first child (reverse loop)', () => {
            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowLeft'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });
    });

    describe('on keyboard `ArrowRight`', () => {
        it('should move focus to the next child', () => {
            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[1]));
        });

        it('should move focus to the beginning if on the last child (loop)', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowRight'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should move focus to the end if on the first child (loop)', () => {
            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
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

            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(itemNode);
        });

        it('should move focus to the previous child', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowUp'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should loop back to the last item if on the first item', () => {
            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
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

            const itemNode = React.findDOMNode(list.refs[0]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(itemNode);
        });

        it('should move focus to the next child', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });

        it('should loop back to the first item if on the last item', () => {
            const itemNode = React.findDOMNode(list.refs[1]);

            itemNode.focus();
            list.handleKeyDown(_.merge({key: 'ArrowDown'}, eventBase));

            expect(document.activeElement).to.equal(React.findDOMNode(list.refs[0]));
        });
    });
});
