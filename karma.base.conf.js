module.exports = {
    browsers: ['PhantomJS2'],

    coverageReporter: {
        type: 'html',
        dir: 'artifacts/coverage'
    },

    files: [
        './!(build|docs|artifacts|node_modules)/unit.js'
    ],

    frameworks: [
        'browserify',
        'sinon-chai',
        'mocha',
        'source-map-support'
    ],

    preprocessors: {
        './!(build|docs|artifacts|node_modules)/{index,unit}.js': ['browserify']
    },

    reporters: ['mocha'],
    singleRun: true,

    phantomjsLauncher: {
        exitOnResourceError: true
    },

    browserify: {
        debug: true
    }
};
