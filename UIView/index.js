/**
 * Helpful abstractions for ES6 React classes.
 *
 * @class UIView
 */

import React from 'react';
import {isEqual} from 'lodash';

class UIView extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = this.initialState ? this.initialState() : {};
    }

    /**
     * In any type of list, unique keys are required to keep React re-renders efficient. This
     * method consumes a list item's content and returns an appropriate key to be used.
     * @public
     *
     * @param  {string} The content to be hashed into a consistent key.
     * @return {string} The built, unique hash.
     */
    createHashedKey(s) {
        // from http://stackoverflow.com/a/15710692
        return s.split('').reduce(function hasher(a, b) {
            let c = ((a << 5) - a) + b.charCodeAt(0);

            return c & c;
        }, 0);
    }

    /**
     * Approximates the @link{PureRenderMixin https://facebook.github.io/react/docs/pure-render-mixin.html} from ES5 React. Implement shouldComponentUpdate in your subclass to override this functionality.
     * @public
     *
     * @param  {Object} nextProps the incoming props definition, may differ from current props
     * @param  {Object} nextState the incoming state definition, may differ from current state
     * @return {Boolean}          Informs React to re-render the component.
     */
    shouldComponentUpdate(nextProps, nextState) {
        return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
    }

    /**
     * @return {string} a unique identifier, e.g. 1f2cd27f-0754-4344-9d20-436a201b2f80
     * @see {@link https://gist.github.com/jed/982883|GitHub}
     */
    uuid() {
        /* eslint-disable */
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16));
        /* eslint-enable */
    }
}

/**
 * Emulates the (now removed) React interface `getInitialState`. It's a convenience, but allows
 * for this functionality to work without having to provide a constructor function.
 *
 * @virtual
 * @name UIView#initialState
 *
 * @example
 * initialState() {
 *     return {
 *          items: []
 *     }
 * }
 */

export default UIView;
