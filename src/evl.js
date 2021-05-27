const {
  isValue, isTrue, symbolIs, car, cdr, equals, toSexp
} = require('./sexp')

const ifCond = exp => car(cdr(exp))
const ifConseq = exp => car(cdr(cdr(exp)))
const ifAlt = exp => car(cdr(cdr(cdr(exp))))
const doIf = exp => isTrue(evl(ifCond(exp)))
  ? evl(ifConseq(exp))
  : evl(ifAlt(exp))

const evl = (exp) => {
  if (isValue(exp)) return exp
  if (symbolIs(car(exp), 'if')) return doIf(exp)
}

const evalsTo = (received, expected) => {
  return {
    message: () => `${received} was not evalueated to ${expected}`,
    pass: equals(evl(toSexp(received)), toSexp(expected))
  }
}

module.exports = {
  evl,
  evalsTo
}
