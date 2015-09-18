const ncu = require('npm-check-updates')
const through = require('through2')
const path = require('path')
const fs = require('fs')

module.exports = polyrepoUpdate

// Bulk update packages
// obj -> null
function polyrepoUpdate (argv) {
  return through({ objectMode: true }, iterator)

  function iterator (dir, enc, done) {
    const route = path.join(dir, 'package.json')

    // check if file exists
    fs.stat(route, function (err, res) {
      if (err || !res) return done()

      // check if packages are up to date
      const opts = { packageFile: route }
      ncu.run(opts).then(function (res) {
        process.nextTick(function () {
          done(null, { dir: dir, deps: res })
        })
      }).catch(done)
    })
  }
}
