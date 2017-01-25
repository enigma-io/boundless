import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import * as _ from 'lodash';

_.mixin({'pascalCase': _.flow(_.camelCase, _.upperFirst)});

/**
 * Attempts to resolve various forms of links to internal resources into appropriate
 * react-router <Link /> tags.
 */
const EnhancedLink = ({children, href, ...props}) => {
    if (href.indexOf('boundless-') !== -1) {
        const frags = href.split('/');
        const component = _.pascalCase(frags[frags.length - 2].replace('boundless-', ''));

        return (
            <Link to={`/${component}`}>{children}</Link>
        );
    } else if (href.indexOf('http') === -1) {
        const [path, hash] = href.split('#');

        return (
            <Link to={{pathname: path, hash: hash ? `#${hash}` : null}}>{children}</Link>
        );
    }

    return (
        <a {...props} href={href} target='_blank'>{children}</a>
    );
};

EnhancedLink.propTypes = {
    children: PropTypes.any,
    href: PropTypes.string,
};

export default EnhancedLink;
