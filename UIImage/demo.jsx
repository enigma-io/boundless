import UIButton from '../UIButton'
import UIImage from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UIImageDemo extends UIView {
    initialState() {
        return {
            normal: Date.now(),
            delayed: Date.now(),
            error: Date.now()
        };
    }

    render() {
        return (
            <div className='ui-spread-even ui-center'>
                <figure>
                    <h5>Normal</h5>
                    <UIImage ref='normal'
                             src={'http://c2.staticflickr.com/8/7431/13303401343_9615ab1232_b.jpg?' + this.state.normal}
                             alt='Sunlight on leaves.'
                             displayAsBackgroundImage={true} />
                    <UIButton onClick={this.remountImage.bind(this, 'normal')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </UIButton>
                </figure>

                <figure>
                    <h5>Delayed</h5>
                    <UIImage ref='delayed'
                             src={'http://deelay.me/5000/http://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11312420_351613388382392_2098228766_n.jpg?' + this.state.delayed}
                             alt='A beachscape.'
                             displayAsBackgroundImage={true} />
                    <UIButton onClick={this.remountImage.bind(this, 'delayed')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </UIButton>
                </figure>

                <figure>
                    <h5>Errored Out</h5>
                    <UIImage ref='error'
                             src={'http://www.flickr.com/1o2k3ok1231?' + this.state.error}
                             alt='A dead image.'
                             displayAsBackgroundImage={true} />
                    <UIButton onClick={this.remountImage.bind(this, 'error')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </UIButton>
                </figure>
            </div>
        );
    }

    remountImage(refName) {
        this.setState({ [refName]: Date.now() });
    }
}
