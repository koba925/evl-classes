const {
  isValue, isTrue, symbolIs, car, cdr, equals, toString, toSexp
} = require('./sexp')

const quoteText = exp => car(cdr(exp))
const doQuote = exp => quoteText(exp)

const ifCond = exp => car(cdr(exp))
const ifConseq = exp => car(cdr(cdr(exp)))
const ifAlt = exp => car(cdr(cdr(cdr(exp))))
const doIf = exp => isTrue(evl(ifCond(exp)))
  ? evl(ifConseq(exp))
  : evl(ifAlt(exp))

const evl = (exp) => {
  if (isValue(exp)) return exp
  if (symbolIs(car(exp), 'quote')) return doQuote(exp)
  if (symbolIs(car(exp), 'if')) return doIf(exp)
}

const evlString = str => evl(toSexp(str))

const evalsTo = (received, expected) => {
  return {
    message: () => `
Actual: ${toString(received)}
Expected ${toString(expected)}`,
    pass: equals(received, expected)
  }
}

module.exports = {
  evl,
  evlString,
  evalsTo
}
