#!/usr/bin/env node
const cliclopts = require('cliclopts')
const minimist = require('minimist')
const readdirp = require('readdirp')
const through = require('through2')
const table = require('text-table')
const json = require('JSONStream')
const split = require('split2')
const fs = require('fs')

const pkg = require('../package.json')
const main = require('../')

const isTty = !!process.stdin.isTTY

const opts = cliclopts([
  {
    name: 'help',
    abbr: 'h',
    boolean: true
  },
  {
    name: 'version',
    abbr: 'v',
    boolean: true
  }
])

const argv = minimist(process.argv.slice(2), opts.options())

// parse options
if (argv.version) {
  const version = require('../package.json').version
  process.stdout.write('v' + version)
  process.exit(0)
} else if (argv.help) {
  process.stdout.write(pkg.name + ' - ' + pkg.description + '\n')
  usage(0)
} else if (!isTty) {
  process.stdin
    .pipe(split())
    .pipe(main(argv))
    .pipe(fmt())
    .pipe(process.stdout)
} else {
  readdirp({ entryType: 'directories', root: process.cwd(), depth: 1 })
    .pipe(json.parse('fullPath'))
    .pipe(main(argv))
    .pipe(fmt())
    .pipe(process.stdout)
}

// print usage & exit
// num? -> null
function usage (exitCode) {
  fs.createReadStream(__dirname + '/usage.txt')
    .pipe(process.stdout)
    .on('close', process.exit.bind(null, exitCode))
}

// pretty-print `main` output
// null -> writeStream
function fmt () {
  return through({ objectMode: true }, iterator)

  function iterator (chunk, enc, cb) {
    const dir = chunk.dir.split('/').pop()
    const keys = Object.keys(chunk.deps)

    const vals = keys.map(function (key) {
      const deps = chunk.deps[key]
      if (!deps) return []
      return [key, chunk.deps[key]]
    })

    if (!vals.length) return cb()
    cb(null, dir + ':\n' + table(vals) + '\n\n')
  }
}
