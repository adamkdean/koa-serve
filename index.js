'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    send = require('koa-send'),
    debug = require('debug')('koa-serve');

module.exports = exports = function (directories, root) {
    if (!_.isArray(directories)) directories = [directories];
    root = root || path.join(__dirname, '..', '..');
    root = path.normalize(root);

    return function *(next) {
        var reqPath = this.path,
            filePath, isAsset, fd;

        isAsset = _.any(directories, function (dir) {
            return _.startsWith(reqPath, '/' + dir);
        });

        debug('requesting', reqPath);
        this.path = root + this.path;
        try
        {
            filePath = (isAsset && !fs.lstatSync(this.path).isDirectory())
                ? this.path
                : this.path + 'index.html';

            yield send(this, filePath);
        }
        catch (e)
        {
            debug(e);
            if (isAsset) {
                this.body = 'Not Found';
                this.status = 404;
            } else {
                yield next;
            }
        }
    }
};
