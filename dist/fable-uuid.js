(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
* Random Byte Generator - Browser version
*
* @license MIT
*
* @author Steven Velozo <steven@velozo.com>
*/

// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
class RandomBytes
{
	constructor()
	{

		// getRandomValues needs to be invoked in a context where "this" is a Crypto
		// implementation. Also, find the complete implementation of crypto on IE11.
		this.getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      		(typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));
	}

	// WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
	generateWhatWGBytes()
	{
		let tmpBuffer = new Uint8Array(16); // eslint-disable-line no-undef

		this.getRandomValues(tmpBuffer);
		return tmpBuffer;
	}

	// Math.random()-based (RNG)
	generateRandomBytes()
	{
		//
		// If all else fails, use Math.random().  It's fast, but is of unspecified
		// quality.
		let tmpBuffer = new Uint8Array(16); // eslint-disable-line no-undef

		for (let i = 0, tmpValue; i < 16; i++)
		{
			if ((i & 0x03) === 0)
			{
				tmpValue = Math.random() * 0x100000000;
			}

			tmpBuffer[i] = tmpValue >>> ((i & 0x03) << 3) & 0xff;
		}

		return tmpBuffer;
	}

	generate()
	{
		if (this.getRandomValues)
		{
			return generateWhatWGBytes();
		}
		else
		{
			return generateRandomBytes();
		}
	}
}

module.exports = RandomBytes;

},{}],2:[function(require,module,exports){
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

var libRandomByteGenerator = require('./Fable-UUID-Random.js')

class FableUUID
{
	constructor(pSettings)
	{
		// Determine if the module is in "Random UUID Mode" which means just use the random character function rather than the v4 random UUID spec.
		// Note this allows UUIDs of various lengths (including very short ones) although guaranteed uniqueness goes downhill fast.
		this._UUIDModeRandom = (typeof(pSettings) === 'object') && (pSettings.hasOwnProperty('UUIDModeRandom')) ? (pSettings.UUIDModeRandom == true) : false;
		// These two properties are only useful if we are in Random mode.  Otherwise it generates a v4 spec
		// Length for "Random UUID Mode" is set -- if not set it to 8
		this._UUIDLength = (typeof(pSettings) === 'object') && (pSettings.hasOwnProperty('UUIDLength')) ? (pSettings.UUIDLength + 0) : 8;
		// Dictionary for "Random UUID Mode"
		this._UUIDRandomDictionary = (typeof(pSettings) === 'object') && (pSettings.hasOwnProperty('UUIDDictionary')) ? (pSettings.UUIDDictionary + 0) : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		this.randomByteGenerator = new libRandomByteGenerator();

		// Lookup table for hex codes
		this._HexLookup = [];
		for (let i = 0; i < 256; ++i)
		{
			this._HexLookup[i] = (i + 0x100).toString(16).substr(1);
		}
	}

	// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
	bytesToUUID(pBuffer)
	{
		let i = 0;
		// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
		return ([
					this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], 
					this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-',
					this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-',
					this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-',
					this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-',
					this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]]
				]).join('');
	}

	// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
	generateUUIDv4()
	{
		let tmpBuffer = new Array(16);
		var tmpRandomBytes = this.randomByteGenerator.generate();

		// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
		tmpRandomBytes[6] = (tmpRandomBytes[6] & 0x0f) | 0x40;
		tmpRandomBytes[8] = (tmpRandomBytes[8] & 0x3f) | 0x80;

		return this.bytesToUUID(tmpRandomBytes);
	}

	// Simple random UUID generation
	generateRandom()
	{
		let tmpUUID = '';

		for (let i = 0; i < this._UUIDLength; i++)
		{
			tmpUUID += this._UUIDRandomDictionary.charAt(Math.floor(Math.random() * (this._UUIDRandomDictionary.length-1)));
		}

		return tmpUUID;
	}

	// Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
	getUUID()
	{
		if (this._UUIDModeRandom)
		{
			return this.generateRandom();
		}
		else
		{
			return this.generateUUIDv4();
		}
	}
}

// This is for backwards compatibility
function autoConstruct(pSettings)
{
	return new FableUUID(pSettings);
}


