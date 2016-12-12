import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import omit from '../boundless-utils-omit-keys/index';
import uuid from '../boundless-utils-uuid/index';

export const PORTAL_DATA_ATTRIBUTE = 'data-portal-id';

/**
 * A higher-order component for the rendering of components outside the normal React tree.
 * Only accepts a single top-level child; naked text, etc will be wrapped in a <div>.
 */
export default class Portal extends React.Component {
    static propTypes = {
        // single child only - arrays not allowed
        children: React.PropTypes.node.isRequired,
        destination: PropTypes.instanceOf(HTMLElement),
        portalId: PropTypes.string,
    }

    static defaultProps = {
        children: null,
        destination: document.body,
        portalId: null,
    }

    static internalKeys = Object.keys(Portal.defaultProps)

    id = uuid()

    // the <div> that the children are rendered into
    $portal = null

    // the top-level child rendered into the $portal
    $passenger = null;

    componentWillMount() {
        this.$portal = document.createElement('div');
        this.props.destination.appendChild(this.$portal);

        this.renderPortalledContent();
    }

    renderPortalledContent() {
        const child = React.isValidElement(this.props.children) ? this.props.children : (<div>{this.props.children}</div>);

        // update the portal ID link if needed
        this.$portal.id = this.props.portalId || this.id;

        ReactDOM.render(child, this.$portal);
        this.$passenger = this.$portal.children[0];
    }

    componentDidUpdate() { this.renderPortalledContent(); }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.$portal);
        this.props.destination.removeChild(this.$portal);
    }

    render() {
        return (
            <span
                {...omit(this.props, Portal.internalKeys)}
                {...{[PORTAL_DATA_ATTRIBUTE]: this.props.portalId || this.id}} />
        );
    }
}
