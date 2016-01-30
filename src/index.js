/*jshint node:true */

'use strict';

var defaultTo = require('ramda/src/defaultTo');
var flow = require('lodash.flow');
var isFunction = require('lodash.isfunction');
var isUndefined = require('lodash.isundefined');
var decimalFactory = require('arbitrary-precision');
var floatingAdapter = require('floating-adapter');
var removeWhitespace = require('remove-whitespace');
var sy = require('../vendor/javascript-shunting-yard/shunt');
var operator = require('./operator');
var tokens = require('./tokens');

var defaultToFloating = defaultTo(decimalFactory(floatingAdapter));

sy.Context.prototype.def = function def(name, value) {
  if (isUndefined(value) && isFunction(Math[name])) {
    this.fnt[name] = Math[name];
  } else if (isFunction(value)) {
    this.fnt[name] = value;
  } else {
    this.cst[name] = value;
  }

  return this;
};

var opReplacer = function opReplacer(x) {
  return x.replace(/×/g, '*').replace(/÷/g, '/');
};

var sanitise = flow(removeWhitespace, opReplacer);

var shuntingYard = function shuntingYard(xIn, specIn) {
  var x = sanitise(xIn);
  var spec = defaultTo({}, specIn);
  var context = defaultTo(new sy.Context(), spec.context);
  var Decimal = defaultToFloating(spec.Decimal);

  var parser =  new sy.Parser(new sy.Scanner(x));
  parser.op = operator(parser.op, Decimal);

  return parser.reduce(context);
};

shuntingYard.Context = sy.Context;

module.exports = shuntingYard;
