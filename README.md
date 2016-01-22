# shunting-yard-arbitrary-precision

[![Build Status](https://travis-ci.org/javiercejudo/shunting-yard-arbitrary-precision.svg)](https://travis-ci.org/javiercejudo/shunting-yard-arbitrary-precision)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/shunting-yard-arbitrary-precision/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/shunting-yard-arbitrary-precision?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/shunting-yard-arbitrary-precision/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/shunting-yard-arbitrary-precision)

Arbitrary precision support on top of [javascript-shunting-yard](https://github.com/droptable/javascript-shunting-yard), a mathematical expression parser.

## Install

    npm i shunting-yard-arbitrary-precision

## Usage

```js
const shunt = require('shunting-yard-arbitrary-precision');

Number(shunt('3+2')); //=> 5

// all following results are returned as Decimal
// with the floating adapter by default
shunt('3+2'); //=> 5 (as Decimal)
shunt('(10+5)/5'); //=> 3
shunt('3+(5*2)*(-3+2)'); //=> -7
shunt('2^3'); //=> 8

const decimalFactory = require('arbitrary-precision');
const Decimal = decimalFactory(require('bigjs-adapter'));

shunt('0.1+0.2', {Decimal: Decimal}); //=> 0.3

let context = new shunt.Context();

context.def('abs');
shunt('2*abs(-3)', {context: context}); //=> 6

context.def('tau', 2 * Math.PI);
shunt('3*tau', {context: context}); //=> 18.84955592153876

context.def('javier', a => a * 1.618);
shunt('javier(21)', {context: context}); //=> 33.978
```

Example with [Ramda](https://github.com/ramda/ramda):

```js
const R = require('ramda');
const curriedShunt = R.curryN(2, shunt);
const myShunt = curriedShunt(R.__, {Decimal: Decimal, context: context});

myShunt('javier(abs(-3))*.2'); //=> 0.9708
shunt('(1.618*3)*.2'); //=> 0.9708000000000001
```

See [live example](https://tonicdev.com/javiercejudo/shunting-yard-arbitrary-precision).  
See [spec](test/spec.js).
