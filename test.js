const test = require('tape')
const polyrepoUpdate = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(polyrepoUpdate)
})
