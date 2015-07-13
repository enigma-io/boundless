import UIView from '../UIView';
import React from 'react';

let noop = function noop() {};

class UIButton extends UIView {
    componentDidMount() {
        if (this.props.autofocus) {
            React.findDOMNode(this).focus();
        }
    }

    getClassNames() {
        return ['ui-button'].concat(this.props.className).join(' ');
    }

    render() {
        return (
            <button
                {...this.props}
                className={this.getClassNames()}
                onClick={this.handleClick.bind(this)}
                onDoubleClick={noop}>
                {this.props.children}
            </button>
        );
    }

    handleClick(event) {
        event.persist();

        if (this.props.onDoubleClick) {
            if (this.waiting) {
                window.clearTimeout(this.waiting);
                this.waiting = null;

                this.props.onDoubleClick(event);
            } else {
                this.waiting = window.setTimeout((persistedEvent) => {
                    this.props.onClick(persistedEvent);
                    this.waiting = null;
                }, 300, event);
            }
        } else {
            this.props.onClick(event);
        }
    }
}

UIButton.propTypes = {
    autofocus: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    onClick: React.PropTypes.func,
    onDoubleClick: React.PropTypes.func
};

export default UIButton;
