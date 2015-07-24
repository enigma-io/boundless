import UIView from '../UIView';
import UICheckbox from '../UICheckbox/';
import React from 'react';
import _ from 'lodash';

class UICheckboxGroup extends UIView {
    getClassNames() {
        return ['ui-checkbox-group'].concat(this.props.className || []).join(' ');
    }

    render() {
        let toBeRendered = [this.renderCheckboxes()];

        if (this.props.showSelectAll && this.props.selectAllPosition) {
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
            <div className={this.getClassNames()}>
                {toBeRendered}
            </div>
        );
    }

    renderSelectAll() {
        if (this.props.showSelectAll) {
            let allChecked = this.allItemsChecked();

            return (
                <UICheckbox
                    ref='selectAll'
                    name='uikit-selectAll'
                    key='uikit-selectAll'
                    className='ui-checkbox-group-selectall'
                    label={this.props.selectAllLabel}
                    checked={allChecked}
                    indeterminate={!allChecked && this.anyItemsChecked()}
                    onChecked={this.props.onAllChecked}
                    onUnchecked={this.props.onAllUnchecked} />
            );
        }
    }

    renderCheckboxes() {
        return _.map(this.props.items, (item) => {
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
        return _.every(this.props.items, {checked: true});
    }

    anyItemsChecked() {
        return _.some(this.props.items, {checked: true});
    }
}

UICheckboxGroup.Constants = {
    SELECT_ALL_BEFORE: _.uniqueId(),
    SELECT_ALL_AFTER: _.uniqueId()
};

UICheckboxGroup.defaultProps = {
    items: [],
    onAllChecked: _.noop,
    onAllUnchecked: _.noop,
    onChildChecked: _.noop,
    onChildUnchecked: _.noop,
    selectAllLabel: 'Select All',
    selectAllPosition: UICheckboxGroup.Constants.SELECT_ALL_BEFORE
};

UICheckboxGroup.propTypes = {
    autofocus: React.PropTypes.oneOf(React.PropTypes.bool, React.PropTypes.number),
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            autofocus: React.PropTypes.bool,
            checked: React.PropTypes.bool.isRequired,
            label: React.PropTypes.string,
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string
        })
    ),
    onAllChecked: React.PropTypes.func,
    onAllUnchecked: React.PropTypes.func,
    onChildChecked: React.PropTypes.func,
    onChildUnchecked: React.PropTypes.func,
    selectAllLabel: React.PropTypes.string,
    selectAllPosition: React.PropTypes.oneOf([
        UICheckboxGroup.Constants.SELECT_ALL_BEFORE,
        UICheckboxGroup.Constants.SELECT_ALL_AFTER
    ]),
    showSelectAll: React.PropTypes.bool
};

export default UICheckboxGroup;
