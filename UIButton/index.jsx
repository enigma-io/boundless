import UIView from '../UIView';
import React from 'react';
import {noop} from 'lodash';

class UIButton extends UIView {
    getClasses() {
        let classes = ['ui-button'];

        if (typeof this.props.pressed !== 'undefined') {
            classes.push('ui-button-pressable');
        }

        if (this.props.pressed) {
            classes.push('ui-button-pressed');
        }

        return classes.concat(this.props.className || []).join(' ');
    }

    render() {
        return (
            <button
                {...this.props}
                className={this.getClasses()}
                aria-pressed={this.props.pressed}
                onKeyDown={this.handleKeyDown.bind(this)}
                onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </button>
        );
    }

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
}

UIButton.propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    onClick: React.PropTypes.func,
    onPressed: React.PropTypes.func,
    onUnpressed: React.PropTypes.func,
    pressed: React.PropTypes.bool
};

UIButton.defaultProps = {
    onClick: noop,
    onPressed: noop,
    onUnpressed: noop
};

export default UIButton;
