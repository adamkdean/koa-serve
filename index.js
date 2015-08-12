'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    send = require('koa-send');

module.exports = exports = function (directories, root) {
    if (!_.isArray(directories)) directories = [directories];
    root = root || __dirname;

    return function *(next) {
        var path = this.path;
        var isAsset = _.any(directories, function (dir) {
            console.log(path + ' startsWith /' + dir + '?');
            return _.startsWith(path, '/' + dir);
        });

        console.log('isAsset?', isAsset);
        try
        {
            path = (isAsset && !fs.isDirectory(root + this.path))
                ? root + this.path
                : root + this.path + 'index.html';

            console.log(path);

            var fd = fs.openSync(path, 'r');
            yield send(this, path);
            fs.close(fd);
        }
        catch(e) { console.log(e);/* 404 */ }
    }
};
