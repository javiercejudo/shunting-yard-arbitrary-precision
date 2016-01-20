/*jshint node:true */

'use strict';

var toDecimalFactory = require('to-decimal-arbitrary-precision');

var T_PLUS = 65;
var T_MINUS = 66;
var T_TIMES = 67;
var T_DIV = 68;
var T_UNARY_MINUS = 72;

module.exports = function op(origOp, Decimal) {
  var toDecimal = toDecimalFactory(Decimal);
  var minus1 = toDecimal(-1);

  return function operator(type, lhs, rhs) {
    if (lhs !== null) {
      switch (type) {
        case T_PLUS:
          return toDecimal(lhs.value).plus(toDecimal(rhs.value));

        case T_MINUS:
          return toDecimal(lhs.value).minus(toDecimal(rhs.value));

        case T_TIMES:
          return toDecimal(lhs.value).times(toDecimal(rhs.value));

        case T_DIV:
          return toDecimal(lhs.value).div(toDecimal(rhs.value));
      }
    }

    switch (type) {
      case T_UNARY_MINUS:
        return minus1.times(toDecimal(rhs.value));
    }

    return toDecimal(origOp.apply(undefined, arguments));
  };
};
