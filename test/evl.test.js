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

test('quote returns its text', () => {
  expect(evlString('(quote (a 1))')).evalsTo(toSexp('(a 1)'))
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

test('Lambda is evaluated to a compound', () => {
  expect(evlString('(lambda (a b) (+ a b))')).evalsTo(
    toSexp('("compound" (a b) (+ a b) ())')
  )
})

test('(cons 1 2) is (1 . 2)', () => {
  expect(evlString('(cons 1 2)')).evalsTo(toSexp('(1 . 2)'))
})
test('(cons 1 (cons 2 3)) is (1 . (2 . 3))', () => {
  expect(evlString('(cons 1 (cons 2 3))'))
    .evalsTo(toSexp('(1 . (2 . 3))'))
})
test('(cons (cons 1 2) 3) is ((1 . 2) . 3)', () => {
  expect(evlString('(cons (cons 1 2) 3)'))
    .evalsTo(toSexp('((1 . 2) . 3)'))
})

test('(car (cons 1 2)) is 1', () => {
  expect(evlString('(car (cons 1 2))')).evalsTo(toSexp('1'))
})

test('(cdr (cons 1 2)) is 2', () => {
  expect(evlString('(cdr (cons 1 2))')).evalsTo(toSexp('2'))
})

test('1 + 2 = 3', () => {
  expect(evlString('(+ 1 2)')).evalsTo(toSexp('3'))
})

test('3 - 1 = 2', () => {
  expect(evlString('(- 3 1)')).evalsTo(toSexp('2'))
})
