const {
  makeValue, isValue, valueOf
} = require('./sexp')

const evl = (exp) => {
  if (isValue(exp)) return exp
}

module.exports = {
  evl
}
