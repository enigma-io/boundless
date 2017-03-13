import {createElement, PropTypes, PureComponent} from 'react';
import cx from 'classnames';

import Checkbox from 'boundless-checkbox';
import omit from 'boundless-utils-omit-keys';
import uuid from 'boundless-utils-uuid';

const noop = () => {};

/**
The most common use case for `CheckboxGroup` is a "select all" / children scenario. This particular
configuration is built-in and is activated by passing the `selectAll` prop.
 */
export default class CheckboxGroup extends PureComponent {
    static selectAll = {
        BEFORE: uuid(),
        AFTER: uuid(),
        NONE: uuid(),
    }

    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * override the wrapper HTML element if desired
         */
        component: PropTypes.string,

        /**
         * the data wished to be rendered, each item must conform to the [Checkbox prop spec](https://github.com/enigma-io/boundless/blob/master/packages/boundless-checkbox)
         */
        items: PropTypes.arrayOf(Checkbox.propTypes.inputProps).isRequired,

        /**
         * called when all children become checked (not fired on first render), no return
         */
        onAllChecked: PropTypes.func,

        /**
         * called when all children become unchecked (not fired on first render), no return
         */
        onAllUnchecked: PropTypes.func,

        /**
         * called when a specific child has become checked, returns the child definition
         */
        onChildChecked: PropTypes.func,

        /**
         * called when a specific child has become checked, returns the child definition
         */
        onChildUnchecked: PropTypes.func,

        /**
         * renders a master checkbox that can manipulate the values of all children simultaneously
         */
        selectAll: PropTypes.oneOf([
            CheckboxGroup.selectAll.BEFORE,
            CheckboxGroup.selectAll.AFTER,
            CheckboxGroup.selectAll.NONE,
        ]),

        /**
         * must conform to the [Checkbox prop spec](./Checkbox)
         */
        selectAllProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,

            /**
             * the text or renderable node to display next to the checkbox
             */
            label: PropTypes.string,
            inputProps: PropTypes.object,
        }),
    }

    static defaultProps = {
        component: 'div',
        items: [],
        onAllChecked: noop,
        onAllUnchecked: noop,
        onChildChecked: noop,
        onChildUnchecked: noop,
        selectAll: CheckboxGroup.selectAll.BEFORE,
        selectAllProps: {},
    }

    static internalKeys = Object.keys(CheckboxGroup.defaultProps)

    selectAllUUID = uuid()

    allItemsChecked() {
        return this.props.items.every((item) => item.inputProps.checked === true);
    }

    anyItemsChecked() {
        return this.props.items.some((item) => item.inputProps.checked === true);
    }

    renderSelectAllCheckbox() {
        const allChecked = this.allItemsChecked();
        const {inputProps} = this.props.selectAllProps;

        return (
            <Checkbox
                {...this.props.selectAllProps}
                key={this.selectAllUUID}
                className={cx('b-checkbox-group-all', this.props.selectAllProps.className)}
                inputProps={{
                    ...inputProps,
                    checked: allChecked,
                    indeterminate: !allChecked && this.anyItemsChecked(),
                    name: inputProps && inputProps.name ? inputProps.name : null,
                }}
                label={this.props.selectAllProps.label || 'Select All'}
                onChecked={this.props.onAllChecked}
                onUnchecked={this.props.onAllUnchecked} />
        );
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
        const children = [this.renderCheckboxes()];

        switch (this.props.selectAll) {
        case CheckboxGroup.selectAll.BEFORE:
            children.unshift(this.renderSelectAllCheckbox());
            break;

        case CheckboxGroup.selectAll.AFTER:
            children.push(this.renderSelectAllCheckbox());
            break;
        }

        return children;
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, CheckboxGroup.internalKeys)}
                className={cx('b-checkbox-group', this.props.className)}>
                {this.renderChildren()}
            </this.props.component>
        );
    }
}
