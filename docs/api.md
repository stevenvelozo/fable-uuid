# API Reference

Complete method documentation for the `FableUUID` class.

## Constructor

### `new FableUUID(pSettings, pServiceHash)`

Creates a new UUID generator instance.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `pSettings` | Object | No | Configuration object (see [Configuration](configuration.md)) |
| `pServiceHash` | Object | No | Service provider hash reference for Fable integration |

**Example:**

```javascript
const libFableUUID = require('fable-uuid');

// No configuration (standard v4 mode)
const uuid = new libFableUUID();

// With configuration
const uuid = new libFableUUID({
    UUIDModeRandom: true,
    UUIDLength: 12
});
```

### `FableUUID.new(pSettings)`

Legacy factory function for backwards compatibility. Creates and returns a new `FableUUID` instance.

```javascript
const libFableUUID = require('fable-uuid');
const uuid = libFableUUID.new({ UUIDModeRandom: true });
```

## Methods

### `getUUID()`

The primary method for generating unique identifiers. Returns either a standard v4 UUID or a random string depending on the configured mode.

**Returns:** `string` - A unique identifier

**Behavior:**
- In standard mode: delegates to `generateUUIDv4()`
- In random mode: delegates to `generateRandom()`

```javascript
const uuid = new libFableUUID();
const id = uuid.getUUID();
// Standard mode => "f47ac10b-58cc-4372-a567-0e02b2c3d479"

const randomUuid = new libFableUUID({ UUIDModeRandom: true });
const shortId = randomUuid.getUUID();
// Random mode => "a1B2c3D4"
```

### `generateUUIDv4()`

Generates an RFC 4122 version 4 UUID using 16 cryptographic random bytes. Sets the version bits (byte 6) and reserved bits (byte 8) per the specification.

**Returns:** `string` - A 36-character UUID in the format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`

```javascript
const uuid = new libFableUUID();
const id = uuid.generateUUIDv4();
// => "550e8400-e29b-41d4-a716-446655440000"
```

**Implementation details:**
- Generates 16 random bytes from the platform's cryptographic random source
- Sets `bytes[6] = (bytes[6] & 0x0f) | 0x40` for version 4
- Sets `bytes[8] = (bytes[8] & 0x3f) | 0x80` for RFC 4122 variant
- Converts bytes to hex string using a pre-built lookup table

### `generateRandom()`

Generates a random string using `Math.random()` to select characters from the configured dictionary.

**Returns:** `string` - A random string of length `UUIDLength` from characters in `UUIDDictionary`

```javascript
const uuid = new libFableUUID({
    UUIDModeRandom: true,
    UUIDLength: 10,
    UUIDDictionary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
});
const id = uuid.generateRandom();
// => "KQMXWFJTNR"
```

### `bytesToUUID(pBuffer)`

Converts a 16-byte buffer into a formatted UUID string. Used internally by `generateUUIDv4()`.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `pBuffer` | Array/TypedArray | A 16-byte buffer of random values |

**Returns:** `string` - A 36-character UUID string with hyphens in the standard positions (8-4-4-4-12)

```javascript
const uuid = new libFableUUID();
const bytes = new Uint8Array(16);
// ... fill with values ...
const formatted = uuid.bytesToUUID(bytes);
// => "00000000-0000-0000-0000-000000000000"
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `serviceType` | string | Always `'UUID'` - identifies this as a UUID service provider |
| `_UUIDModeRandom` | boolean | Whether random mode is active |
| `_UUIDLength` | number | Configured random string length |
| `_UUIDRandomDictionary` | string | Configured character dictionary |
| `_HexLookup` | Array | Pre-built hex conversion table (256 entries) |
| `randomByteGenerator` | Object | Platform-specific random byte generator instance |

## Module Exports

```javascript
const libFableUUID = require('fable-uuid');

// The class itself
libFableUUID              // FableUUID class (use with `new`)

// Legacy factory
libFableUUID.new(settings) // Returns a new FableUUID instance
```
