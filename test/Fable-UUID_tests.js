/**
* Unit tests for the Fable UUID Wrappers
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

var Chai = require("chai");
var Expect = Chai.expect;
var Assert = Chai.assert;

// Create mock settings and logging objects
var _MockSettings = (
{
	Product: 'FableUUID',
	ProductVersion: '0.0.0',

	UUID: (
		{
			DataCenter: 0,
			Worker: 0
		})
});

suite
(
	'Fable-UUID',
	function()
	{
		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Object Sanity',
			function()
			{
				test
				(
					'initialize should build a happy little object',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new();
						Expect(tmpFableUUID)
							.to.be.an('object', 'Fable-UUID should initialize as an object directly from the require statement.');
					}
				);
				test
				(
					'basic class parameters',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new();
						Expect(tmpFableUUID).to.have.a.property('new')
							.that.is.a('function');
					}
				);
				test
				(
					'properly initialized class parameters',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new(_MockSettings);
						Expect(tmpFableUUID).to.have.a.property('new')
							.that.is.a('function');
						Expect(tmpFableUUID).to.have.a.property('getUUID')
							.that.is.a('function');
					}
				);
			}
		);
		suite
		(
			'Generation',
			function()
			{
				test
				(
					'Generating a UUID',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new(_MockSettings);
						var tmpUUID = tmpFableUUID.getUUID();
						Expect(tmpUUID)
							.to.be.a('string')
							.that.is.not.empty;
						Expect(tmpFableUUID.getUUID())
							.to.be.a('string')
							.to.not.equal(tmpUUID);
					}
				);
				test
				(
					'Bad settings object',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new(false);
						var tmpUUID = tmpFableUUID.getUUID();
						Expect(tmpUUID)
							.to.be.a('string')
							.that.is.not.empty;
						Expect(tmpFableUUID.getUUID())
							.to.be.a('string')
							.to.not.equal(tmpUUID);
					}
				);
				test
				(
					'Settings object without a UUID definition',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new({});
						var tmpUUID = tmpFableUUID.getUUID();
						Expect(tmpUUID)
							.to.be.a('string')
							.that.is.not.empty;
						Expect(tmpFableUUID.getUUID())
							.to.be.a('string')
							.to.not.equal(tmpUUID);
					}
				);
				test
				(
					'Settings object with a bad UUID definition',
					function()
					{
						var tmpFableUUID = require('../source/Fable-UUID.js').new({UUID: {DataCenter:'BAD',Worker:'JOB'}});
						var tmpUUID = tmpFableUUID.getUUID();
						Expect(tmpUUID)
							.to.be.a('string')
							.that.is.not.empty;
						Expect(tmpFableUUID.getUUID())
							.to.be.a('string')
							.to.not.equal(tmpUUID);
					}
				);
			}
		);
	}
);