import React from 'react';
import cx from 'classnames';
import omit from 'lodash.omit';

import isFunction from '../UIUtils/isFunction';
import noop from '../UIUtils/noop';

export default class UIButton extends React.PureComponent {
    static propTypes = {
        children: React.PropTypes.node,
        onClick: React.PropTypes.func,
        onPressed: React.PropTypes.func,
        onUnpressed: React.PropTypes.func,
        pressed: React.PropTypes.bool,
    };

    static internalKeys = Object.keys(UIButton.propTypes)

    static defaultProps = {
        onPressed: noop,
        onUnpressed: noop,
    };

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
                className={cx({
                    'ui-button': true,
                    'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                    'ui-button-pressed': this.props.pressed,
                    [this.props.className]: !!this.props.className,
                })}
                aria-pressed={this.props.pressed}
                onKeyDown={this.handleKeyDown}
                onClick={this.handleClick}>
                {this.props.children}
            </button>
        );
    }
}
