/* eslint-env jest */

const { makeValue } = require('../src/sexp')
const { evl } = require('../src/evl')

test('1 is evaluated to 1', () => {
  expect(evl(makeValue(1))).toEqual(makeValue(1))
})
