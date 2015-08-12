'use strict';

var _ = require('lodash');

module.exports = exports = function (directories, rootDir) {
    if (!_.isArray(directories)) directories = [directories];
    rootDir = rootDir || __dirname;

    return function *(next) {
        var isAsset = _.any(directories, function (dir) {
            return _.startsWith(this.path, '/' + dir);
        });

        if (isAsset) {
            try
            {
                var fd = fs.openSync(config.path + this.path, 'r');
                yield send(this, rootDir + this.path);
                fs.close(fd);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
};
