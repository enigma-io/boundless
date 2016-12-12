import React, {PropTypes} from 'react';
import cx from 'classnames';

import Checkbox from '../boundless-checkbox/index';
import omit from '../boundless-utils-omit-keys/index';
import noop from '../boundless-utils-noop/index';

/**
 * A controller view for managing the aggregate state of multiple, related checkboxes.
 */
export default class CheckboxGroup extends React.PureComponent {
    static Constants = {
        SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
        SELECT_ALL_AFTER: 'SELECT_ALL_AFTER',
    }

    static propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                inputProps: PropTypes.shape({
                    checked: PropTypes.bool.isRequired,
                    label: PropTypes.string,
                    name: PropTypes.string.isRequired,
                    value: PropTypes.string,
                }),
            })
        ).isRequired,
        onAllChecked: PropTypes.func,
        onAllUnchecked: PropTypes.func,
        onChildChecked: PropTypes.func,
        onChildUnchecked: PropTypes.func,
        selectAll: PropTypes.bool,
        selectAllProps: PropTypes.object,
        selectAllPosition: PropTypes.oneOf([
            CheckboxGroup.Constants.SELECT_ALL_BEFORE,
            CheckboxGroup.Constants.SELECT_ALL_AFTER,
        ]),
    }

    static defaultProps = {
        items: [],
        onAllChecked: noop,
        onAllUnchecked: noop,
        onChildChecked: noop,
        onChildUnchecked: noop,
        selectAll: false,
        selectAllProps: {},
        selectAllPosition: CheckboxGroup.Constants.SELECT_ALL_BEFORE,
    }

    static internalKeys = Object.keys(CheckboxGroup.defaultProps)

    allItemsChecked() {
        return this.props.items.every((item) => item.inputProps.checked === true);
    }

    anyItemsChecked() {
        return this.props.items.some((item) => item.inputProps.checked === true);
    }

    renderSelectAll() {
        if (this.props.selectAll) {
            const allChecked = this.allItemsChecked();
            const {inputProps} = this.props.selectAllProps;

            return (
                <Checkbox
                    {...this.props.selectAllProps}
                    ref='select_all'
                    key='cb_select_all'
                    className={cx('ui-checkbox-group-selectall', this.props.selectAllProps.className)}
                    inputProps={{
                        ...inputProps,
                        checked: allChecked,
                        indeterminate: !allChecked && this.anyItemsChecked(),
                        name: inputProps && inputProps.name
                              ? inputProps.name
                              : 'cb_select_all',
                    }}
                    label={this.props.selectAllProps.label || 'Select All'}
                    onChecked={this.props.onAllChecked}
                    onUnchecked={this.props.onAllUnchecked} />
            );
        }
    }

    renderCheckboxes() {
        return this.props.items.map((item) => {
            return (
                <Checkbox
                    {...item}
                    key={item.inputProps.name}
                    onChecked={this.props.onChildChecked}
                    onUnchecked={this.props.onChildUnchecked} />
            );
        });
    }

    renderChildren() {
        const toBeRendered = [this.renderCheckboxes()];

        if (this.props.selectAll && this.props.selectAllPosition) {
            switch (this.props.selectAllPosition) {
            case CheckboxGroup.Constants.SELECT_ALL_BEFORE:
                toBeRendered.unshift(this.renderSelectAll());
                break;

            case CheckboxGroup.Constants.SELECT_ALL_AFTER:
                toBeRendered.push(this.renderSelectAll());
                break;
            }
        }

        return toBeRendered;
    }

    render() {
        return (
            <div
                {...omit(this.props, CheckboxGroup.internalKeys)}
                ref='group'
                className={cx('ui-checkbox-group', this.props.className)}>
                {this.renderChildren()}
            </div>
        );
    }
}
