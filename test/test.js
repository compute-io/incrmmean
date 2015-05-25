/* global describe, require, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	incrmmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-incrmmean', function tests() {

	it( 'should export a function', function test() {
		expect( incrmmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer', function test() {
		var values = [
			'5',
			-5,
			0,
			Math.PI,
			true,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				incrmmean( value );
			};
		}
	});

	it( 'should return a function', function test() {
		expect( incrmmean( 3 ) ).to.be.a( 'function' );
	});

	it( 'should compute a moving arithmetic mean incrementally', function test() {
		var data,
			N,
			d,
			expected,
			actual,
			mmean;

		data = [ 2, 3, 2, 4, 3, 4 ];
		N = data.length;

		mmean = incrmmean( 3 );

		actual = new Array( N );
		for ( var i = 0; i < N; i++ ) {
			d = data[ i ];
			actual[ i ] = mmean( d );
		}

		expected = [ 2, 2.5, 7/3, 3, 3, 11/3 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return the current moving mean if provided no arguments', function test() {
		var data = [ 2, 3, 5 ],
			mmean = incrmmean( 2 );
		for ( var i = 0; i < data.length; i++ ) {
			mmean( data[ i ] );
		}
		assert.strictEqual( mmean(), 4 );
	});

	it( 'should return null if asked for a moving mean when not having received any data', function test() {
		var mmean = incrmmean( 3 );
		assert.isNull( mmean() );
	});

});
