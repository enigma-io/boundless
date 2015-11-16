module.exports = {
    browsers: ['PhantomJS2'],

    coverageReporter: {
        type: 'html',
        dir: 'artifacts/coverage'
    },

    files: [
        './!(dist|docs|node_modules)/**/unit.js'
    ],

    frameworks: [
        'browserify',
        'chai-sinon',
        'mocha',
        'source-map-support'
    ],

    preprocessors: {
        './!(dist|docs|node_modules)/**/{index,unit}.js': ['browserify']
    },

    reporters: ['mocha'],
    singleRun: true,

    phantomjsLauncher: {
        exitOnResourceError: true
    },

    browserify: {
        transform: ['babelify']
    },

    reportSlowerThan: 10
};
