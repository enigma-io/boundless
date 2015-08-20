/**
 * A controller view for managing the aggregate state of multiple, related checkboxes.
 * @class UICheckboxGroup
 */

import UIView from '../UIView';
import UICheckbox from '../UICheckbox/';
import React from 'react';
import {map, every, some, noop} from 'lodash';

class UICheckboxGroup extends UIView {
    getClasses() {
        return ['ui-checkbox-group'].concat(this.props.className || []).join(' ');
    }

    getSelectAllClasses() {
        return ['ui-checkbox-group-selectall'].concat(this.props.selectAllAttributes.className || []).join(' ');
    }

    render() {
        let toBeRendered = [this.renderCheckboxes()];

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

        return (
            <div className={this.getClasses()}>
                {toBeRendered}
            </div>
        );
    }

    renderSelectAll() {
        if (this.props.selectAll) {
            let allChecked = this.allItemsChecked();

            return (
                <UICheckbox {...this.props.selectAllAttributes}
                            ref='selectAll'
                            name='uikit-selectAll'
                            key='uikit-selectAll'
                            checked={allChecked}
                            className={this.getSelectAllClasses()}
                            indeterminate={!allChecked && this.anyItemsChecked()}
                            label={this.props.selectAllLabel}
                            onChecked={this.props.onAllChecked}
                            onUnchecked={this.props.onAllUnchecked} />
            );
        }
    }

    renderCheckboxes() {
        return map(this.props.items, (item) => {
            return (
                <UICheckbox
                    {...item}
                    ref={item.name}
                    key={item.name}
                    onChecked={this.props.onChildChecked}
                    onUnchecked={this.props.onChildUnchecked} />
            );
        });
    }

    allItemsChecked() {
        return every(this.props.items, {checked: true});
    }

    anyItemsChecked() {
        return some(this.props.items, {checked: true});
    }
}

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: 'SELECT_ALL_BEFORE',
    SELECT_ALL_AFTER: 'SELECT_ALL_AFTER'
};

UICheckboxGroup.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            checked: React.PropTypes.bool.isRequired,
            label: React.PropTypes.string,
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string
        })
    ).isRequired,
    onAllChecked: React.PropTypes.func,
    onAllUnchecked: React.PropTypes.func,
    onChildChecked: React.PropTypes.func,
    onChildUnchecked: React.PropTypes.func,
    selectAll: React.PropTypes.bool,
    selectAllAttributes: React.PropTypes.object,
    selectAllLabel: React.PropTypes.string,
    selectAllPosition: React.PropTypes.oneOf([
        UICheckboxGroup.Constants.SELECT_ALL_BEFORE,
        UICheckboxGroup.Constants.SELECT_ALL_AFTER
    ])
};

UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: noop,
    onAllUnchecked: noop,
    onChildChecked: noop,
    onChildUnchecked: noop,
    selectAllAttributes: {},
    selectAllLabel: 'Select All',
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};

export default UICheckboxGroup;
