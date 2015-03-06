/**
* Fable UUID Generator
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
* @module Fable UUID
*/

/**
* Fable Solution UUID Generation Main Class
*
* @class FableUUID
* @constructor
*/
var FableUUID = function()
{
	function createNew(pSettings, pLogProvider)
	{
		// This generates an object that requires you to construct it with new(Settings,Provider) before using it...
		if ((typeof(pSettings) !== 'object') || (typeof(pLogProvider) !== 'object'))
		{
			return {new: createNew};
		}

		// TODO: Validate pSettings and pLogProvider more.

		var _Settings = pSettings;
		var _Log = pLogProvider;

		var libFlakeIDGen = require('flake-idgen');
		var FlakeIDGenerator = new libFlakeIDGen({ datacenter:_Settings.UUID.DataCenter, worker:_Settings.UUID.Worker });
		var libIntFormat = require('biguint-format');

		_Log.trace('Fable UUID Generator Initialized with DataCenter #'+_Settings.UUID.DataCenter+' and Worker #'+_Settings.UUID.Worker);

		var getUUID = function()
		{
			return libIntFormat(FlakeIDGenerator.next(), 'hex', { prefix: '0x' });
		}

		/**
		* Container Object for our Factory Pattern
		*/
		var tmpNewFableUUID = (
		{
			getUUID: getUUID,
			new: createNew
		});

		return tmpNewFableUUID;
	}

	return createNew();
};

module.exports = new FableUUID();
