import React, {PropTypes} from 'react';
import cx from 'classnames';

import omit from '../UIUtils/omit';

/**
 * A wrapper that displays provided text on hover.
 */
export default class UITooltip extends React.PureComponent {
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
        position: PropTypes.oneOf(Object.keys(UITooltip.position)),
        text: PropTypes.string,
    }

    static defaultProps = {
        component: 'div',
        position: UITooltip.position.ABOVE,
        text: '',
    }

    static internalKeys = Object.keys(UITooltip.defaultProps)

    render() {
        const {position} = this.props;

        return (
            <this.props.component
                {...omit(this.props, UITooltip.internalKeys)}
                className={cx('ui-tooltip', this.props.className, {
                    'ui-tooltip-position-above': position === UITooltip.position.ABOVE,
                    'ui-tooltip-position-below': position === UITooltip.position.BELOW,
                    'ui-tooltip-position-before': position === UITooltip.position.BEFORE,
                    'ui-tooltip-position-after': position === UITooltip.position.AFTER,
                })}
                data-tooltip={this.props.text}
                aria-label={this.props['aria-label'] || this.props.text}>
                {this.props.children}
            </this.props.component>
        );
    }
}
