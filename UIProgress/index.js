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

    render() {
        return (
            <div {...this.props.wrapperAttrs}
                 ref='wrapper'
                 className={cx({
                    'ui-progress-wrapper': true,
                    [this.props.wrapperAttrs.className]: !!this.props.wrapperAttrs.className
                 })}>
                <div {...this.props.attrs}
                     ref='progress'
                     className={cx({
                        'ui-progress': true,
                        'ui-progress-indeterminate': typeof this.props.progress === 'undefined',
                        [this.props.className]: !!this.props.className,
                        [this.props.attrs.className]: !!this.props.attrs.className
                     })}
                     label={null}
                     role='presentation'
                     style={{[this.props.tweenProperty]: this.props.progress}} />

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
    tweenProperty: 'width',
    wrapperAttrs: {}
};

UIProgress.propTypes = {
    attrs: React.PropTypes.object,
    cancelAttrs: React.PropTypes.object,
    className: React.PropTypes.string,
    label: React.PropTypes.node,
    labelAttrs: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    tweenProperty: React.PropTypes.string,
    wrapperAttrs: React.PropTypes.object
};

export default UIProgress;
