/**
 * A wrapper that displays provided text on hover.
 * @class UITooltip
 */

import React from 'react';
import ReactDOM from 'react-dom';
import UIView from '../UIView';
import cx from 'classnames';

class UITooltip extends UIView {
    render() {
        const position = this.props.position;

        return (
            <div {...this.props.attrs}
                 id={this.props.id || this.props.attrs.id}
                 className={cx({
                     'ui-tooltip': true,
                     'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                     'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                     'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                     'ui-tooltip-position-after': position === UITooltip.position.AFTER,
                     [this.props.className]: !!this.props.className,
                     [this.props.attrs.className]: !!this.props.attrs.className,
                 })}
                 style={{...this.props.style, ...this.props.attrs.style}}
                 data-tooltip={this.props.text}
                 aria-label={this.props.text}>
                {this.props.children}
            </div>
        );
    }
}

UITooltip.position = {
    ABOVE: 'ABOVE',
    BELOW: 'BELOW',
    BEFORE: 'BEFORE',
    AFTER: 'AFTER',
};

UITooltip.propTypes = {
    attrs: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    position: React.PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: React.PropTypes.string,
    style: React.PropTypes.object,
};

UITooltip.defaultProps = {
    attrs: {},
    position: UITooltip.position.ABOVE,
};

export default UITooltip;
