'use strict';

var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    send = require('koa-send');

module.exports = exports = function (directories, root) {
    if (!_.isArray(directories)) directories = [directories];
    root = path.normalize(root) || path.join(__dirname, '..', '..');

    return function *(next) {
        var reqPath = this.path,
            filePath, isAsset, fd;

        isAsset = _.any(directories, function (dir) {
            return _.startsWith(reqPath, '/' + dir);
        });

        try
        {
            filePath = (isAsset && !fs.lstatSync(root + this.path).isDirectory())
                ? root + this.path
                : root + this.path + 'index.html';

            fd = fs.openSync(filePath, 'r');
            yield send(this, filePath);
            fs.close(fd);
        }
        catch (e)
        {
            if (isAsset) {
                this.body = 'Not Found';
                this.status = 404;
            } else {
                yield next;
            }
        }
    }
};
