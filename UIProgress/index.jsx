import UIButton from '../UIButton';
import UIView from '../UIView';
import React from 'react';

class UIProgress extends UIView {
    getCancelClasses() {
        return ['ui-progress-cancel'].concat(this.props.cancelAttributes.className || []).join(' ');
    }

    getLabelClasses() {
        return ['ui-progress-label'].concat(this.props.labelAttributes.className || []).join(' ');
    }

    getProgressClasses() {
        return ['ui-progress'].concat(this.props.className || []).join(' ');
    }

    getWrapperClasses() {
        return ['ui-progress-wrapper'].concat(this.props.wrapperAttributes.className || []).join(' ');
    }

    render() {
        return (
            <div {...this.props.wrapperAttributes}
                 className={this.getWrapperClasses()}>
                <div {...this.props}
                     ref='progress'
                     className={this.getProgressClasses()}
                     label={null}
                     role='presentation'
                     style={{[this.props.tweenProperty]: this.props.progress}} />

                {this.renderLabel()}
                {this.renderCancel()}
            </div>
        );
    }

    renderCancel() {
        if (this.props.onCancel) {
            return (
                <UIButton {...this.props.cancelAttributes}
                          ref='cancel'
                          className={this.getCancelClasses()}
                          onClick={this.props.onCancel} />
            );
        }
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <div {...this.props.labelAttributes}
                     ref='label'
                     className={this.getLabelClasses()}>
                    {this.props.label}
                </div>
            );
        }
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
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    label: React.PropTypes.node,
    labelAttributes: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    tweenProperty: React.PropTypes.string,
    wrapperAttributes: React.PropTypes.object
};

export default UIProgress;
