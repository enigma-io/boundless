import UIProgressiveDisclosure from '../index';
import UIView from '../../UIView';
import React from 'react';

export default class UIProgressiveDisclosureDemo extends UIView {
    render() {
        return (
            <UIProgressiveDisclosure teaser='Click Me'>
                And now, all is revealed.
            </UIProgressiveDisclosure>
        );
    }
}