module.exports = {new:autoConstruct, FableUUID:FableUUID};

},{"./Fable-UUID-Random.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvRmFibGUtVVVJRC1SYW5kb20tQnJvd3Nlci5qcyIsInNvdXJjZS9GYWJsZS1VVUlELmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiogUmFuZG9tIEJ5dGUgR2VuZXJhdG9yIC0gQnJvd3NlciB2ZXJzaW9uXG4qXG4qIEBsaWNlbnNlIE1JVFxuKlxuKiBAYXV0aG9yIFN0ZXZlbiBWZWxvem8gPHN0ZXZlbkB2ZWxvem8uY29tPlxuKi9cblxuLy8gQWRhcHRlZCBmcm9tIG5vZGUtdXVpZCAoaHR0cHM6Ly9naXRodWIuY29tL2tlbGVrdGl2L25vZGUtdXVpZClcbi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG5jbGFzcyBSYW5kb21CeXRlc1xue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblxuXHRcdC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0b1xuXHRcdC8vIGltcGxlbWVudGF0aW9uLiBBbHNvLCBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gb24gSUUxMS5cblx0XHR0aGlzLmdldFJhbmRvbVZhbHVlcyA9ICh0eXBlb2YoY3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pKSB8fFxuICAgICAgICAgICAgICAgICAgICAgIFx0XHQodHlwZW9mKG1zQ3J5cHRvKSAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKSk7XG5cdH1cblxuXHQvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cblx0Z2VuZXJhdGVXaGF0V0dCeXRlcygpXG5cdHtcblx0XHRsZXQgdG1wQnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblx0XHR0aGlzLmdldFJhbmRvbVZhbHVlcyh0bXBCdWZmZXIpO1xuXHRcdHJldHVybiB0bXBCdWZmZXI7XG5cdH1cblxuXHQvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG5cdGdlbmVyYXRlUmFuZG9tQnl0ZXMoKVxuXHR7XG5cdFx0Ly9cblx0XHQvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuXHRcdC8vIHF1YWxpdHkuXG5cdFx0bGV0IHRtcEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cdFx0Zm9yIChsZXQgaSA9IDAsIHRtcFZhbHVlOyBpIDwgMTY7IGkrKylcblx0XHR7XG5cdFx0XHRpZiAoKGkgJiAweDAzKSA9PT0gMClcblx0XHRcdHtcblx0XHRcdFx0dG1wVmFsdWUgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG5cdFx0XHR9XG5cblx0XHRcdHRtcEJ1ZmZlcltpXSA9IHRtcFZhbHVlID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRtcEJ1ZmZlcjtcblx0fVxuXG5cdGdlbmVyYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLmdldFJhbmRvbVZhbHVlcylcblx0XHR7XG5cdFx0XHRyZXR1cm4gZ2VuZXJhdGVXaGF0V0dCeXRlcygpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cmV0dXJuIGdlbmVyYXRlUmFuZG9tQnl0ZXMoKTtcblx0XHR9XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSYW5kb21CeXRlcztcbiIsIi8qKlxuKiBGYWJsZSBVVUlEIEdlbmVyYXRvclxuKlxuKiBAbGljZW5zZSBNSVRcbipcbiogQGF1dGhvciBTdGV2ZW4gVmVsb3pvIDxzdGV2ZW5AdmVsb3pvLmNvbT5cbiogQG1vZHVsZSBGYWJsZSBVVUlEXG4qL1xuXG4vKipcbiogRmFibGUgU29sdXRpb24gVVVJRCBHZW5lcmF0aW9uIE1haW4gQ2xhc3NcbipcbiogQGNsYXNzIEZhYmxlVVVJRFxuKiBAY29uc3RydWN0b3JcbiovXG5cbnZhciBsaWJSYW5kb21CeXRlR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9GYWJsZS1VVUlELVJhbmRvbS5qcycpXG5cbmNsYXNzIEZhYmxlVVVJRFxue1xuXHRjb25zdHJ1Y3RvcihwU2V0dGluZ3MpXG5cdHtcblx0XHQvLyBEZXRlcm1pbmUgaWYgdGhlIG1vZHVsZSBpcyBpbiBcIlJhbmRvbSBVVUlEIE1vZGVcIiB3aGljaCBtZWFucyBqdXN0IHVzZSB0aGUgcmFuZG9tIGNoYXJhY3RlciBmdW5jdGlvbiByYXRoZXIgdGhhbiB0aGUgdjQgcmFuZG9tIFVVSUQgc3BlYy5cblx0XHQvLyBOb3RlIHRoaXMgYWxsb3dzIFVVSURzIG9mIHZhcmlvdXMgbGVuZ3RocyAoaW5jbHVkaW5nIHZlcnkgc2hvcnQgb25lcykgYWx0aG91Z2ggZ3VhcmFudGVlZCB1bmlxdWVuZXNzIGdvZXMgZG93bmhpbGwgZmFzdC5cblx0XHR0aGlzLl9VVUlETW9kZVJhbmRvbSA9ICh0eXBlb2YocFNldHRpbmdzKSA9PT0gJ29iamVjdCcpICYmIChwU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ1VVSURNb2RlUmFuZG9tJykpID8gKHBTZXR0aW5ncy5VVUlETW9kZVJhbmRvbSA9PSB0cnVlKSA6IGZhbHNlO1xuXHRcdC8vIFRoZXNlIHR3byBwcm9wZXJ0aWVzIGFyZSBvbmx5IHVzZWZ1bCBpZiB3ZSBhcmUgaW4gUmFuZG9tIG1vZGUuICBPdGhlcndpc2UgaXQgZ2VuZXJhdGVzIGEgdjQgc3BlY1xuXHRcdC8vIExlbmd0aCBmb3IgXCJSYW5kb20gVVVJRCBNb2RlXCIgaXMgc2V0IC0tIGlmIG5vdCBzZXQgaXQgdG8gOFxuXHRcdHRoaXMuX1VVSURMZW5ndGggPSAodHlwZW9mKHBTZXR0aW5ncykgPT09ICdvYmplY3QnKSAmJiAocFNldHRpbmdzLmhhc093blByb3BlcnR5KCdVVUlETGVuZ3RoJykpID8gKHBTZXR0aW5ncy5VVUlETGVuZ3RoICsgMCkgOiA4O1xuXHRcdC8vIERpY3Rpb25hcnkgZm9yIFwiUmFuZG9tIFVVSUQgTW9kZVwiXG5cdFx0dGhpcy5fVVVJRFJhbmRvbURpY3Rpb25hcnkgPSAodHlwZW9mKHBTZXR0aW5ncykgPT09ICdvYmplY3QnKSAmJiAocFNldHRpbmdzLmhhc093blByb3BlcnR5KCdVVUlERGljdGlvbmFyeScpKSA/IChwU2V0dGluZ3MuVVVJRERpY3Rpb25hcnkgKyAwKSA6ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG5cblx0XHR0aGlzLnJhbmRvbUJ5dGVHZW5lcmF0b3IgPSBuZXcgbGliUmFuZG9tQnl0ZUdlbmVyYXRvcigpO1xuXG5cdFx0Ly8gTG9va3VwIHRhYmxlIGZvciBoZXggY29kZXNcblx0XHR0aGlzLl9IZXhMb29rdXAgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKVxuXHRcdHtcblx0XHRcdHRoaXMuX0hleExvb2t1cFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gQWRhcHRlZCBmcm9tIG5vZGUtdXVpZCAoaHR0cHM6Ly9naXRodWIuY29tL2tlbGVrdGl2L25vZGUtdXVpZClcblx0Ynl0ZXNUb1VVSUQocEJ1ZmZlcilcblx0e1xuXHRcdGxldCBpID0gMDtcblx0XHQvLyBqb2luIHVzZWQgdG8gZml4IG1lbW9yeSBpc3N1ZSBjYXVzZWQgYnkgY29uY2F0ZW5hdGlvbjogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzE3NSNjNFxuXHRcdHJldHVybiAoW1xuXHRcdFx0XHRcdHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCB0aGlzLl9IZXhMb29rdXBbcEJ1ZmZlcltpKytdXSwgXG5cdFx0XHRcdFx0dGhpcy5fSGV4TG9va3VwW3BCdWZmZXJbaSsrXV0sIHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCAnLScsXG5cdFx0XHRcdFx0dGhpcy5fSGV4TG9va3VwW3BCdWZmZXJbaSsrXV0sIHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCAnLScsXG5cdFx0XHRcdFx0dGhpcy5fSGV4TG9va3VwW3BCdWZmZXJbaSsrXV0sIHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCAnLScsXG5cdFx0XHRcdFx0dGhpcy5fSGV4TG9va3VwW3BCdWZmZXJbaSsrXV0sIHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCAnLScsXG5cdFx0XHRcdFx0dGhpcy5fSGV4TG9va3VwW3BCdWZmZXJbaSsrXV0sIHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCB0aGlzLl9IZXhMb29rdXBbcEJ1ZmZlcltpKytdXSwgdGhpcy5fSGV4TG9va3VwW3BCdWZmZXJbaSsrXV0sIHRoaXMuX0hleExvb2t1cFtwQnVmZmVyW2krK11dLCB0aGlzLl9IZXhMb29rdXBbcEJ1ZmZlcltpKytdXVxuXHRcdFx0XHRdKS5qb2luKCcnKTtcblx0fVxuXG5cdC8vIEFkYXB0ZWQgZnJvbSBub2RlLXV1aWQgKGh0dHBzOi8vZ2l0aHViLmNvbS9rZWxla3Rpdi9ub2RlLXV1aWQpXG5cdGdlbmVyYXRlVVVJRHY0KClcblx0e1xuXHRcdGxldCB0bXBCdWZmZXIgPSBuZXcgQXJyYXkoMTYpO1xuXHRcdHZhciB0bXBSYW5kb21CeXRlcyA9IHRoaXMucmFuZG9tQnl0ZUdlbmVyYXRvci5nZW5lcmF0ZSgpO1xuXG5cdFx0Ly8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXHRcdHRtcFJhbmRvbUJ5dGVzWzZdID0gKHRtcFJhbmRvbUJ5dGVzWzZdICYgMHgwZikgfCAweDQwO1xuXHRcdHRtcFJhbmRvbUJ5dGVzWzhdID0gKHRtcFJhbmRvbUJ5dGVzWzhdICYgMHgzZikgfCAweDgwO1xuXG5cdFx0cmV0dXJuIHRoaXMuYnl0ZXNUb1VVSUQodG1wUmFuZG9tQnl0ZXMpO1xuXHR9XG5cblx0Ly8gU2ltcGxlIHJhbmRvbSBVVUlEIGdlbmVyYXRpb25cblx0Z2VuZXJhdGVSYW5kb20oKVxuXHR7XG5cdFx0bGV0IHRtcFVVSUQgPSAnJztcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fVVVJRExlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdHRtcFVVSUQgKz0gdGhpcy5fVVVJRFJhbmRvbURpY3Rpb25hcnkuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLl9VVUlEUmFuZG9tRGljdGlvbmFyeS5sZW5ndGgtMSkpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdG1wVVVJRDtcblx0fVxuXG5cdC8vIEFkYXB0ZWQgZnJvbSBub2RlLXV1aWQgKGh0dHBzOi8vZ2l0aHViLmNvbS9rZWxla3Rpdi9ub2RlLXV1aWQpXG5cdGdldFVVSUQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX1VVSURNb2RlUmFuZG9tKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzLmdlbmVyYXRlUmFuZG9tKCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZW5lcmF0ZVVVSUR2NCgpO1xuXHRcdH1cblx0fVxufVxuXG4vLyBUaGlzIGlzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuZnVuY3Rpb24gYXV0b0NvbnN0cnVjdChwU2V0dGluZ3MpXG57XG5cdHJldHVybiBuZXcgRmFibGVVVUlEKHBTZXR0aW5ncyk7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7bmV3OmF1dG9Db25zdHJ1Y3QsIEZhYmxlVVVJRDpGYWJsZVVVSUR9O1xuIl19
