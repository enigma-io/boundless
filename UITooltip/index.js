/**
 * A wrapper that displays provided text on hover.
 * @class UITooltip
 */

import React from 'react';
import cx from 'classnames';
import omit from 'lodash.omit';

import UIView from '../UIView';

export default class UITooltip extends UIView {
    static position = {
        ABOVE: 'ABOVE',
        BELOW: 'BELOW',
        BEFORE: 'BEFORE',
        AFTER: 'AFTER',
    }

    static propTypes = {
        position: React.PropTypes.oneOf(Object.keys(UITooltip.position)),
        text: React.PropTypes.string,
    }

    static internal_keys = Object.keys(UITooltip.propTypes)

    static defaultProps = {
        position: UITooltip.position.ABOVE,
    }

    render() {
        const {position} = this.props;

        return (
            <div
                {...omit(this.props, UITooltip.internal_keys)}
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
