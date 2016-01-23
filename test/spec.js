/*jshint node:true, mocha:true */

'use strict';

require('should');

var shunt = require('../src/');
var decimalFactory = require('arbitrary-precision');
var toDecimalFactory = require('to-decimal-arbitrary-precision');
var Floating = decimalFactory(require('floating-adapter'));
var Decimal = decimalFactory(require('bigjs-adapter'));

var toFloating = toDecimalFactory(Floating);
var toDecimal = toDecimalFactory(Floating);

describe('shunt', function() {
  it('parses mathematical expressions', function() {
    shunt('3+2').equals(toFloating(5)).should.be.exactly(true);
    shunt('3 +2  ').equals(toFloating(5)).should.be.exactly(true);
    shunt('(10+5)/5').equals(toFloating(3)).should.be.exactly(true);
    shunt('2 * (2 * (5 - 3))').equals(toFloating(8)).should.be.exactly(true);
    shunt('7+2').equals(toFloating(9)).should.be.exactly(true);
    shunt('4(6)').equals(toFloating(24)).should.be.exactly(true);
    shunt('3+(5*2)*(-3+2)').equals(toFloating(-7)).should.be.exactly(true);
    shunt('2^3').equals(toFloating(8)).should.be.exactly(true);
    shunt('11%3').equals(toFloating(2)).should.be.exactly(true);
    shunt('√1024').equals(toFloating(32)).should.be.exactly(true);
  });

  it('supports arbitrary precision', function() {
    shunt('0.1+0.2', {Decimal: Decimal})
      .equals(toDecimal(0.3)).should.be.exactly(true);
  });

  it('supports adding math functions to the context', function() {
    shunt('2*(-3)')
      .equals(toFloating(-6)).should.be.exactly(true);

    var context = new shunt.Context();
    context.def('abs');

    shunt('2*abs(-3)', {context: context})
      .equals(toFloating(6)).should.be.exactly(true);

    shunt.bind(undefined, '2*abs(-3)').should.throw();
  });

  it('supports adding constants to the context', function() {
    var context = new shunt.Context();

    context.def('tau', 2 * Math.PI);

    shunt('3*tau', {context: context})
      .equals(toFloating(3 * 2 * Math.PI)).should.be.exactly(true);

    shunt.bind(undefined, '3*tau').should.throw();
  });

  it('supports adding arbitrary functions', function() {
    var context = new shunt.Context();

    context.def('javier', function(a) {
      return toFloating(a).times(toFloating(1.618));
    });

    shunt('javier(21)', {context: context})
      .equals(toFloating(21 * 1.618)).should.be.exactly(true);

    shunt.bind(undefined, 'javier(21)').should.throw();
  });
});
