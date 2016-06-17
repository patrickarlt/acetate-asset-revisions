var fs = require('fs');
var path = require('path');
var url = require('url');
var _ = require('lodash');

module.exports = function (manifest, {
  transformKey = function (key) {return key;},
  transformValue = function (value) {return value;}
} = {}) {
  let assets = {};

  function getAttributes (attrs) {
    return _.trim(_.reduce(attrs, function (attributes, value, key) {
      return attributes += ` ${key}="${value}"`;
    }, ''));
  }

  function getUrl (context, src) {
    return url.resolve(context.page.relativePath, assets[src] || src);
  }

  return function (acetate) {
    acetate.transformAllAsync(function (pages, callback) {
      fs.readFile(path.join(acetate.root, manifest), 'utf8', function (error, manifest) {
        if (manifest) {
          assets = _.transform(JSON.parse(manifest), function (result, value, key) {
            key = transformKey(key);
            value = transformValue(value);
            result[key] = value;
          }, {});
        }

        callback(null, pages);
      });
    });

    acetate.helper('css', function (context, href) {
      return `<link href="${getUrl(context, href)}"${getAttributes(context.options)}/>`;
    }, {
      rel: 'stylesheet',
      type: 'text/css'
    });

    acetate.helper('js', function (context, src) {
      return `<script src="${getUrl(context, src)}"${getAttributes(context.options)}></script>`;
    });

    acetate.helper('img', function (context, src) {
      return `<img src="${getUrl(context, src)}"${getAttributes(context.options)}/>`;
    });
  };
};
