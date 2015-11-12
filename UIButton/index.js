import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIButton extends UIView {
    toggleState() {
        if (typeof this.props.pressed !== 'undefined') {
            this.props[this.props.pressed ? 'onUnpressed' : 'onPressed']();
        }
    }

    handleClick() {
        this.toggleState();
        this.props.onClick();
    }

    handleKeyDown(event) {
        switch (event.key) {
        case 'Enter':
        case 'Space':
            event.preventDefault();
            this.toggleState();

            if (typeof this.props.pressed === 'undefined') {
                this.props.onClick();
            }
        }
    }

    render() {
        return (
            <button {...this.props.attrs}
                    className={cx({
                        'ui-button': true,
                        'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                        'ui-button-pressed': this.props.pressed,
                        [this.props.className]: !!this.props.className,
                        [this.props.attrs.className]: !!this.props.attrs.className
                    })}
                    aria-pressed={this.props.pressed}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </button>
        );
    }
}

UIButton.propTypes = {
    attrs: React.PropTypes.object,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onPressed: React.PropTypes.func,
    onUnpressed: React.PropTypes.func,
    pressed: React.PropTypes.bool
};

UIButton.defaultProps = {
    attrs: {},
    onClick: noop,
    onPressed: noop,
    onUnpressed: noop
};

export default UIButton;
