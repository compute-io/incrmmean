'use strict';

var incrmmean = require( './../lib' );

// Initialize a method to calculate the moving mean incrementally:
var mmean = incrmmean( 5 );

// Simulate some data...
var value, mu;

console.log( '\nValue\tMean\n' );

for ( var i = 0; i < 100; i++ ) {

	value = Math.random() * 100;
	mu = mmean( value );

	console.log( '%d\t%d', value.toFixed( 4 ), mu.toFixed( 4 ) );
}
