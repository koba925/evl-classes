/* eslint-env jest */

const {
  makeValue, isValue, valueOf, eqv, isTrue,
  NULL, isNull,
  makeSymbol, isSymbol, nameOf, symbolIs,
  isPair, isAtom, cons, car, cdr, setCar, setCdr,
  equals, makeList,
  toString, toSexp
} = require('../src/sexp')

describe('Test for values', () => {
  test('ValueOf returns the correct value for number', () => {
    expect(valueOf(makeValue(1))).toBe(1)
  })

  test('A number is a value', () => {
    expect(isValue(makeValue(1))).toBe(true)
  })
  test('A boolean is a value', () => {
    expect(isValue(makeValue(true))).toBe(true)
  })
  test('A string is a value', () => {
    expect(isValue(makeValue('str'))).toBe(true)
  })
  test('A symbol is not a value', () => {
    expect(isValue(makeSymbol('a'))).toBe(false)
  })

  test('1 is eqv to 1', () => {
    expect(eqv(makeValue(1), makeValue(1))).toBe(true)
  })
  test('1 is not eqv to 2', () => {
    expect(eqv(makeValue(1), makeValue(2))).toBe(false)
  })
  test('1 is not eqv to "1"', () => {
    expect(eqv(makeValue(1), makeValue('1'))).toBe(false)
  })
  test('1 is not eqv to symbol "a"', () => {
    expect(eqv(makeValue(1), makeSymbol('a'))).toBe(false)
  })
  test('Symbol "a" is not eqv to 1', () => {
    expect(eqv(makeSymbol('a'), makeValue(1))).toBe(false)
  })

  test('True is true', () => {
    expect(isTrue(makeValue(true))).toBe(true)
  })
  test('False is not true', () => {
    expect(isTrue(makeValue(false))).toBe(false)
  })
  test('0 is not true', () => {
    expect(isTrue(makeValue(0))).toBe(false)
  })
})

describe('Test for null', () => {
  test('NULL is null', () => {
    expect(isNull(NULL)).toBe(true)
  })
  test('A number is not null', () => {
    expect(isNull(makeValue(1))).toBe(false)
  })
})

describe('Test for symbols', () => {
  test('NameOf returns the name of the symbol', () => {
    expect(nameOf(makeSymbol('sym'))).toBe('sym')
  })

  test('A symbol is a symbol', () => {
    expect(isSymbol(makeSymbol('sym'))).toBe(true)
  })
  test('A value is not a symbol', () => {
    expect(isSymbol(makeValue(1))).toBe(false)
  })

  test('A symbol sym is a symbol named "sym"', () => {
    expect(symbolIs(makeSymbol('sym'), 'sym')).toBe(true)
  })
  test('A symbol sym is not a symbol named "mys"', () => {
    expect(symbolIs(makeSymbol('sym'), 'mys')).toBe(false)
  })
  test('A symbol sym is not a symbol named "sym"', () => {
    expect(symbolIs(makeValue(1), 'sym')).toBe(false)
  })
})

describe('Test for conses', () => {
  test('cons is a pair', () => {
    expect(isPair(
      cons(makeSymbol('a'), makeSymbol('b'))
    )).toBe(true)
  })
  test('Symbol is not a pair', () => {
    expect(isPair(makeSymbol('a'))).toBe(false)
  })

  test('A number is an atom', () => {
    expect(isAtom(makeValue(1))).toBe(true)
  })
  test('A cons is not an atom', () => {
    expect(isAtom(
      cons(makeSymbol('a'), makeSymbol('b'))
    )).toBe(false)
  })
  test('NULL is not an atom', () => {
    expect(isAtom(NULL)).toBe(false)
  })

  test('car(cons(a b)) equals a', () => {
    expect(car(cons(makeSymbol('a'), makeSymbol('b')))).toStrictEqual(makeSymbol('a'))
  })

  test('cdr(cons(a b)) equals b', () => {
    expect(cdr(cons(makeSymbol('a'), makeSymbol('b')))).toStrictEqual(makeSymbol('b'))
  })

  test('SetCar sets the car of cons', () => {
    const a = cons(makeValue(1), makeValue(2))
    setCar(a, 3)
    expect(a.car).toBe(3)
  })

  test('SetCdr sets the cdr of cons', () => {
    const a = cons(makeValue(1), makeValue(2))
    setCdr(a, 3)
    expect(a.cdr).toBe(3)
  })
})

