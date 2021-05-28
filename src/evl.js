const {
  isValue, isTrue, nameOf, car, cdr, equals, toString, toSexp, isSymbol
} = require('./sexp')

const op = exp => car(exp)

const quoteText = exp => car(cdr(exp))
const doQuote = exp => quoteText(exp)

const ifCond = exp => car(cdr(exp))
const ifConseq = exp => car(cdr(cdr(exp)))
const ifAlt = exp => car(cdr(cdr(cdr(exp))))
const doIf = exp => isTrue(evl(ifCond(exp)))
  ? evl(ifConseq(exp))
  : evl(ifAlt(exp))

const SPECIAL_FORMS = {
  quote: doQuote,
  if: doIf
}

const isSpecialForm = exp => isSymbol(op(exp)) &&
  nameOf(op(exp)) in SPECIAL_FORMS
const doSpecialForm = exp =>
  SPECIAL_FORMS[nameOf(op(exp))](exp)

const evl = (exp) => {
  if (isValue(exp)) return exp
  if (isSpecialForm(exp)) return doSpecialForm(exp)
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
