/* eslint-env jest */

const {
  SXPNumber, isNumber
} = require('../src/sexp')

test('The value of one is 1', () => {
  const one = new SXPNumber(1)
  expect(one.val).toBe(1)
})

test('One is a number', () => {
  const one = new SXPNumber(1)
  expect(isNumber(one)).toBe(true)
})
