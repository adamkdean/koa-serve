'use strict';

var _ = require('lodash');

module.exports = exports = function (directories, root) {
    if (!_.isArray(directories)) directories = [directories];
    root = root || __dirname;

    return function *(next) {
        var isAsset = _.any(directories, function (dir) {
            return _.startsWith(this.path, '/' + dir);
        });

        if (isAsset) {
            try
            {
                var fd = fs.openSync(root + this.path, 'r');
                yield send(this, root + this.path);
                fs.close(fd);
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
};
