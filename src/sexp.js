class SXPValue {
  constructor (val) {
    this.val = val
  }

  toString () {
    if (isNull(this)) {
      return '()'
    } else if (typeof this.val === 'boolean') {
      return this.val ? '#t' : '#f'
    } else if (typeof this.val === 'string') {
      return '"' + this.val.toString() + '"'
    } else {
      return this.val.toString()
    }
  }
}

const makeValue = a => new SXPValue(a)
const isValue = a => a instanceof SXPValue
const valueOf = a => a.val
const eqv = (a, b) => isValue(a) && isValue(b) && a.val === b.val
const isTrue = a => isValue(a) && valueOf(a) === true

const NULL = new SXPValue(null)
const isNull = a => isValue(a) && valueOf(a) === null

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
const symbolIs = (a, name) => isSymbol(a) && name === nameOf(a)

class SXPPair {
  constructor (car, cdr) {
    this.car = car
    this.cdr = cdr
  }

  toString () {
    const inside = l => {
      if (isNull(cdr(l))) return car(l).toString()
      if (isPair(cdr(l))) {
        return car(l).toString() + ' ' + inside(cdr(l))
      }
      return car(l).toString() + ' . ' + cdr(l).toString()
    }
    return `(${inside(this)})`
  }
}

const makePair = (car, cdr) => new SXPPair(car, cdr)
const isPair = a => a instanceof SXPPair
const isAtom = a => !isPair(a) && !isNull(a)
const cons = (car, cdr) => makePair(car, cdr)
const car = a => a.car
const cdr = a => a.cdr
const setCar = (a, val) => { a.car = val }
const setCdr = (a, val) => { a.cdr = val }
const equals = (a, b) => {
  if (isValue(a) && isValue(b)) return eqv(a, b)
  if (isSymbol(a) && isSymbol(b)) return nameOf(a) === nameOf(b)
  if (!isPair(a) || !isPair(b)) return false
  return equals(car(a), car(b)) && equals(cdr(a), cdr(b))
}

const toString = a => a.toString()

const skipWhite = str => {
  return str.replace(/^\s*/, '')
}

const expect = (str, start) => {
  str = skipWhite(str)
  if (!str.startsWith(start)) {
    throw new SyntaxError(`Expected "${start}" at "${str}"`)
  }
  return str.slice(start.length)
}

const expectEnd = str => {
  str = skipWhite(str)
  if (str !== '') throw new SyntaxError(`Extra chars at "${str}"`)
}

const parseList = str => {
  str = skipWhite(str)
  if (str.startsWith(')')) return [str.slice(1), NULL]

  let a, d
  [str, a] = parseTerm(str)

  str = skipWhite(str)

  if (str.startsWith('.')) {
    str = str.slice(1)
    ;[str, d] = parseTerm(str)
    str = expect(str, ')')
    return [str, cons(a, d)]
  }

  [str, d] = parseList(str)
  return [str, cons(a, d)]
}

const parseString = str => {
  const chars = str.match(/^"([^"]*)"/)[1]
  return [str.slice(chars.length + 2), makeValue(chars)]
}

const parseTerm = str => {
  str = skipWhite(str)
  if (str.startsWith('(')) return parseList(str.slice(1))
  if (str.startsWith('"')) return parseString(str)

  const token = str.match(/[^\s().]+/)[0]
  if (token === '#t' || token === '#f') {
    return [str.slice(token.length), makeValue(token === '#t')]
  }
  if (/^\d+$/.test(token)) {
    return [str.slice(token.length), makeValue(Number(token))]
  }
  return [str.slice(token.length), makeSymbol(token)]
}

const toSexp = str => {
  let exp
  [str, exp] = parseTerm(str)
  expectEnd(str)
  return exp
}

module.exports = {
  makeValue,
  isValue,
  valueOf,
  eqv,
  isTrue,
  NULL,
  isNull,
  makeSymbol,
  isSymbol,
  nameOf,
  symbolIs,
  isPair,
  isAtom,
  cons,
  car,
  cdr,
  setCar,
  setCdr,
  equals,
  toString,
  toSexp
}
