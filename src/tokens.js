/*jshint node:true */

'use strict';

// tokens
var T_NUMBER      = 1,  // number
    T_IDENT       = 2,  // ident (constant)
    T_FUNCTION    = 4,  // function
    T_POPEN       = 8,  // (
    T_PCLOSE      = 16, // )
    T_COMMA       = 32, // ,
    T_OPERATOR    = 64, // operator
    T_PLUS        = 65, // +
    T_MINUS       = 66, // -
    T_TIMES       = 67, // *
    T_DIV         = 68, // /
    T_MOD         = 69, // %
    T_POW         = 70, // ^
    T_UNARY_PLUS  = 71, // unary +
    T_UNARY_MINUS = 72, // unary -
    T_NOT         = 73, // unary ! (convert (n > 0 || n < 0) to 0 and 0 to 1)
    T_SQRT        = 74; // unary √

module.exports = {
  T_NUMBER: T_NUMBER,
  T_IDENT: T_IDENT,
  T_FUNCTION: T_FUNCTION,
  T_POPEN: T_POPEN,
  T_PCLOSE: T_PCLOSE,
  T_COMMA: T_COMMA,
  T_OPERATOR: T_OPERATOR,
  T_PLUS: T_PLUS,
  T_MINUS: T_MINUS,
  T_TIMES: T_TIMES,
  T_DIV: T_DIV,
  T_MOD: T_MOD,
  T_POW: T_POW,
  T_UNARY_PLUS: T_UNARY_PLUS,
  T_UNARY_MINUS: T_UNARY_MINUS,
  T_NOT: T_NOT,
  T_SQRT: T_SQRT
};
