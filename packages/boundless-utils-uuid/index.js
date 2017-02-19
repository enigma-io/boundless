/**
 * Generates a unique ID, based on [this algorithm](https://gist.github.com/jed/982883). Adds a prefix (`b-`) so it is
 * suitable for use as an HTML ID.
 */
export default function uuid() {
    /* eslint-disable */
    return 'b-' + ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,a=>(a^Math.random()*16>>a/4).toString(16));
    /* eslint-enable */
}
