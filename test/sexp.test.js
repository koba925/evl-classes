/* eslint-env jest */

const {
  makeValue, isValue, valueOf,
  makeSymbol, isSymbol, nameOf
} = require('../src/sexp')

test('The value of value(1) is 1', () => {
  expect(valueOf(makeValue(1))).toBe(1)
})

test('Value(1) is a value', () => {
  expect(isValue(makeValue(1))).toBe(true)
})

test('Symbol("a") is not a value', () => {
  expect(isValue(makeSymbol('a'))).toBe(false)
})

test('The name of Symbol("a") is "a"', () => {
  expect(nameOf(makeSymbol('a'))).toBe('a')
})

test('Symbol("a") is a symbol', () => {
  expect(isSymbol(makeSymbol('a'))).toBe(true)
})

test('Value(1) is not a symbol', () => {
  expect(isSymbol(makeValue(1))).toBe(false)
})
