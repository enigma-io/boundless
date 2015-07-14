import UIImage from './index.jsx';
import UIView from '../UIView';
import React from 'react';

export default class UIImageDemo extends UIView {
    render() {
        return (
            <div>
                <UIImage
                        src='http://i.imgur.com/BymoMze.jpg'
                        alt='A Corgi wielding Google Glass.'
                        displayAsBackgroundImage={true} />

                <UIImage
                        src='http://deelay.me/5000/http://i.imgur.com/BymoMze.jpg'
                        alt='A Corgi wielding Google Glass.'
                        displayAsBackgroundImage={true} />

                <UIImage
                        src='hxxp://i.imgur.com/BymoMze.jpg'
                        alt='A Corgi wielding Google Glass.'
                        displayAsBackgroundImage={true} />
            </div>
        );
    }
}
