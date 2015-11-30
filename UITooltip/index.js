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
            <div {...this.props}
                 className={cx({
                     'ui-tooltip': true,
                     'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                     'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                     'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                     'ui-tooltip-position-after': position === UITooltip.position.AFTER,
                     [this.props.className]: !!this.props.className,
                 })}
                 data-tooltip={this.props.text}
                 aria-label={this.props['aria-label'] || this.props.text}>
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
    position: React.PropTypes.oneOf(Object.keys(UITooltip.position)),
    text: React.PropTypes.string,
};

UITooltip.defaultProps = {
    position: UITooltip.position.ABOVE,
};

export default UITooltip;
