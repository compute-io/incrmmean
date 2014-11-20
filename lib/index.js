/**
*
*	COMPUTE: incrmmean
*
*
*	DESCRIPTION:
*		- Provides a method to compute a moving arithmetic mean incrementally.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// INCREMENTAL MOVING MEAN //

/**
* FUNCTION: incrmmean( W )
*	Returns a method to compute a moving arithmetic mean incrementally.
*
* @param {Number} W - window size
* @returns {Function} method to compute a moving arithmetic mean incrementally
*/
function incrmmean( W ) {
	if ( !isInteger( W ) || W < 1 ) {
		throw new TypeError( 'incrmmean()::invalid input argument. Window size must be a positive integer.' );
	}
	var arr = new Array( W ),
		mu = 0,
		N = 0,
		i = -1,
		delta,
		tmp;
	/**
	* FUNCTION: incrmmean( [value] )
	*	If a `value` is provided, updates and returns the updated mean. If no `value` is provided, returns the current mean.
	*
	* @param {Number} [value] - value used to update the moving mean
	* @returns {Number} mean
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
			arr[ i ] = x;
			N += 1;
			delta = x - mu;
			mu += delta / N;
		} else {
			tmp = arr[ i ];
			arr[ i ] = x;
			delta = x - tmp;
			mu += delta / W;
		}
		return mu;
	};
} // end FUNCTION incrmmean()


// EXPORTS //

module.exports = incrmmean;
