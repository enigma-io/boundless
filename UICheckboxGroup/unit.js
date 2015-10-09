/* eslint no-unused-expressions:0 */

import UICheckboxGroup from './index';
import React from 'react';
import ReactDOM from 'react-dom';
import {merge} from 'lodash';

describe('UICheckboxGroup', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();
    const items = [{
        label: 'Male',
        name: 'gender-male',
        checked: false
    }, {
        label: 'Female',
        name: 'gender-female',
        checked: false
    }, {
        label: 'Other',
        name: 'gender-other',
        checked: false
    }];

    const checkedItems = items.map((item) => {
        return merge({}, item, {checked: true});
    });

    const mixedItems = items.map((item, index) => {
        return merge({}, item, {checked: !!(index % 2)});
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('an array of properly structured items', () => {
            const group = ReactDOM.render(<UICheckboxGroup items={items} />, mountNode);
            const node = ReactDOM.findDOMNode(group);

            expect(node).to.not.be.null;
        });
    });

    describe('CSS hook', () => {
        it('ui-checkbox-group should be rendered', () => {
            const group = ReactDOM.render(<UICheckboxGroup items={items} />, mountNode);

            expect(group.getClasses()).to.contain('ui-checkbox-group');
        });

        it('ui-checkbox-group-selectall should be rendered', () => {
            const group = ReactDOM.render(
                <UICheckboxGroup items={items}
                                 selectAll={true} />, mountNode
            );

            expect(group.getSelectAllClasses()).to.contain('ui-checkbox-group-selectall');
        });
    });

    describe('select all', () => {
        it('should not render if `selectAll` is falsy', () => {
            const group = ReactDOM.render(<UICheckboxGroup items={items} />, mountNode);

            expect(group.refs.selectAll).to.be.undefined;
        });

        it('should render if `selectAll` is truthy', () => {
            const group = ReactDOM.render(
                <UICheckboxGroup items={items}
                                 selectAll={true} />, mountNode
            );

            const node = ReactDOM.findDOMNode(group.refs.selectAll);

            expect(node).to.not.be.null;
        });

        it('should render in the first position by default', () => {
            const group = ReactDOM.render(
                <UICheckboxGroup items={items}
                                 selectAll={true} />, mountNode
            );

            const node = ReactDOM.findDOMNode(group.refs.selectAll);

            expect(node.parentNode.children[0]).to.equal(node);
        });

        it('should render in the last position if passed the appropriate `selectAllPosition`', () => {
            const group = ReactDOM.render(
                <UICheckboxGroup items={items}
                                 selectAll={true}
                                 selectAllPosition={UICheckboxGroup.Constants.SELECT_ALL_AFTER} />, mountNode
            );

            const node = ReactDOM.findDOMNode(group.refs.selectAll);

            expect(node.parentNode.children[3]).to.equal(node);
        });

        it('should check all children', () => {
            const stub = sandbox.stub();
            const group = ReactDOM.render(
                <UICheckboxGroup items={items}
                                 selectAll={true}
                                 onAllChecked={stub} />, mountNode
            );

            group.refs.selectAll.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('should uncheck all children', () => {
            const stub = sandbox.stub();
            const group = ReactDOM.render(
                <UICheckboxGroup items={checkedItems}
                                 selectAll={true}
                                 onAllUnchecked={stub} />, mountNode
            );

            group.refs.selectAll.handleChange();

            expect(stub).to.have.been.calledOnce;
        });

        it('should be indeterminate if children are in different checked states', () => {
            const group = ReactDOM.render(
                <UICheckboxGroup items={mixedItems}
                                 selectAll={true} />, mountNode
            );

            expect(group.refs.selectAll.props.indeterminate).to.be.true;
        });

        it('should make all children checked if clicked in indeterminate state', () => {
            const stub = sandbox.stub();
            const group = ReactDOM.render(
                <UICheckboxGroup items={mixedItems}
                                 selectAll={true}
                                 onAllChecked={stub} />, mountNode
            );

            group.refs.selectAll.handleChange();

            expect(stub).to.have.been.calledOnce;
        });
    });
});
