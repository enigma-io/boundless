import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';
import noop from '../UIUtils/noop';

class UIButton extends UIView {
    toggleState(event) {
        event.persist();
        this.props[this.props.pressed ? 'onUnpressed' : 'onPressed'](event);
    }

    handleClick(event) {
        this.toggleState(event);

        if (typeof this.props.onClick === 'function') {
            event.persist();
            this.props.onClick(event);
        }
    }

    handleKeyDown(event) {
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
            <button {...this.props}
                    ref='button'
                    className={cx({
                        'ui-button': true,
                        'ui-button-pressable': typeof this.props.pressed !== 'undefined',
                        'ui-button-pressed': this.props.pressed,
                        [this.props.className]: !!this.props.className,
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
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
    onPressed: React.PropTypes.func,
    onUnpressed: React.PropTypes.func,
    pressed: React.PropTypes.bool,
};

UIButton.defaultProps = {
    onPressed: noop,
    onUnpressed: noop,
};

export default UIButton;
