import React, {PropTypes} from 'react';
import cx from 'classnames';

import Button from '../boundless-button/index';
import omit from '../boundless-utils-omit-keys/index';

/**
# Progress
__An unopinionated progress implementation, allowing for a variety of shapes and effects.__

> The Boundless Team recommends reviewing the [Progress Indicator](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/ControlsIndicators.html#//apple_ref/doc/uid/20000957-CH50-SW2) and [User Feedback](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/Feedback.html#//apple_ref/doc/uid/20000957-CH9-SW1) sections of the Apple Human Interface Guidelines for inspiration of design patterns and optimal usage of `Progress` in your project.

### Interactions

Type | Context | Expectation
---- | ------- | -----------
__Render__ | no `progress` passed | should have the indeterminate class
__Keyboard__ | `[Enter, Space]` on cancel element | should trigger the onCancel handler
__Mouse__ | `click` on cancel element | should trigger the onCancel handler
 */
export default class Progress extends React.PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-progress-cancel` node
         */
        cancelProps: PropTypes.object,

        /**
         * any valid HTML tag name or a React component factory, anything that can be passed as the first argument to `React.createElement`
         */
        component: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.func,
        ]),

        /**
         * the value to show as a label of the progress, e.g. "50%"
         */
        label: PropTypes.node,

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-progress-label` node
         */
        labelProps: PropTypes.object,

        /**
         * if supplied, adds a cancel element and calls this function when that element is clicked
         */
        onCancel: PropTypes.func,

        /**
         * the integer (and unit, if applicable) of the current progress state, e.g. 0.01 (opacity)
         */
        progress: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),

        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes); applied to the `.b-progress` node
         */
        progressProps: PropTypes.object,

        /**
         * the CSS property to tween (must accept percentages) - defaults to "width"
         */
        tweenProperty: PropTypes.string,
    }

    static defaultProps = {
        cancelProps: {},
        component: 'div',
        label: null,
        labelProps: {},
        onCancel: null,
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
