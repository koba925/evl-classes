const {
  makeValue, isValue, isTrue,
  plus, minus,
  NULL, isNull,
  isSymbol, nameOf,
  cons, car, cdr, makeList,
  equals, toString, toSexp
} = require('./sexp')

const expOp = exp => car(exp)
const expArgs = exp => cdr(exp)

const quoteText = exp => car(cdr(exp))
const evlQuote = exp => quoteText(exp)

const ifCond = exp => car(cdr(exp))
const ifConseq = exp => car(cdr(cdr(exp)))
const ifAlt = exp => car(cdr(cdr(cdr(exp))))
const evlIf = exp => isTrue(evl(ifCond(exp)))
  ? evl(ifConseq(exp))
  : evl(ifAlt(exp))

const COMPOUND = makeValue('compound')
const makeCompound = (vars, body, env) => makeList(
  COMPOUND, vars, body, env
)
const compoundVars = proc => car(cdr(proc))
const compoundBody = proc => car(cdr(cdr(proc)))
const compoundEnv = proc => car(cdr(cdr(cdr(proc))))

const lambdaVars = exp => car(cdr(exp))
const lambdaBody = exp => car(cdr(cdr(exp)))
const evlLambda = (exp, env) => makeCompound(
  lambdaVars(exp), lambdaBody(exp), env
)

const bindEnv = (env, vars, vals) => makeList(vars, vals, env)
const envVars = env => car(env)
const envVals = env => car(cdr(env))
const env_parent = env => car(cdr(cdr(env)))
const lookupEnv = (sym, env) => {
  const lookupFrame = (vars, vals) => {
    if (isNull(vars)) return undefined
    if (equals(car(vars), sym)) return car(vals)
    return lookupFrame(cdr(vars), cdr(vals))
  }

  if (isNull(env)) error("Variable not found: " + valueOf(sym))
  return lookupFrame(env_vars(env), env_vals(env)) || 
    lookupEnv(sym, env_parent(env))
}
const SPECIAL_FORMS = {
  quote: evlQuote,
  if: evlIf,
  lambda: evlLambda
}

const isSpecialForm = exp => isSymbol(expOp(exp)) &&
  nameOf(expOp(exp)) in SPECIAL_FORMS
const evlSpecialForm = (exp, env) =>
  SPECIAL_FORMS[nameOf(expOp(exp))](exp, env)

const evlCons = args => cons(car(args), car(cdr(args)))
const evlCar = args => car(car(args))
const evlCdr = args => cdr(car(args))
const evlPlus = args => plus(car(args), car(cdr(args)))
const evlMinus = args => minus(car(args), car(cdr(args)))

const PRIM_OPS = {
  cons: evlCons,
  car: evlCar,
  cdr: evlCdr,
  '+': evlPlus,
  '-': evlMinus
}

const isPrimOp = a => isSymbol(a) && nameOf(a) in PRIM_OPS
const appPrimOp = (op, args) => PRIM_OPS[nameOf(op)](args)

const evlArgs = (args, env) => isNull(args)
  ? NULL
  : cons(evl(car(args), env), evlArgs(cdr(args)))

const e0 = NULL

const evl = (exp, env = e0) => {
  if (isValue(exp)) return exp
  if (isSpecialForm(exp, env)) {
    return evlSpecialForm(exp, env)
  }

  const op = expOp(exp)
  const args = evlArgs(expArgs(exp), env)
  if (isPrimOp(op)) return appPrimOp(op, args)
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
