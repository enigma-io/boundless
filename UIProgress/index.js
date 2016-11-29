import React, {PropTypes} from 'react';
import cx from 'classnames';

import UIButton from '../UIButton';
import noop from '../UIUtils/noop';
import omit from '../UIUtils/omit';

/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 */
export default class UIProgress extends React.PureComponent {
    static propTypes = {
        cancelProps: PropTypes.object,
        component: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
        ]),
        label: PropTypes.node,
        labelProps: PropTypes.object,
        onCancel: PropTypes.func,
        progress: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        progressProps: PropTypes.object,
        tweenProperty: PropTypes.string,
    }

    static defaultProps = {
        cancelProps: {},
        component: 'div',
        label: null,
        labelProps: {},
        onCancel: noop,
        progress: undefined,
        progressProps: {},
        tweenProperty: 'width',
    }

    static internalKeys = Object.keys(UIProgress.defaultProps)

    renderLabel() {
        if (this.props.label) {
            return (
                <div
                    {...this.props.labelProps}
                    ref='label'
                    className={cx('ui-progress-label', this.props.labelProps.className)}>
                    {this.props.label}
                </div>
            );
        }
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <UIButton
                    {...this.props.cancelProps}
                    ref='cancel'
                    className={cx('ui-progress-cancel', this.props.cancelProps.className)}
                    onPressed={this.props.onCancel} />
            );
        }
    }

    renderProgress() {
        return (
            <div
                {...this.props.progressProps}
                ref='progress'
                className={cx('ui-progress', this.props.progressProps.className, {
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined',
                })}
                role='presentation'
                style={{
                    ...this.props.progressProps.style,
                    [this.props.tweenProperty]: this.props.progress,
                }} />
        );
    }

    render() {
        return (
            <this.props.component
                {...omit(this.props, UIProgress.internalKeys)}
                ref='wrapper'
                className={cx('ui-progress-wrapper', this.props.className)}>
                {this.renderProgress()}
                {this.renderLabel()}
                {this.renderCancel()}
            </this.props.component>
        );
    }
}
