# polyrepo-update [![experimental](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index)
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Bulk update packages. Currently only lists which packages are out of date.

## Installation
```sh
$ npm install polyrepo-update
```

## Usage
From the CLI:
```txt
Usage: polyrepo-update [options]

Options:
  -h, --help        Output usage information
  -v, --version     Output version number

Examples:
  $ polyrepo-update          # update repos in current dir
  $ ls . | polyrepo-update   # update a list of repos

Docs: https://github.com/polyrepo/polyrepo-update
Bugs: https://github.com/polyrepo/polyrepo-update/issues
```

From Node:
```js
const update = require('polyrepo-update')
const json = require('JSONStream')

// takes a list of directories
process.stdin
  .pipe(update())
  .pipe(json.stringify())
  .pipe(process.stdout)
```

## API
### transformStream = polyrepoUpdate()
Take a list of directories and check if the dependencies in its `package.json`
are up to date. Outputs an object, make sure to stringify it before passing it
to `process.stdout`.

## Contributors
- [Yoshua Wuyts](https://github.com/yoshuawuyts)
- [Hugh Kennedy](https://github.com/hughsk)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/polyrepo-update.svg?style=flat-square
[npm-url]: https://npmjs.org/package/polyrepo-update
[travis-image]: https://img.shields.io/travis/polyrepo/polyrepo-update/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/polyrepo/polyrepo-update
[codecov-image]: https://img.shields.io/codecov/c/github/polyrepo/polyrepo-update/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/polyrepo/polyrepo-update
[downloads-image]: http://img.shields.io/npm/dm/polyrepo-update.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/polyrepo-update
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
