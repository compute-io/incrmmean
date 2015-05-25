incrmmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a method to compute a moving arithmetic mean incrementally.


## Installation

``` bash
$ npm install compute-incrmmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var incrmmean = require( 'compute-incrmmean' );
```

#### incrmmean( window )

Returns an initialized method to compute a moving arithmetic mean incrementally. `window` sets the window size, i.e., the number of values over which to compute a moving mean.

``` javascript
var mmean = incrmmean( 3 );
```

#### mmean( [value] )

If provided a `value`, the method updates and returns the mean of the current window. If not provided a `value`, the method returns the current mean.

``` javascript
var mu;

// Filling window...
mu = mmean( 2 );
// mean is 2

mmean( 3 );
// mean is 2.5

mmean( 2 );
// mean is 2.33...

// Window starts sliding...
mmean( -2 );
// mean is 1

mmean( 9 );
// mean is 3

mu = mmean();
// returns 3
```


## Notes

1. 	If values have not yet been provided to `mmean`, `mmean` returns `null`.
1. 	The first `W-1` returned means will have less statistical support than subsequent moving means, as `W` values are needed to fill the window buffer. Until the window is full, the mean returned equals the [arithmetic mean](https://github.com/compute-io/mean) of all values provided thus far.

The use case for this module differs from the conventional [vector](https://github.com/compute-io/mmean) implementation and the [stream](https://github.com/flow-io/) implementation. Namely, this module decouples the act of updating the moving mean from the act of consuming the moving mean.



## Examples

``` javascript
var incrmmean = require( 'compute-incrmmean' );

// Initialize a method to calculate the moving mean incrementally:
var mmean = incrmmean( 5 ),
	mu;

// Simulate some data...
for ( var i = 0; i < 1000; i++ ) {
	mu = mmean( Math.random()*100 );
	console.log( mu );
}
mu = mmean();
console.log( mu );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```




## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```

---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-incrmmean.svg
[npm-url]: https://npmjs.org/package/compute-incrmmean

[travis-image]: http://img.shields.io/travis/compute-io/incrmmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/incrmmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/incrmmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/incrmmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/incrmmean.svg
[dependencies-url]: https://david-dm.org/compute-io/incrmmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/incrmmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/incrmmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/incrmmean.svg
[github-issues-url]: https://github.com/compute-io/incrmmean/issues
