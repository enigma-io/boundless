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
                     style={{[this.props.progressProperty]: this.props.progress + '%'}} />
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
        if (this.props.showProgressLabel) {
            return (
                <div ref='label' className='ui-progress-label'>
                    {this.props.progress}%
                </div>
            );
        }
    }
}

UIProgress.defaultProps = {
    progress: 0,
    progressProperty: 'width'
};

UIProgress.propTypes = {
    className: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.string),
        React.PropTypes.string
    ]),
    onCancel: React.PropTypes.func,
    progress: React.PropTypes.number,
    progressProperty: React.PropTypes.string,
    showProgressLabel: React.PropTypes.bool
};

export default UIProgress;
