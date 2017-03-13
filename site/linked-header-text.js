import {createElement, PropTypes} from 'react';
import {kebabCase} from 'lodash';

const LinkedHeaderText = ({component = 'h1', children, ...props}) => {
    const normalizedId = kebabCase(children);

    return createElement(component, {...props, id: normalizedId}, [
        children,
        (<a key='link' href={`#${normalizedId}`}>#</a>),
    ]);
};

LinkedHeaderText.propTypes = {
    children: PropTypes.any,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
    ]),
};

export default LinkedHeaderText;
