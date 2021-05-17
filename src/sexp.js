class SXPValue {
  constructor (val) {
    this.val = val
  }

  toString () {
    return this.val.toString()
  }
}

const makeValue = a => new SXPValue(a)
const isValue = a => a instanceof SXPValue
const valueOf = a => a.val

class SXPSymbol {
  constructor (name) {
    this.name = name
  }

  toString () {
    return this.name
  }
}

const makeSymbol = a => new SXPSymbol(a)
const isSymbol = a => a instanceof SXPSymbol
const nameOf = a => a.name

module.exports = {
  makeValue,
  isValue,
  valueOf,
  makeSymbol,
  isSymbol,
  nameOf
}
