import UIButton from '../../UIButton';
import UIImage from '../index';
import UIView from '../../UIView';
import React from 'react';

export default class UIImageDemo extends UIView {
    initialState() {
        const now = Date.now();

        return {
            normal: now,
            delayed: now,
            error: now,
        };
    }

    render() {
        return (
            <div className='ui-spread-even ui-center'>
                <figure>
                    <h5>Normal</h5>
                    <UIImage ref='normal'
                             src={`https://c2.staticflickr.com/6/5128/5288605976_9b06c0de8f_b.jpg?${this.state.normal}`}
                             alt='A snowy drive.'
                             displayAsBackgroundImage={true} />
                    <UIButton onPressed={this.remountImage.bind(this, 'normal')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </UIButton>
                </figure>

                <figure>
                    <h5>Delayed</h5>
                    <UIImage ref='delayed'
                             src={`http://deelay.me/5000/http://igcdn-photos-g-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11244434_646274218842534_532892887_n.jpg?${this.state.delayed}`}
                             alt='A beachscape.'
                             displayAsBackgroundImage={true} />
                    <UIButton onPressed={this.remountImage.bind(this, 'delayed')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </UIButton>
                </figure>

                <figure>
                    <h5>Errored Out</h5>
                    <UIImage ref='error'
                             src={`http://www.flickr.com/1o2k3ok1231?${this.state.error}`}
                             alt='A dead image.'
                             displayAsBackgroundImage={true} />
                    <UIButton onPressed={this.remountImage.bind(this, 'error')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </UIButton>
                </figure>
            </div>
        );
    }

    remountImage(refName) {
        this.setState({[refName]: Date.now()});
    }
}
