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
