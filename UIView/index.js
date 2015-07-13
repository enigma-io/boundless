/**
 * Helpful abstractions for ES6 React classes.
 *
 * @class UIView
 * @author Evan Jacobs <evan.jacobs@enigma.io>
 */

import React from 'react';

class UIView extends React.Component {
    constructor(...args) {
        super(...args);

        if (this.initialState) {
            this.state = this.initialState();
        }
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
     * @return {string} a unique identifier
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
