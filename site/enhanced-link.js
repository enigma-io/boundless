import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import pascalCase from './pascal-case';

/**
 * Attempts to resolve various forms of links to internal resources into appropriate
 * react-router <Link /> tags.
 */
const EnhancedLink = ({children, href, ...props}) => {
    if (href.indexOf('boundless-') !== -1) {
        const frags = href.split('/');
        const component = pascalCase(frags[frags.length - 2].replace('boundless-', ''));

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
        <a {...props} href={href} target='_blank' rel='noopener'>{children}</a>
    );
};

EnhancedLink.propTypes = {
    children: PropTypes.any,
    href: PropTypes.string,
};

export default EnhancedLink;
