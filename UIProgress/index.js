/**
 * An unopinionated progress implementation that allows for a variety of shapes and effects.
 * @class UIProgress
 */

import UIButton from '../UIButton';
import UIView from '../UIView';
import React from 'react';
import cx from 'classnames';

class UIProgress extends UIView {
    renderLabel() {
        if (this.props.label) {
            return (
                <div {...this.props.labelAttrs}
                     ref='label'
                     className={cx({
                        'ui-progress-label': true,
                        [this.props.labelAttrs.className]: !!this.props.labelAttrs.className
                     })}>
                    {this.props.label}
                </div>
            );
        }
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <UIButton attrs={this.props.cancelAttrs}
                          ref='cancel'
                          className={cx({
                              'ui-progress-cancel': true,
                              [this.props.cancelAttrs.className]: !!this.props.cancelAttrs.className
                          })}
                          onClick={this.props.onCancel} />
            );
        }
    }

    renderProgress() {
        return (
            <div {...this.props.progressAttrs}
                 ref='progress'
                 className={cx({
                    'ui-progress': true,
                    'ui-progress-indeterminate': typeof this.props.progress === 'undefined',
                    [this.props.progressAttrs.className]: !!this.props.progressAttrs.className
                 })}
                 role='presentation'
                 style={{
                     ...this.props.progressAttrs.style,
                     [this.props.tweenProperty]: this.props.progress
                 }} />
        );
    }

    render() {
        return (
            <div {...this.props.attrs}
                 ref='wrapper'
                 className={cx({
                    'ui-progress-wrapper': true,
                    [this.props.className]: !!this.props.className,
                    [this.props.attrs.className]: !!this.props.attrs.className
                 })}
                 id={this.props.id || this.props.attrs.id}
                 style={{...this.props.style, ...this.props.attrs.style}}>
                {this.renderProgress()}
                {this.renderLabel()}
                {this.renderCancel()}
            </div>
        );
    }
}

UIProgress.defaultProps = {
    attrs: {},
    cancelAttrs: {},
    labelAttrs: {},
    progressAttrs: {},
    tweenProperty: 'width'
};

UIProgress.propTypes = {
    attrs: React.PropTypes.object,
    cancelAttrs: React.PropTypes.object,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    label: React.PropTypes.node,
    labelAttrs: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    progressAttrs: React.PropTypes.object,
    tweenProperty: React.PropTypes.string,
    style: React.PropTypes.object
};

export default UIProgress;
