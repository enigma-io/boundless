/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 * @class UIProgress
 */

import React from 'react';
import UIButton from '../UIButton';
import UIView from '../UIView';
import cx from 'classnames';

class UIProgress extends UIView {
    renderLabel() {
        if (this.props.label) {
            return (
                <div {...this.props.labelProps}
                     ref='label'
                     className={cx({
                        'ui-progress-label': true,
                        [this.props.labelProps.className]: !!this.props.labelProps.className,
                     })}>
                    {this.props.label}
                </div>
            );
        }
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <UIButton {...this.props.cancelProps}
                          ref='cancel'
                          className={cx({
                              'ui-progress-cancel': true,
                              [this.props.cancelProps.className]: !!this.props.cancelProps.className,
                          })}
                          onClick={this.props.onCancel} />
            );
        }
    }

    renderProgress() {
        return (
            <div {...this.props.progressProps}
                 ref='progress'
                 className={cx({
                    'ui-progress': true,
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined',
                    [this.props.progressProps.className]: !!this.props.progressProps.className,
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
            <div {...this.props}
                 ref='wrapper'
                 className={cx({
                    'ui-progress-wrapper': true,
                    [this.props.className]: !!this.props.className,
                 })}>
                {this.renderProgress()}
                {this.renderLabel()}
                {this.renderCancel()}
            </div>
        );
    }
}

UIProgress.defaultProps = {
    cancelProps: {},
    labelProps: {},
    progressProps: {},
    tweenProperty: 'width',
};

UIProgress.propTypes = {
    cancelProps: React.PropTypes.object,
    label: React.PropTypes.node,
    labelProps: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    progressProps: React.PropTypes.object,
    tweenProperty: React.PropTypes.string,
};

export default UIProgress;
