import React from 'react';
import {findDOMNode} from 'react-dom';
import {get} from 'lodash';

/**
 * A testing module to verify that arbitrary React-supported attributes are passed
 * through the destination element node. The conformance checker uses the following
 * valid JSX attributes as examples:
 *
 * - className
 * - id
 * - style
 * - data-foo
 * - aria-label
 *
 * Each must be able to be mixed and matched without overwriting each other,
 * with the exception of `id`, where `props.id`
 *
 * @param {function}  render        a pre-build render function to take in vdom and render to a designated place
 * @param {function}  Constructor   a valid ReactClass
 * @param {object}    baseProps     any fundamental props that are needed for the component to be rendered successfully
 * @param {string}   [key] an instance key to check for compliance instead of the base element; this is
 *                                  used for React components that render to <body> or a node other than its logical parent
 */
export default function verifyConformance(render, Constructor, baseProps, key) {
    let node;

    const renderWithPropsAndGetNode = (props) => {
        const element = render(
            React.createElement(
                Constructor, {
                    ...baseProps,
                    ...props,
                }
            )
        );

        if (key) {
            return   get(element, key) instanceof HTMLElement
                   ? get(element, key)
                   : findDOMNode(get(element, key));
        }

        return findDOMNode(element);
    };

    /* verify props.className */
    node = renderWithPropsAndGetNode({className: 'foo'});

    expect(node.classList.contains('foo')).toBe(true,
        `${Constructor.name} does not support adding of classes via props.className`
    );

    /* verify props.id */
    node = renderWithPropsAndGetNode({id: 'foo'});

    expect(node.id === 'foo').toBe(true,
        `${Constructor.name} does not support adding of an HTML id via props.id`
    );

    /* verify props.style */
    node = renderWithPropsAndGetNode({style: {color: 'red'}});

    expect(node.style.color === 'red').toBe(true,
        `${Constructor.name} does not support adding inline styles via props.style`
    );

    /* verify props['data-foo'] */
    node = renderWithPropsAndGetNode({'data-foo': 'bar'});

    expect(node.getAttribute('data-foo') === 'bar').toBe(true,
        `${Constructor.name} does not support adding data attributes via props`
    );

    /* verify props['aria-label'] */
    node = renderWithPropsAndGetNode({'aria-label': 'foo'});

    expect(node.getAttribute('aria-label') === 'foo').toBe(true,
        `${Constructor.name} does not support adding aria attributes via props`
    );
}
