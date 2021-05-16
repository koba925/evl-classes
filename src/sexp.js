class SXPNumber {
  constructor (val) {
    this.val = val
  }

  toString () {
    return this.val
  }
}

const isNumber = a => a instanceof SXPNumber

module.exports = {
  SXPNumber, isNumber
}
