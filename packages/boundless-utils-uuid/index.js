/**
 * Generates a unique ID. Adds a prefix so it is suitable for use as an HTML ID.
 * Based on {@link https://gist.github.com/jed/982883 this implementation}.
 *
 * @return {string} a unique identifier
 *
 * @example
 * uuid(); // b-1f2cd27f-0754-4344-9d20-436a201b2f80
 */
export default function uuid() {
    /* eslint-disable */
    return 'b-' + ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16));
    /* eslint-enable */
}
