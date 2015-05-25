'use strict';

// MODULES //

var isPositiveInteger = require( 'validate.io-positive-integer' );


// INCREMENTAL MOVING MEAN //

/**
* FUNCTION: incrmmean( W )
*	Returns a method to compute a moving arithmetic mean incrementally.
*
* @param {Number} W - window size
* @returns {Function} method to compute a moving arithmetic mean incrementally
*/
function incrmmean( W ) {
	if ( !isPositiveInteger( W ) ) {
		throw new TypeError( 'incrmmean()::invalid input argument. Window size must be a positive integer. Value: `' + W + '`.' );
	}
	var arr = new Array( W ),
		mu = 0,
		N = 0,
		i = -1,
		delta;
	/**
	* FUNCTION: incrmmean( [value] )
	*	If a `value` is provided, updates and returns the updated mean. If no `value` is provided, returns the current mean.
	*
	* @param {Number} [value] - value used to update the moving mean
	* @returns {Number|Null} mean or null
	*/
	return function incrmmean( x ) {
		if ( !arguments.length ) {
			if ( N === 0 ) {
				return null;
			}
			return mu;
		}
		// Update the index for managing the circular buffer...
		i = (i+1) % W;

		// Fill up the initial window; else, update the existing window...
		if ( N < W ) {
			N += 1;
			delta = x - mu;
			mu += delta / N;
		} else {
			delta = x - arr[ i ];
			mu += delta / W;
		}
		arr[ i ] = x;
		return mu;
	};
} // end FUNCTION incrmmean()


// EXPORTS //

module.exports = incrmmean;
