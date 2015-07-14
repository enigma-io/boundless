module.exports = {
    browsers: ['PhantomJS'],

    coverageReporter: {
        type: 'html',
        dir: 'artifacts/coverage'
    },

    files: [
        './!(build|docs|artifacts)/unit.{js,jsx}'
    ],

    frameworks: [
        'browserify',
        'sinon-chai',
        'mocha',
        'source-map-support'
    ],

    preprocessors: {
        './!(build|docs|artifacts)/unit.{js,jsx}': ['browserify'],
        './!(build|docs|artifacts)/index.{js,jsx}': ['browserify']
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
