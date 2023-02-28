(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.FableUUID = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      /**
      * Simple browser shim loader - assign the npm module to a window global automatically
      *
      * @license MIT
      * @author <steven@velozo.com>
      */
      var libNPMModuleWrapper = require('./Fable-UUID.js');
      if (typeof window === 'object' && !window.hasOwnProperty('FableUUID')) {
        window.FableUUID = libNPMModuleWrapper;
      }
      module.exports = libNPMModuleWrapper;
    }, {
      "./Fable-UUID.js": 3
    }],
    2: [function (require, module, exports) {
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
      class RandomBytes {
        constructor() {
          // getRandomValues needs to be invoked in a context where "this" is a Crypto
          // implementation. Also, find the complete implementation of crypto on IE11.
          this.getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
        }

        // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
        generateWhatWGBytes() {
          let tmpBuffer = new Uint8Array(16); // eslint-disable-line no-undef

          this.getRandomValues(tmpBuffer);
          return tmpBuffer;
        }

        // Math.random()-based (RNG)
        generateRandomBytes() {
          // If all else fails, use Math.random().  It's fast, but is of unspecified
          // quality.
          let tmpBuffer = new Uint8Array(16); // eslint-disable-line no-undef

          for (let i = 0, tmpValue; i < 16; i++) {
            if ((i & 0x03) === 0) {
              tmpValue = Math.random() * 0x100000000;
            }
            tmpBuffer[i] = tmpValue >>> ((i & 0x03) << 3) & 0xff;
          }
          return tmpBuffer;
        }
        generate() {
          if (this.getRandomValues) {
            return this.generateWhatWGBytes();
          } else {
            return this.generateRandomBytes();
          }
        }
      }
      module.exports = RandomBytes;
    }, {}],
    3: [function (require, module, exports) {
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

      var libRandomByteGenerator = require('./Fable-UUID-Random.js');
      class FableUUID {
        constructor(pSettings) {
          // Determine if the module is in "Random UUID Mode" which means just use the random character function rather than the v4 random UUID spec.
          // Note this allows UUIDs of various lengths (including very short ones) although guaranteed uniqueness goes downhill fast.
          this._UUIDModeRandom = typeof pSettings === 'object' && pSettings.hasOwnProperty('UUIDModeRandom') ? pSettings.UUIDModeRandom == true : false;
          // These two properties are only useful if we are in Random mode.  Otherwise it generates a v4 spec
          // Length for "Random UUID Mode" is set -- if not set it to 8
          this._UUIDLength = typeof pSettings === 'object' && pSettings.hasOwnProperty('UUIDLength') ? pSettings.UUIDLength + 0 : 8;
          // Dictionary for "Random UUID Mode"
          this._UUIDRandomDictionary = typeof pSettings === 'object' && pSettings.hasOwnProperty('UUIDDictionary') ? pSettings.UUIDDictionary + 0 : '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          this.randomByteGenerator = new libRandomByteGenerator();

          // Lookup table for hex codes
          this._HexLookup = [];
          for (let i = 0; i < 256; ++i) {
            this._HexLookup[i] = (i + 0x100).toString(16).substr(1);
          }
        }

        // Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
        bytesToUUID(pBuffer) {
          let i = 0;
          // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
          return [this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-', this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-', this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-', this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], '-', this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]], this._HexLookup[pBuffer[i++]]].join('');
        }

        // Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
        generateUUIDv4() {
          let tmpBuffer = new Array(16);
          var tmpRandomBytes = this.randomByteGenerator.generate();

          // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
          tmpRandomBytes[6] = tmpRandomBytes[6] & 0x0f | 0x40;
          tmpRandomBytes[8] = tmpRandomBytes[8] & 0x3f | 0x80;
          return this.bytesToUUID(tmpRandomBytes);
        }

        // Simple random UUID generation
        generateRandom() {
          let tmpUUID = '';
          for (let i = 0; i < this._UUIDLength; i++) {
            tmpUUID += this._UUIDRandomDictionary.charAt(Math.floor(Math.random() * (this._UUIDRandomDictionary.length - 1)));
          }
          return tmpUUID;
        }

        // Adapted from node-uuid (https://github.com/kelektiv/node-uuid)
        getUUID() {
          if (this._UUIDModeRandom) {
            return this.generateRandom();
          } else {
            return this.generateUUIDv4();
          }
        }
      }

      // This is for backwards compatibility
      function autoConstruct(pSettings) {
        return new FableUUID(pSettings);
      }
      module.exports = FableUUID;
      module.exports.new = autoConstruct;
    }, {
      "./Fable-UUID-Random.js": 2
    }]
  }, {}, [1])(1);
});