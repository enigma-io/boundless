module.exports = {
    browsers: ['PhantomJS'],

    coverageReporter: {
        type: 'html',
        dir: 'artifacts/coverage'
    },

    files: [
        './!(build|docs|artifacts|node_modules)/unit.{js,jsx}'
    ],

    frameworks: [
        'browserify',
        'sinon-chai',
        'mocha',
        'source-map-support'
    ],

    preprocessors: {
        './!(build|docs|artifacts|node_modules)/{index,unit}.{js,jsx}': ['browserify']
    },

    reporters: ['mocha'],
    singleRun: true,

    phantomjsLauncher: {
        exitOnResourceError: true
    },

    browserify: {
        debug: true,
        extensions: ['.jsx']
    }
};
