/**
* Random Byte Generator
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/

let libCrypto = require('crypto');

class RandomBytes
{
	constructor()
	{
	}

	generate()
	{
		return libCrypto.randomBytes(16);
	}
}

module.exports = RandomBytes;
