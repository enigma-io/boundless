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
                <div {...this.props.labelAttributes}
                     ref='label'
                     className={cx({
                        'ui-progress-label': true,
                        [this.props.labelAttributes.className]: !!this.props.labelAttributes.className
                     })}>
                    {this.props.label}
                </div>
            );
        }
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <UIButton {...this.props.cancelAttributes}
                          ref='cancel'
                          className={cx({
                              'ui-progress-cancel': true,
                              [this.props.cancelAttributes.className]: !!this.props.cancelAttributes.className
                          })}
                          onClick={this.props.onCancel} />
            );
        }
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={cx({
                    'ui-progress-wrapper': true,
                    [this.props.wrapperAttributes.className]: !!this.props.wrapperAttributes.className
                 })}>
                <div {...this.props}
                     ref='progress'
                     className={cx({
                        'ui-progress': true,
                        'ui-progress-indeterminate': typeof this.props.progress === 'undefined',
                        [this.props.className]: !!this.props.className
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
    cancelAttributes: {},
    labelAttributes: {},
    tweenProperty: 'width',
    wrapperAttributes: {}
};

UIProgress.propTypes = {
    cancelAttributes: React.PropTypes.object,
    className: React.PropTypes.string,
    label: React.PropTypes.node,
    labelAttributes: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    tweenProperty: React.PropTypes.string,
    wrapperAttributes: React.PropTypes.object
};

export default UIProgress;
