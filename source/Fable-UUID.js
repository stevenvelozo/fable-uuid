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
		if (typeof(pLogProvider) !== 'object')
		{
			return {new: createNew};
		}

		var _Settings = pSettings;
		var _Log = pLogProvider;

		// Provide sane defaults for data center and worker.
		var _DataCenter = 0;
		var _Worker = 0;

		// Validate settings a lot
		if ((typeof(_Settings) === 'object') && 
			(typeof(_Settings.UUID) === 'object'))
		{
			if (0 === _Settings.UUID.DataCenter % (!isNaN(parseFloat(_Settings.UUID.DataCenter)) && 0 <= ~~_Settings.UUID.DataCenter))
			{
				_DataCenter = _Settings.UUID.DataCenter;
			}
			if (0 === _Settings.UUID.Worker % (!isNaN(parseFloat(_Settings.UUID.Worker)) && 0 <= ~~_Settings.UUID.Worker))
			{
				_Worker = _Settings.UUID.Worker;
			}
		}

		var libFlakeIDGen = require('flake-idgen');
		var FlakeIDGenerator = new libFlakeIDGen({ datacenter:_DataCenter, worker:_Worker });
		var libIntFormat = require('biguint-format');

		_Log.trace('Fable UUID Generator Initialized with DataCenter #'+_DataCenter+' and Worker #'+_Worker);

		/***
		 * Return a nice string UUID
		 */
		var getUUID = function()
		{
			return libIntFormat(FlakeIDGenerator.next(), 'hex', { prefix: '0x' });
		};

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
