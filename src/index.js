/*jshint node:true */

'use strict';

var flow = require('lodash.flow');
var defaultTo = require("ramda/src/defaultTo");
var decimalFactory = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var removeWhitespace = require('remove-whitespace');
var sy = require("../bower_components/javascript-shunting-yard/shunt");
var operator = require("./operator");

var defaultToOriginalContext = defaultTo(new sy.Context());
var defaultToFloating = defaultTo(decimalFactory(floatingAdapter));

var shuntingYard = function shuntingYard(xIn, specIn) {
  var x = removeWhitespace(xIn);
  var spec = defaultTo({}, specIn);
  var Decimal = defaultToFloating(spec.Decimal);
  var context = defaultToOriginalContext(spec.context);

  var parser =  new sy.Parser(new sy.Scanner(x));
  parser.op = operator(parser.op, Decimal);

  return parser.reduce(context);
};

shuntingYard.Context = sy.Context;

module.exports = shuntingYard;
