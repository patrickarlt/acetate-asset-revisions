# Acetate Asset Revisions

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/acetate-asset-revisions.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/acetate-asset-revisions
[travis-image]: https://img.shields.io/travis/patrickarlt/acetate-asset-revisions.svg?style=flat-square
[travis-url]: https://travis-ci.org/patrickarlt/acetate-asset-revisions

Use versioned assets with Acetate for cache-busting.

## Install

```
npm install acetate-asset-revisions --save-dev
```

## Usage

```js
// in acetate.conf.js
var assetRevisions = require('acetate-asset-revisions')

module.exports = function(acetate){
  acetate.use(assetRevisions({
    manifest: 'build/assets.json'
  }));
};
```

The `manifest` option should be the path to a JSON file that maps orginal source names to versioned assets. Most build systems have a way to accomplish this including [gulp-rev](https://github.com/sindresorhus/gulp-rev#asset-manifest), [grunt-filerev](https://github.com/yeoman/grunt-filerev#summary) and [hashmark](https://github.com/keithamus/hashmark#shell) for command-line users.

You will then have access to serveral helpers to use in your templates:

* `{% css 'path/to/css.css'%}`
* `{% js 'path/to/js.js'%}`
* `{% img 'path/to/img.jpg' 'alt text'%}`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <!-- will lookup css/style.css in your manifest and use the versioned URL -->
    {% css "css/style.css" %}
  </head>
  <body>
    <!-- will lookup js/main.js in your manifest and use the versioned URL -->
    {% js "js/main.js" %}
  </body>
</html>
```

You can pass any additional HTML attributes you want as options.

* `{% css "css/style.css", media="print" %}` - for standard string attributes use a key/value pair
* `{% js "js/main.js", async=true %}` - for boolean attributes pass `true` as a value

## Complete Examples

YOu can look at how to integrate Acetate and asset versioing into a complete build system in these samples:

* Grunt - *Coming soon*
* Gulp - *Coming soon*
* [Command-line/NPM scripts](https://github.com/patrickarlt/acetate-cli-sample)

## Assumptions

This project makes several assumptions about your project structure. Your manifest file must be a simple JSON file that maps original filenames to their versioned file names.

```json
{
  "css/style.css": "css/style-098f6bcd.css",
  "js/main.js": "js/main-273c2cin.js"
}
```

 The path to this manifest file is assumed to be relative to your Acetate build folder.

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE.md)
