/**
 * A controller view for managing the aggregate state of multiple, related checkboxes.
 * @class UICheckboxGroup
 */

import React from 'react';
import UIView from '../UIView';
import UICheckbox from '../UICheckbox';
import cx from 'classnames';
import noop from '../UIUtils/noop';

export default class UICheckboxGroup extends UIView {
    static Constants = {
        SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
        SELECT_ALL_AFTER: 'SELECT_ALL_AFTER',
    }

    static propTypes = {
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                checked: React.PropTypes.bool.isRequired,
                label: React.PropTypes.string,
                name: React.PropTypes.string.isRequired,
                value: React.PropTypes.string,
            })
        ).isRequired,
        onAllChecked: React.PropTypes.func,
        onAllUnchecked: React.PropTypes.func,
        onChildChecked: React.PropTypes.func,
        onChildUnchecked: React.PropTypes.func,
        selectAll: React.PropTypes.bool,
        selectAllProps: React.PropTypes.object,
        selectAllLabel: React.PropTypes.string,
        selectAllPosition: React.PropTypes.oneOf([
            UICheckboxGroup.Constants.SELECT_ALL_BEFORE,
            UICheckboxGroup.Constants.SELECT_ALL_AFTER,
        ]),
    }

    static defaultProps = {
        items: [],
        onAllChecked: noop,
        onAllUnchecked: noop,
        onChildChecked: noop,
        onChildUnchecked: noop,
        selectAllProps: {},
        selectAllLabel: 'Select All',
        selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE,
    }

    allItemsChecked() {
        return this.props.items.every(item => item.checked === true);
    }

    anyItemsChecked() {
        return this.props.items.some(item => item.checked === true);
    }

    renderSelectAll() {
        if (this.props.selectAll) {
            const allChecked = this.allItemsChecked();

            return (
                <UICheckbox {...this.props.selectAllProps}
                            ref='select_all'
                            name={this.props.selectAllProps.name || 'cb_select_all'}
                            key='cb_select_all'
                            checked={allChecked}
                            className={cx({
                                'ui-checkbox-group-selectall': true,
                                [this.props.selectAllProps.className]: !!this.props.selectAllProps.className,
                            })}
                            indeterminate={!allChecked && this.anyItemsChecked()}
                            label={this.props.selectAllLabel}
                            onChecked={this.props.onAllChecked}
                            onUnchecked={this.props.onAllUnchecked} />
            );
        }
    }

    renderCheckboxes() {
        return this.props.items.map(item => {
            return (
                <UICheckbox {...item}
                            key={item.name}
                            onChecked={this.props.onChildChecked}
                            onUnchecked={this.props.onChildUnchecked} />
            );
        });
    }

    renderChildren() {
        const toBeRendered = [this.renderCheckboxes()];

        if (this.props.selectAll && this.props.selectAllPosition) {
            switch (this.props.selectAllPosition) {
            case UICheckboxGroup.Constants.SELECT_ALL_BEFORE:
                toBeRendered.unshift(this.renderSelectAll());
                break;

            case UICheckboxGroup.Constants.SELECT_ALL_AFTER:
                toBeRendered.push(this.renderSelectAll());
                break;
            }
        }

        return toBeRendered;
    }

    render() {
        return (
            <div {...this.props}
                 ref='group'
                 className={cx({
                    'ui-checkbox-group': true,
                    [this.props.className]: !!this.props.className,
                 })}>
                {this.renderChildren()}
            </div>
        );
    }
}
