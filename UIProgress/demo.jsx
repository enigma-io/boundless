import UIButton from '../UIButton';
import UIProgress from './index';
import UIView from '../UIView';
import React from 'react';

export default class UIProgressDemo extends UIView {
    initialState() {
        return {
            progress: 0,
            timerHandle: null
        };
    }

    componentDidMount() {
        this.updateProgress();
    }

    render() {
        return (
            <div>
                <UIProgress progress={this.state.progress} showProgressLabel={true} />
                <br />
                <UIButton onClick={this.resetProgress.bind(this)}>Reset</UIButton>
            </div>
        );
    }

    updateProgress() {
        if (this.state.progress < 100) {
            this.timerHandle = window.setTimeout(() => {
                this.setState({ progress: this.state.progress + 5 }, () => {
                    this.updateProgress();
                });
            }, 250);
        }
    }

    resetProgress() {
        window.clearTimeout(this.timerHandle);

        this.setState({ progress: 0 }, () => {
            this.updateProgress();
        });
    }
}
