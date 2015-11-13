import React from 'react';
import ReactDOM from 'react-dom';

/**
 * A testing module to verify that a React element conforms to following prop interface:
 *
 * - attrs
 *   - attrs.className
 *   - attrs.id
 *   - attrs.style
 * - className
 * - id
 * - style
 *
 * Each must be able to be mixed and matched without overwriting each other, with the exception of `id`, where `props.id`
 * takes precedence over `props.attrs.id`
 *
 * Assumes the global presence of `assert`.
 *
 * @param  {function}  render       a pre-build render function to take in vdom and render to a designated place
 * @param  {function}  Constructor  a valid ReactClass
 * @param  {object}    baseProps    any fundamental props that are needed for the component to be rendered successfully
 * @param  {string}   [ref]         a specific ref identifier to check for compliance instead of the base element; this is
 *                                  used for React components that render to <body> or a node other than its logical parent
 */
export default function verifyConformance(render, Constructor, baseProps, ref) {
    let node;

    const renderWithPropsAndGetNode = props => {
        const element = render(
            React.createElement(
                Constructor, {
                    ...baseProps,
                    ...props
                }
            )
        );

        if (ref) {
            return   element.refs[ref] instanceof HTMLElement
                   ? element.refs[ref]
                   : ReactDOM.findDOMNode(element.refs[ref]);
        }

        return React.findDOMNode(element);
    };


    /* verify props.attrs */
    node = renderWithPropsAndGetNode({attrs: {'data-foo': 'bar'}});

    assert(
        node.getAttribute('data-foo') === 'bar',
        `${Constructor.name} does not support adding of arbitrary attributes via props.attrs`
    );


    /* verify props.className */
    node = renderWithPropsAndGetNode({className: 'foo'});

    assert(node.classList.contains('foo'), `${Constructor.name} does not support adding of classes via props.className`);


    /* verify props.attrs.className */
    node = renderWithPropsAndGetNode({attrs: {className: 'foo'}});

    assert(node.classList.contains('foo'), `${Constructor.name} does not support adding of classes via props.attrs.className`);


    /* verify props.className */
    node = renderWithPropsAndGetNode({
        className: 'foo',
        attrs: {className: 'bar'}
    });

    assert(
        node.classList.contains('foo') && node.classList.contains('bar'),
        `${Constructor.name} does not support adding of classes via props.className AND props.attrs.className`
    );


    /* verify props.id */
    node = renderWithPropsAndGetNode({id: 'foo'});

    assert(node.id === 'foo', `${Constructor.name} does not support adding of an HTML id via props.id`);


    /* verify props.attrs.id */
    node = renderWithPropsAndGetNode({attrs: {id: 'foo'}});

    assert(node.id === 'foo', `${Constructor.name} does not support adding of an HTML id via props.attrs.id`);


    /* verify props.attrs.id does not overwrite props.id */
    node = renderWithPropsAndGetNode({
        id: 'foo',
        attrs: {id: 'bar'}
    });

    assert(node.id === 'foo', `${Constructor.name} should honor props.id over props.attrs.id`);


    /* verify props.style */
    node = renderWithPropsAndGetNode({style: {color: 'red'}});

    assert(node.style.color === 'red', `${Constructor.name} does not support adding inline styles via props.style`);


    /* verify props.attrs.style */
    node = renderWithPropsAndGetNode({attrs: {style: {color: 'red'}}});

    assert(node.style.color === 'red', `${Constructor.name} does not support adding inline styles via props.attrs.style`);


    /* verify combo props.style AND props.attrs.style */
    node = renderWithPropsAndGetNode({
        style: {position: 'absolute'},
        attrs: {
            style: {color: 'red'}
        }
    });

    assert(
        node.style.color === 'red' && node.style.position === 'absolute',
        `${Constructor.name} does not support adding inline styles via both props.style AND props.attrs.style`
    );
};
