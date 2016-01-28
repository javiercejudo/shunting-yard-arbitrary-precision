/*jshint node:true */

'use strict';

var toDecimalFactory = require('to-decimal-arbitrary-precision');
var tokens = require('./tokens');

module.exports = function op(origOp, Decimal) {
  var toDecimal = toDecimalFactory(Decimal);

  return function operator(type, lhs, rhs) {
    if (lhs !== null) {
      switch (type) {
        case tokens.T_PLUS:
          return toDecimal(lhs.value).plus(toDecimal(rhs.value));

        case tokens.T_MINUS:
          return toDecimal(lhs.value).minus(toDecimal(rhs.value));

        case tokens.T_TIMES:
          return toDecimal(lhs.value).times(toDecimal(rhs.value));

        case tokens.T_DIV:
          return toDecimal(lhs.value).div(toDecimal(rhs.value));

        case tokens.T_MOD:
          return toDecimal(lhs.value).mod(toDecimal(rhs.value));

        case tokens.T_POW:
          return toDecimal(lhs.value).pow(toDecimal(rhs.value));
      }
    }

    switch (type) {
      case tokens.T_SQRT:
        return toDecimal(rhs.value).sqrt();
    }

    return toDecimal(origOp.apply(undefined, arguments));
  };
};
