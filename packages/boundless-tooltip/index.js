import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from '../boundless-utils-omit-keys/index';

/**
 * A wrapper that displays provided text on hover.
 */
export default class Tooltip extends React.PureComponent {
    static position = {
        ABOVE: 'ABOVE',
        BELOW: 'BELOW',
        BEFORE: 'BEFORE',
        AFTER: 'AFTER',
    }

    static propTypes = {
        component: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),
        position: PropTypes.oneOf(Object.keys(Tooltip.position)),
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
                className={cx('ui-tooltip', this.props.className, {
                    'ui-tooltip-position-above': position === Tooltip.position.ABOVE,
                    'ui-tooltip-position-below': position === Tooltip.position.BELOW,
                    'ui-tooltip-position-before': position === Tooltip.position.BEFORE,
                    'ui-tooltip-position-after': position === Tooltip.position.AFTER,
                })}
                data-tooltip={this.props.text}
                aria-label={this.props['aria-label'] || this.props.text}>
                {this.props.children}
            </this.props.component>
        );
    }
}
