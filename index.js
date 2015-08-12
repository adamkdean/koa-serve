'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    send = require('koa-send');

module.exports = exports = function (directories, root) {
    if (!_.isArray(directories)) directories = [directories];
    root = root || __dirname;

    return function *(next) {
        var path = this.path,
            isAsset, fd;

        isAsset = _.any(directories, function (dir) {
            return _.startsWith(path, '/' + dir);
        });

        try
        {
            path = (isAsset && !fs.lstatSync(root + this.path).isDirectory())
                ? root + this.path
                : root + this.path + 'index.html';

            fd = fs.openSync(path, 'r');
            yield send(this, path);
            fs.close(fd);
        }
        catch (e)
        {
            yield next;
        }
    }
};
