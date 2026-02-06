# Fable-UUID

A simple, flexible UUID generator for Node.js and browsers.

[![Coverage Status](https://coveralls.io/repos/stevenvelozo/fable-uuid/badge.svg?branch=master)](https://coveralls.io/r/stevenvelozo/fable-uuid?branch=master) [![Build Status](https://travis-ci.org/stevenvelozo/fable-uuid.svg?branch=master)](https://travis-ci.org/stevenvelozo/fable-uuid)

## Features

- **RFC 4122 v4 UUIDs** - Standards-compliant UUID generation using cryptographic random bytes
- **Random String Mode** - Configurable length and character dictionary for custom identifiers
- **Cross-Platform** - Works in Node.js (via `crypto`) and browsers (via WebCrypto API with fallbacks)
- **Fable Service Provider** - Integrates as a service in the Fable ecosystem
- **Minimal Dependencies** - Only depends on `fable-serviceproviderbase`

## Installation

```bash
npm install fable-uuid
```

## Quick Start

```javascript
const libFableUUID = require('fable-uuid');

// Standard v4 UUID
const uuid = new libFableUUID();
console.log(uuid.getUUID());
// => "f47ac10b-58cc-4372-a567-0e02b2c3d479"

// Random string mode
const shortId = new libFableUUID({ UUIDModeRandom: true, UUIDLength: 12 });
console.log(shortId.getUUID());
// => "a1B2c3D4e5F6"
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `UUIDModeRandom` | boolean | `false` | Enable random string mode instead of v4 UUIDs |
| `UUIDLength` | number | `8` | Length of generated string in random mode |
| `UUIDDictionary` | string | `'0123456789abcdef...XYZ'` | Character set for random mode |

## Documentation

Full documentation is available at **[stevenvelozo.github.io/fable-uuid](https://stevenvelozo.github.io/fable-uuid/)**.

- [Configuration Guide](https://stevenvelozo.github.io/fable-uuid/#/configuration)
- [API Reference](https://stevenvelozo.github.io/fable-uuid/#/api)
- [Browser Support](https://stevenvelozo.github.io/fable-uuid/#/browser-support)

## Related Packages

- [fable](https://github.com/stevenvelozo/fable) - Service provider framework
- [fable-serviceproviderbase](https://github.com/stevenvelozo/fable-serviceproviderbase) - Base class for Fable services
- [fable-log](https://github.com/stevenvelozo/fable-log) - Logging service for Fable
- [fable-settings](https://github.com/stevenvelozo/fable-settings) - Settings management for Fable

## License

MIT
