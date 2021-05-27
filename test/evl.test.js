/* eslint-env jest */

const { evalsTo } = require('../src/evl')

expect.extend({ evalsTo })

test('() is evaluated to ()', () => {
  expect('()').evalsTo('()')
})
test('#t is evaluated to #t', () => {
  expect('#t').evalsTo('#t')
})
test('#f is evaluated to #f', () => {
  expect('#f').evalsTo('#f')
})
test('"aaa" is evaluated to "aaa"', () => {
  expect('"aaa"').evalsTo('"aaa"')
})
test('"1" is evaluated to 1', () => {
  expect('1').evalsTo('1')
})

test('if evals consequence when the condition is true', () => {
  expect('(if #t "true" "false")').evalsTo('"true"')
})
test('if evals alternative when the condition is false', () => {
  expect('(if #f "true" "false")').evalsTo('"false"')
})
test('if evals alternative when the condition is not true', () => {
  expect('(if 0 "true" "false")').evalsTo('"false"')
})
