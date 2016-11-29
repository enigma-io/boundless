import React, {PropTypes} from 'react';
import cx from 'classnames';

import isFunction from '../UIUtils/isFunction';
import noop from '../UIUtils/noop';
import omit from '../UIUtils/omit';

export default class UIButton extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        onClick: PropTypes.func,
        onPressed: PropTypes.func,
        onUnpressed: PropTypes.func,
        pressed: PropTypes.bool,
    }

    static defaultProps = {
        children: null,
        onClick: noop,
        onPressed: noop,
        onUnpressed: noop,
        pressed: undefined,
    }

    static internalKeys = Object.keys(UIButton.defaultProps)

    toggleState(event) {
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    }

    handleClick = (event) => {
        if (this.props.disabled) { return; }

        this.toggleState(event);

        if (isFunction(this.props.onClick)) {
            this.props.onClick(event);
        }
    }

    handleKeyDown = (event) => {
        if (this.props.disabled) { return; }

        switch (event.key) {
        case 'Enter':
        case 'Space':
            event.preventDefault();
            this.toggleState(event);
        }

        if (isFunction(this.props.onKeyDown)) {
            this.props.onKeyDown(event);
        }
    }

    render() {
        return (
            <button
                {...omit(this.props, UIButton.internalKeys)}
                ref='button'
                className={cx('ui-button', this.props.className, {
                    'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                    'ui-button-pressed': this.props.pressed,
                })}
                aria-pressed={this.props.pressed}
                onKeyDown={this.handleKeyDown}
                onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}
