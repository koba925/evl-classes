/* eslint-env jest */

const {
  SXPNumber, isNumber,
  SXPString, isString,
  SXPBool, isBool,
  valueOf
} = require('../src/sexp')

test('The value of one is 1', () => {
  const one = new SXPNumber(1)
  expect(valueOf(one)).toBe(1)
})

test('One is a number', () => {
  const one = new SXPNumber(1)
  expect(isNumber(one)).toBe(true)
})

test('Aaa is not a number', () => {
  const aaa = new SXPString('aaa')
  expect(isNumber(aaa)).toBe(false)
})

test('The value of aaa is "aaa"', () => {
  const aaa = new SXPString('aaa')
  expect(valueOf(aaa)).toBe('aaa')
})

test('Aaa is a string', () => {
  const aaa = new SXPString('aaa')
  expect(isString(aaa)).toBe(true)
})

test('One is not a string', () => {
  const one = new SXPNumber(1)
  expect(isString(one)).toBe(false)
})

test('The value of true is true', () => {
  const t = new SXPBool(true)
  expect(valueOf(t)).toBe(true)
})

test('The value of false is false', () => {
  const f = new SXPBool(false)
  expect(valueOf(f)).toBe(false)
})

test('True is a bool', () => {
  const t = new SXPBool(true)
  expect(isBool(t)).toBe(true)
})

test('One is not a bool', () => {
  const one = new SXPNumber(1)
  expect(isBool(one)).toBe(false)
})
