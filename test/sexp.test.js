/* eslint-env jest */

const {
  SXPNumber, isNumber, SXPString, isString
} = require('../src/sexp')

test('The value of one is 1', () => {
  const one = new SXPNumber(1)
  expect(one.val).toBe(1)
})

test('One is a number', () => {
  const one = new SXPNumber(1)
  expect(isNumber(one)).toBe(true)
})

test('"aaa" is not a number', () => {
  const aaa = new SXPString('aaa')
  expect(isNumber(aaa)).toBe(false)
})

test('"aaa" is a string', () => {
  const aaa = new SXPString('aaa')
  expect(isString(aaa)).toBe(true)
})

test('One is not a string', () => {
  const one = new SXPNumber(1)
  expect(isString(one)).toBe(false)
})
