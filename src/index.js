/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
var defaultTo = require('ramda/src/defaultTo');
var decimalFactory = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var removeWhitespace = require('remove-whitespace');
var sy = require('../vendor/javascript-shunting-yard/shunt');
var operator = require('./operator');

var defaultToFloating = defaultTo(decimalFactory(floatingAdapter));

var shuntingYard = function shuntingYard(xIn, specIn) {
  var x = removeWhitespace(xIn);
  var spec = defaultTo({}, specIn);
  var context = defaultTo(new sy.Context(), spec.context);
  var Decimal = defaultToFloating(spec.Decimal);

  var parser =  new sy.Parser(new sy.Scanner(x));
  parser.op = operator(parser.op, Decimal);

  return parser.reduce(context);
};

shuntingYard.Context = sy.Context;

module.exports = shuntingYard;
