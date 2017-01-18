import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from '../boundless-utils-omit-keys/index';

/**
# Tooltip
__A simple wrapper that displays provided text on mouseover.__

Nest any React-renderable content inside the `Tooltip` wrapper as you would a simple `<div>`.
 */
export default class Tooltip extends React.PureComponent {
    static position = {
        ABOVE: 'ABOVE',
        BELOW: 'BELOW',
        BEFORE: 'BEFORE',
        AFTER: 'AFTER',
    }

    static propTypes = {
        /**
         * any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`
         */
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        /**
         * determines the correct class to apply to position the tooltip
         */
        position: PropTypes.oneOf(Object.keys(Tooltip.position)),

        /**
         * the content to be shown in the tooltip
         */
        text: PropTypes.string,
    }

    static defaultProps = {
        component: 'div',
        position: Tooltip.position.ABOVE,
        text: '',
    }

    static internalKeys = Object.keys(Tooltip.defaultProps)

    render() {
        const {position} = this.props;

        return (
            <this.props.component
                {...omit(this.props, Tooltip.internalKeys)}
                className={cx('b-tooltip', this.props.className, {
                    'b-tooltip-position-above': position === Tooltip.position.ABOVE,
                    'b-tooltip-position-below': position === Tooltip.position.BELOW,
                    'b-tooltip-position-before': position === Tooltip.position.BEFORE,
                    'b-tooltip-position-after': position === Tooltip.position.AFTER,
                })}
                data-tooltip={this.props.text}
                aria-label={this.props['aria-label'] || this.props.text}>
                {this.props.children}
            </this.props.component>
        );
    }
}
