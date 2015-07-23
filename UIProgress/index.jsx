import UIButton from '../UIButton';
import UIView from '../UIView';
import React from 'react';

class UIProgress extends UIView {
    getClassNames() {
        return ['ui-progress-wrapper'].concat(this.props.className).join(' ');
    }

    render() {
        return (
            <div className={this.getClassNames()}>
                <div ref='progress'
                     className='ui-progress'
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
                <UIButton ref='cancel'
                          className='ui-progress-cancel'
                          onClick={this.props.onCancel} />
            );
        }
    }

    renderLabel() {
        if (this.props.label) {
            return (
                <div ref='label' className='ui-progress-label'>
                    {this.props.label}
                </div>
            );
        }
    }
}

UIProgress.defaultProps = {
    tweenProperty: 'width'
};

UIProgress.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    label: React.PropTypes.node,
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    tweenProperty: React.PropTypes.string
};

export default UIProgress;
