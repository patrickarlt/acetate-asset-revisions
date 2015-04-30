var fs = require('fs');
var _ = require('lodash');
var path = require('path');

module.exports = function (options) {
  return function (acetate, callback) {
    fs.readFile(path.join(acetate.root, acetate.dest, options.manifest), function (error, manifest) {
      var assets = {};

      if (!error && manifest) {
        assets = _.transform(JSON.parse(manifest), function (result, value, key) {
          key = key.replace(acetate.dest + '/', '');
          value = value.replace(acetate.dest + '/', '');
          result[key] = value;
        }, {});
      }

      acetate.helper('css', function (context, src) {
        var template = '<link href="{{ relativePath }}{{ src }}" rel="stylesheet" type="text/css" />';

        return acetate.nunjucks.renderString(template, {
          src: assets[src] || src,
          relativePath: context.relativePath
        });
      });

      acetate.helper('js', function (context, src) {
        var template = '<script src="{{ relativePath }}{{ src }}" type="application/javascript"></script>';

        return acetate.nunjucks.renderString(template, {
          src: assets[src] || src,
          relativePath: context.relativePath
        });
      });

      acetate.helper('img', function (context, src, alt) {
        var template = '<img src="{{ relativePath }}{{ src }}" alt="{{ alt }}"/>';

        return acetate.nunjucks.renderString(template, {
          src: assets[src] || src,
          relativePath: context.relativePath
        });
      });

      callback(undefined, acetate);
    });
  };
};
