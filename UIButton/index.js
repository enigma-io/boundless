import React from 'react';
import cx from 'classnames';
import omit from 'lodash.omit';

import UIView from '../UIView';
import noop from '../UIUtils/noop';

export default class UIButton extends UIView {
    static propTypes = {
        children: React.PropTypes.node,
        onClick: React.PropTypes.func,
        onPressed: React.PropTypes.func,
        onUnpressed: React.PropTypes.func,
        pressed: React.PropTypes.bool,
    };

    static internal_keys = Object.keys(UIButton.propTypes)

    static defaultProps = {
        onPressed: noop,
        onUnpressed: noop,
    };

    toggleState(event) {
        event.persist();
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    }

    handleClick = (event) => {
        if (this.props.disabled) { return; }

        this.toggleState(event);

        if (typeof this.props.onClick === 'function') {
            event.persist();
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

        if (typeof this.props.onKeyDown === 'function') {
            event.persist();
            this.props.onKeyDown(event);
        }
    }

    render() {
        return (
            <button
                {...omit(this.props, UIButton.internal_keys)}
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
