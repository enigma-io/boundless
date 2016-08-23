import React from 'react';
import UIButton from '../../UIButton';
import UIProgress from '../index';
import {each} from 'lodash';
import transformProp from '../../UIUtils/transformProperty';

export default class UIProgressDemo extends React.PureComponent {
    state = {
        barProgress: 0,
        meterProgress: 0,
    }

    componentDidMount() {
        each(this.refs, (value, key) => this.updateProgress(key));
    }

    componentWillUnmount() {
        window.clearTimeout(this.barTimerHandle);
        window.clearTimeout(this.meterTimerHandle);
    }

    updateProgress(type) {
        if (this.state[`${type}Progress`] < 100) {
            this[`${type}TimerHandle`] = window.setTimeout(() => {
                this.setState({ [`${type}Progress`]: this.state[`${type}Progress`] + 1 }, () => {
                    this.updateProgress(type);
                });
            }, 35);
        }
    }

    resetProgress(type) {
        window.clearTimeout(this[`${type}TimerHandle`]);

        this.setState({ [`${type}Progress`]: 0 }, () => { this.updateProgress(type); });
    }

    render() {
        return (
            <div className='progress-demo ui-spread-even ui-align-end'>
                <figure>
                    <h5>Horizontal Progress Bar</h5>
                    <UIProgress
                        ref='bar'
                        aria-label={`${this.state.barProgress}% complete`}
                        label={`${this.state.barProgress}%`}
                        progress={`${this.state.barProgress}%`} />
                    <UIButton
                        onPressed={this.resetProgress.bind(this, 'bar')}
                        style={{marginTop: '1rem'}}>
                        Reset
                    </UIButton>
                </figure>
                <figure>
                    <h5>Filling Progress Meter</h5>
                    <UIProgress
                        ref='meter'
                        id='progress-meter'
                        aria-label={`${this.state.meterProgress}% complete`}
                        label={`${this.state.meterProgress}%`}
                        progress={`${this.state.meterProgress}%`}
                        tweenProperty='height' />
                    <UIButton
                        onPressed={this.resetProgress.bind(this, 'meter')}
                        style={{marginTop: '1rem'}}>
                        Reset
                    </UIButton>
                </figure>
                <figure>
                    <h5>Indeterminate Progress Bar</h5>
                    <UIProgress
                        ref='indeterminate'
                        aria-label={`Processing...`} />
                </figure>
            </div>
        );
    }
}
