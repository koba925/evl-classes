/* eslint-env jest */

const { evalsTo } = require('../src/evl')

expect.extend({ evalsTo })

test('"1" is evaluated to 1', () => {
  expect('1').evalsTo('1')
})
test('"aaa" is evaluated to "aaa"', () => {
  expect('"aaa"').evalsTo('"aaa"')
})