describe('Test for equals', () => {
  test('1 equals 1', () => {
    expect(equals(makeValue(1), makeValue(1))).toBe(true)
  })
  test('Null equals null', () => {
    expect(equals(NULL, NULL)).toBe(true)
  })
  test('1 not equals NULL', () => {
    expect(equals(makeValue(1), NULL)).toBe(false)
  })
  test('Symbol "a" equals symbol "a"', () => {
    expect(equals(makeSymbol('a'), makeSymbol('a'))).toBe(true)
  })
  test('Symbol "a" not equals symbol "b"', () => {
    expect(equals(makeSymbol('a'), makeSymbol('b'))).toBe(false)
  })
  test('Symbol "a" not equals 1', () => {
    expect(equals(makeSymbol('a'), makeValue(1))).toBe(false)
  })
  test('(1 . 2) equals (1 . 2)', () => {
    expect(equals(
      cons(makeValue(1), makeValue(2)),
      cons(makeValue(1), makeValue(2))
    )).toBe(true)
  })
  test('(1 . 2) equals (1 . 3)', () => {
    expect(equals(
      cons(makeValue(1), makeValue(2)),
      cons(makeValue(1), makeValue(3))
    )).toBe(false)
  })
})

describe('makeList', () => {
  it('makes NULL from empty arguments', () => {
    expect(makeList()).toStrictEqual(NULL)
  })
  it('makes a one element list from 1 arguments', () => {
    expect(makeList(makeValue(1))).toStrictEqual(
      cons(makeValue(1), NULL)
    )
  })
  it('makes a two element list from 2 arguments', () => {
    expect(makeList(makeValue(1), makeValue(1))).toStrictEqual(
      cons(makeValue(1), cons(makeValue(1), NULL))
    )
  })
})

describe('ToString', () => {
  it('makes a correct string of a number', () => {
    expect(toString(makeValue(1))).toBe('1')
  })

  it('makes a correct string of a string', () => {
    expect(toString(makeValue('str'))).toBe('"str"')
  })

  it('makes a correct string of a boolean', () => {
    expect(toString(makeValue(true))).toBe('#t')
    expect(toString(makeValue(false))).toBe('#f')
  })

  it('makes a correct string of null', () => {
    expect(toString(NULL)).toBe('()')
  })

  it('makes a correct string of a symbol', () => {
    expect(toString(makeSymbol('sym'))).toBe('sym')
  })

  it('makes a correct string of a cons', () => {
    expect(toString(toSexp('(sym 1)'))).toBe('(sym 1)')
    expect(toString(toSexp('(sym . 1)'))).toBe('(sym . 1)')
  })
})

describe('ToSexp', () => {
  it('returns 1 when given "1"', () => {
    expect(toSexp('1')).toStrictEqual(makeValue(1))
  })
  it('returns 1 when given " 1"', () => {
    expect(toSexp(' 1')).toStrictEqual(makeValue(1))
  })
  it('returns 1 when given "1 "', () => {
    expect(toSexp(' 1')).toStrictEqual(makeValue(1))
  })

  it('returns boolean true when given "#t"', () => {
    expect(toSexp('#t')).toStrictEqual(makeValue(true))
  })
  it('returns boolean false when given "#f"', () => {
    expect(toSexp('#f')).toStrictEqual(makeValue(false))
  })

  it('returns string "aaa" when given "aaa"', () => {
    expect(toSexp('"aaa"')).toStrictEqual(makeValue('aaa'))
  })

  it('returns symbol "1a" when given "1a"', () => {
    expect(toSexp('1a')).toStrictEqual(makeSymbol('1a'))
  })

  it('returns NULL when given "()"', () => {
    expect(toSexp('()')).toStrictEqual(NULL)
  })
  it('returns NULL when given "( )"', () => {
    expect(toSexp('( )')).toStrictEqual(NULL)
  })
  it('returns (1.2) when given "(1 . 2)"', () => {
    expect(toSexp('(1.2)')).toStrictEqual(
      cons(makeValue(1), makeValue(2))
    )
  })
  it('returns (1 . 2) when given "(1 . 2)"', () => {
    expect(toSexp('(1 . 2)')).toStrictEqual(
      cons(makeValue(1), makeValue(2))
    )
  })
  it('returns (1 2) when given "(1 2)"', () => {
    expect(toSexp('(1 2)')).toStrictEqual(
      cons(makeValue(1), cons(makeValue(2), NULL))
    )
  })

  it('throws SytaxError when given "1 1"', () => {
    expect(() => toSexp('1 1')).toThrowError(SyntaxError)
  })
})
