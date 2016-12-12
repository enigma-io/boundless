import React from 'react';
import Button from '../../boundless-button/index';
import Image from '../index';

export default class ImageDemo extends React.PureComponent {
    state = {
        normal: Date.now(),
        delayed: Date.now(),
        error: Date.now(),
    }

    remountImage(refName) {
        this.setState({[refName]: Date.now()});
    }

    render() {
        return (
            <div className='ui-spread-even ui-center'>
                <figure>
                    <h5>Normal</h5>
                    <Image ref='normal'
                             src={`https://c2.staticflickr.com/6/5128/5288605976_9b06c0de8f_b.jpg?${this.state.normal}`}
                             alt='A snowy drive.'
                             displayAsBackgroundImage={true} />
                    <Button onPressed={this.remountImage.bind(this, 'normal')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </Button>
                </figure>

                <figure>
                    <h5>Delayed</h5>
                    <Image ref='delayed'
                             src={`http://deelay.me/5000/http://igcdn-photos-g-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/11244434_646274218842534_532892887_n.jpg?${this.state.delayed}`}
                             alt='A beachscape.'
                             displayAsBackgroundImage={true} />
                    <Button onPressed={this.remountImage.bind(this, 'delayed')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </Button>
                </figure>

                <figure>
                    <h5>Errored Out</h5>
                    <Image ref='error'
                             src={`http://www.flickr.com/1o2k3ok1231?${this.state.error}`}
                             alt='A dead image.'
                             displayAsBackgroundImage={true} />
                    <Button onPressed={this.remountImage.bind(this, 'error')}
                              style={{marginTop: '1rem'}}>
                        Remount Image
                    </Button>
                </figure>
            </div>
        );
    }
}
