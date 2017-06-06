import { createElement, PureComponent } from 'react';
import ProgressiveDisclosure from '../';

export default class ProgressiveDisclosureDemo extends PureComponent {
    render() {
        return (
            <ProgressiveDisclosure
                toggleContent='Click me to learn the truth...'
                toggleExpandedContent='Click me to hide the truth once again...'>
                And now, all is revealed.
            </ProgressiveDisclosure>
        );
    }
}
