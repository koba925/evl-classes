const {
  isValue, equals, toSexp
} = require('./sexp')

const evl = (exp) => {
  if (isValue(exp)) return exp
}

const evalsTo = function (received, expected) {
  return {
    message: () =>
      `Actual: ${toString(received)} Expected: ${toString(expected)}`,
    pass: equals(evl(toSexp(received)), toSexp(expected))
  }
}

module.exports = {
  evl,
  evalsTo
}
