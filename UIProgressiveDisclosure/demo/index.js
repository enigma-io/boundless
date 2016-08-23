import React from 'react';
import UIProgressiveDisclosure from '../index';

export default class UIProgressiveDisclosureDemo extends React.PureComponent {
    render() {
        return (
            <UIProgressiveDisclosure
                teaser='Click me to learn the truth...'
                teaserExpanded='Click me to hide the truth once again...'>
                And now, all is revealed.
            </UIProgressiveDisclosure>
        );
    }
}
