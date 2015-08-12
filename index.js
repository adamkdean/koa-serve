'use strict';

var _ = require('lodash');

module.exports = exports = function (directories) {
    if (!_.isArray(directories)) directories = [directories];

    return function *(next) {
        var isAsset = _.any(directories, function (dir) {
            return _.startsWith(this.path, '/' + dir);
        });

        if (isAsset) {
            try
            {
                var fd = fs.openSync(config.path + this.path, 'r');
                yield send(this, config.path + this.path);
                fs.close(fd);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
};
