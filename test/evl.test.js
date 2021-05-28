/* eslint-env jest */

const { toSexp } = require('../src/sexp')
const { evlString, evalsTo } = require('../src/evl')

expect.extend({ evlString, evalsTo })

test('() is evaluated to ()', () => {
  expect(evlString('()')).evalsTo(toSexp('()'))
})
test('#t is evaluated to #t', () => {
  expect(evlString('#t')).evalsTo(toSexp('#t'))
})
test('#f is evaluated to #f', () => {
  expect(evlString('#f')).evalsTo(toSexp('#f'))
})
test('"aaa" is evaluated to "aaa"', () => {
  expect(evlString('"aaa"')).evalsTo(toSexp('"aaa"'))
})
test('"1" is evaluated to 1', () => {
  expect(evlString('1')).evalsTo(toSexp('1'))
})

test('if evals consequence when the condition is true', () => {
  expect(evlString('(if #t "true" "false")')).evalsTo(toSexp('"true"'))
})
test('if evals alternative when the condition is false', () => {
  expect(evlString('(if #f "true" "false")')).evalsTo(toSexp('"false"'))
})
test('if evals alternative when the condition is not true', () => {
  expect(evlString('(if 0 "true" "false")')).evalsTo(toSexp('"false"'))
})
