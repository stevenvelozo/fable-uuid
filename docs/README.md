# Fable-UUID

> A simple, flexible UUID generator for Node.js and browsers

Fable-UUID provides UUID generation as a lightweight Fable service provider. It supports both RFC 4122 version 4 compliant UUIDs using cryptographic random bytes, and a configurable random string mode for generating shorter or custom-format unique identifiers. It works in both Node.js and browser environments with automatic platform detection.

## Features

- **RFC 4122 v4 UUIDs** - Standards-compliant UUID generation using cryptographic random bytes
- **Random String Mode** - Configurable length and character dictionary for custom identifiers
- **Cross-Platform** - Works in Node.js (via `crypto`) and browsers (via WebCrypto API with fallbacks)
- **Fable Service Provider** - Integrates as a service in the Fable ecosystem with `serviceType: 'UUID'`
- **Performance Optimized** - Pre-built hex lookup table for efficient byte-to-hex conversion
- **Minimal Dependencies** - Only depends on `fable-serviceproviderbase`

## Quick Start

```javascript
const libFableUUID = require('fable-uuid');

// Create a UUID generator with default settings (v4 mode)
const uuidGenerator = new libFableUUID();

// Generate a standard v4 UUID
const id = uuidGenerator.getUUID();
// => "550e8400-e29b-41d4-a716-446655440000"
```

## Installation

```bash
npm install fable-uuid
```

## Generation Modes

### Standard Mode (Default)

Generates RFC 4122 version 4 UUIDs with cryptographic randomness. These are 36-character strings in the format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.

```javascript
const uuidGenerator = new libFableUUID();
console.log(uuidGenerator.getUUID());
// => "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

### Random Mode

Generates random strings of configurable length from a customizable character dictionary. Useful when you need shorter identifiers or specific character sets.

```javascript
const uuidGenerator = new libFableUUID({
    UUIDModeRandom: true,
    UUIDLength: 12,
    UUIDDictionary: '0123456789abcdef'
});
console.log(uuidGenerator.getUUID());
// => "a3f1b9c2e04d"
```

## Documentation

- [Configuration](configuration.md) - All configuration options and generation modes
- [API Reference](api.md) - Complete method documentation
- [Browser Support](browser-support.md) - Cross-platform compatibility details
- [Changelog](changelog.md) - Version history

## Related Packages

- [fable](https://github.com/stevenvelozo/fable) - Service provider framework
- [fable-serviceproviderbase](https://github.com/stevenvelozo/fable-serviceproviderbase) - Base class for Fable services
- [fable-log](https://github.com/stevenvelozo/fable-log) - Logging service for Fable
- [fable-settings](https://github.com/stevenvelozo/fable-settings) - Settings management for Fable
