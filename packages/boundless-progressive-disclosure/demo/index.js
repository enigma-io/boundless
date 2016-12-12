import React from 'react';
import ProgressiveDisclosure from '../index';

export default class ProgressiveDisclosureDemo extends React.PureComponent {
    render() {
        return (
            <ProgressiveDisclosure
                teaser='Click me to learn the truth...'
                teaserExpanded='Click me to hide the truth once again...'>
                And now, all is revealed.
            </ProgressiveDisclosure>
        );
    }
}
