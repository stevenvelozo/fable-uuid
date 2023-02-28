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

const libFableUUID = require('../source/Fable-UUID.js');

// Create mock settings and logging objects
var _MockSettings = (
{
	Product: 'FableUUID',
	ProductVersion: '0.0.0'
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
						var tmpFableUUID = new libFableUUID();
						Expect(tmpFableUUID)
							.to.be.an('object', 'Fable-UUID should initialize as an object directly from the require statement.');
					}
				);
				test
				(
					'legacy new() initialization should build a happy little object',
					function()
					{
						var tmpFableUUID = libFableUUID.new();
						Expect(tmpFableUUID)
							.to.be.an('object', 'Fable-UUID should initialize as an object directly from the require statement.');
					}
				);
				test
				(
					'basic class parameters',
					function()
					{
						var tmpFableUUID = new libFableUUID();
						Expect(tmpFableUUID).to.be.an('object');
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
						var tmpFableUUID = new libFableUUID();
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
						var tmpFableUUID = new libFableUUID();
						var tmpUUID = tmpFableUUID.getUUID();
						console.log(`Standard UUID Generated: [${tmpUUID}]`);
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
						var tmpFableUUID = new libFableUUID();
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
						var tmpFableUUID = new libFableUUID({UUID: {DataCenter:'BAD',Worker:'JOB'}});
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
					'Random bytes',
					function()
					{
						var tmpFableUUID = new libFableUUID({UUIDModeRandom: true});
						var tmpUUID = tmpFableUUID.getUUID();
						console.log(`Random UUID Generated: [${tmpUUID}]`);
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
					'Random bytes with length check',
					function()
					{
						var tmpFableUUID = new libFableUUID({UUIDModeRandom: true, UUIDLength: 5});
						var tmpUUID = tmpFableUUID.getUUID();
						console.log(`Very short Random UUID Generated: [${tmpUUID}]`);
						Expect(tmpUUID)
							.to.be.a('string')
							.that.is.not.empty;
						Expect(tmpUUID.length)
							.to.equal(5);
						Expect(tmpFableUUID.getUUID())
							.to.be.a('string')
							.to.not.equal(tmpUUID);
					}
				);
				test
				(
					'Random bytes custom dictionary',
					function()
					{
						var tmpFableUUID = new libFableUUID({UUIDModeRandom: true, UUIDLength: 50, UUIDDictionary: 'ab'});
						var tmpUUID = tmpFableUUID.getUUID();
						console.log(`Long Random UUID Generated with custom dictionary: [${tmpUUID}]`);
						Expect(tmpUUID)
							.to.be.a('string')
							.that.is.not.empty;
						Expect(tmpUUID.indexOf('a'))
							.to.not.equal(-1);
						Expect(tmpUUID.length)
							.to.equal(50);
						Expect(tmpFableUUID.getUUID())
							.to.be.a('string')
							.to.not.equal(tmpUUID);
					}
				);
			}
		);
	}
);