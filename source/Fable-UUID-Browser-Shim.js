/**
* Simple browser shim loader - assign the npm module to a window global automatically
*
* @license MIT
* @author <steven@velozo.com>
*/
var libNPMModuleWrapper = require('./Fable-UUID.js');

if ((typeof(window) === 'object') && !window.hasOwnProperty('FableUUID'))
{
	window.FableUUID = libNPMModuleWrapper;
}

module.exports = libNPMModuleWrapper;