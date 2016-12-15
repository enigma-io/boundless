import React from 'react';
import Button from '../../boundless-button/index';
import Progress from '../index';
import {each} from 'lodash';

export default class ProgressDemo extends React.PureComponent {
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
            <div className='progress-demo spread align-end'>
                <figure>
                    <h5>Horizontal Progress Bar</h5>
                    <Progress
                        ref='bar'
                        aria-label={`${this.state.barProgress}% complete`}
                        label={`${this.state.barProgress}%`}
                        progress={`${this.state.barProgress}%`} />
                    <Button
                        onPressed={this.resetProgress.bind(this, 'bar')}
                        style={{marginTop: '1rem'}}>
                        Reset
                    </Button>
                </figure>
                <figure>
                    <h5>Filling Progress Meter</h5>
                    <Progress
                        ref='meter'
                        id='progress-meter'
                        aria-label={`${this.state.meterProgress}% complete`}
                        label={`${this.state.meterProgress}%`}
                        progress={`${this.state.meterProgress}%`}
                        tweenProperty='height' />
                    <Button
                        onPressed={this.resetProgress.bind(this, 'meter')}
                        style={{marginTop: '1rem'}}>
                        Reset
                    </Button>
                </figure>
                <figure>
                    <h5>Indeterminate Progress Bar</h5>
                    <Progress
                        ref='indeterminate'
                        aria-label={'Processing...'} />
                </figure>
            </div>
        );
    }
}
