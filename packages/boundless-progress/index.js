import React, {PropTypes} from 'react';
import cx from 'classnames';

import Button from '../boundless-button/index';
import noop from '../boundless-utils-noop/index';
import omit from '../boundless-utils-omit-keys/index';

/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 */
export default class Progress extends React.PureComponent {
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

    static internalKeys = Object.keys(Progress.defaultProps)

    renderLabel() {
        if (this.props.label) {
            return (
                <div
                    {...this.props.labelProps}
                    ref='label'
                    className={cx('b-progress-label', this.props.labelProps.className)}>
                    {this.props.label}
                </div>
            );
        }
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <Button
                    {...this.props.cancelProps}
                    ref='cancel'
                    className={cx('b-progress-cancel', this.props.cancelProps.className)}
                    onPressed={this.props.onCancel} />
            );
        }
    }

    renderProgress() {
        return (
            <div
                {...this.props.progressProps}
                ref='progress'
                className={cx('b-progress', this.props.progressProps.className, {
                    'b-progress-indeterminate': typeof this.props.progress === 'undefined',
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
                {...omit(this.props, Progress.internalKeys)}
                ref='wrapper'
                className={cx('b-progress-wrapper', this.props.className)}>
                {this.renderProgress()}
                {this.renderLabel()}
                {this.renderCancel()}
            </this.props.component>
        );
    }
}
