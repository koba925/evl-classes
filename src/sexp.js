class SXPNumber {
  constructor (val) {
    this.val = val
  }

  toString () {
    return this.val.toString()
  }
}

const isNumber = a => a instanceof SXPNumber

class SXPString {
  constructor (val) {
    this.val = val
  }

  toString () {
    return this.val
  }
}

const isString = a => a instanceof SXPString

class SXPBool {
  constructor (val) {
    this.val = val
  }

  toString () {
    return this.val.toString()
  }
}

const isBool = a => a instanceof SXPBool

const valueOf = a => a.val

module.exports = {
  SXPNumber,
  isNumber,
  SXPString,
  isString,
  SXPBool,
  isBool,
  valueOf
}
