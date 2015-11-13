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
        'chai-sinon',
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
        debug: true,
        transform: ['babelify']
    },

    reportSlowerThan: 10
};
