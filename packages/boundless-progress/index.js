import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';
import cx from 'classnames';

import Button from 'boundless-button';
import omit from 'boundless-utils-omit-keys';

export default class Progress extends PureComponent {
    static propTypes = {
        /**
         * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
         */
        '*': PropTypes.any,

        /**
         * any valid HTML tag name
         */
        cancelComponent: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func,
        ]),

        cancelProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        /**
         * any valid HTML tag name
         */
        component: PropTypes.string,

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
         * any valid HTML tag name
         */
        progressComponent: PropTypes.string,

        progressProps: PropTypes.shape({
            /**
             * any [React-supported attribute](https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes)
             */
            '*': PropTypes.any,
        }),

        /**
         * the CSS property to tween (must accept percentages) - defaults to "width"
         */
        tweenProperty: PropTypes.string,
    }

    static defaultProps = {
        cancelComponent: 'button',
        cancelProps: {},
        component: 'div',
        onCancel: null,
        progress: undefined,
        progressComponent: 'div',
        progressProps: {},
        tweenProperty: 'width',
    }

    static internalKeys = Object.keys(Progress.defaultProps)

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <Button
                    {...this.props.cancelProps}
                    className={cx('b-progress-cancel', this.props.cancelProps.className)}
                    component={this.props.cancelComponent}
                    onPressed={this.props.onCancel} />
            );
        }
    }

    renderProgress() {
        return (
            <this.props.progressComponent
                {...this.props.progressProps}
                className={cx('b-progress', this.props.progressProps.className, {
                    'b-progress-indeterminate': this.props.progress === undefined,
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
                className={cx('b-progress-wrapper', this.props.className)}
                data-progress={this.props.progress !== undefined ? this.props.progress : null}>
                {this.renderProgress()}
                {this.props.children}
                {this.renderCancel()}
            </this.props.component>
        );
    }
}
