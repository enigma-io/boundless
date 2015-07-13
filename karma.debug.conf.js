var _ = require('lodash');
var karmaConfig = require('./karma.base.conf');

module.exports = function(config) {
    var options = _.merge({}, karmaConfig);

    options.autoWatch = true;
    options.browsers = ['Chrome'];
    options.singleRun = false;

    config.set(options);
};
