const {
  isValue, equals, toSexp
} = require('./sexp')

const evl = (exp) => {
  if (isValue(exp)) return exp
}

const evalsTo = (received, expected) => {
  return {
    message: () => `Actual: ${received} Expected: ${expected}`,
    pass: equals(evl(toSexp(received)), toSexp(expected))
  }
}

module.exports = {
  evl,
  evalsTo
}
