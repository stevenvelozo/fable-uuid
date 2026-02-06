# Configuration

Fable-UUID supports two generation modes controlled through a settings object passed to the constructor. In standard mode (the default), it generates RFC 4122 v4 UUIDs. In random mode, it generates customizable random strings.

## Default Configuration

```javascript
{
    UUIDModeRandom: false,
    UUIDLength: 8,
    UUIDDictionary: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
}
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `UUIDModeRandom` | boolean | `false` | Enable random string mode instead of RFC 4122 v4 UUID generation |
| `UUIDLength` | number | `8` | Length of the generated string in random mode (ignored in standard mode) |
| `UUIDDictionary` | string | `'0123456789abcdef...XYZ'` | Character set used for random mode generation (ignored in standard mode) |

## Standard Mode (Default)

When `UUIDModeRandom` is `false` (the default), the generator produces RFC 4122 version 4 UUIDs. These are 36-character strings with the format:

```
xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
```

Where `x` is a random hex digit and `y` is one of `8`, `9`, `a`, or `b` (per the RFC spec). The `4` indicates UUID version 4.

```javascript
const libFableUUID = require('fable-uuid');

const uuidGenerator = new libFableUUID();
console.log(uuidGenerator.getUUID());
// => "f47ac10b-58cc-4372-a567-0e02b2c3d479"
```

The `UUIDLength` and `UUIDDictionary` settings have no effect in standard mode.

## Random Mode

When `UUIDModeRandom` is `true`, the generator produces random strings using `Math.random()` to select characters from the configured dictionary.

### Default Random Mode

```javascript
const uuidGenerator = new libFableUUID({ UUIDModeRandom: true });
console.log(uuidGenerator.getUUID());
// => "a1B2c3D4" (8 characters from the full alphanumeric dictionary)
```

### Custom Length

```javascript
const uuidGenerator = new libFableUUID({
    UUIDModeRandom: true,
    UUIDLength: 5
});
console.log(uuidGenerator.getUUID());
// => "xK9mQ" (exactly 5 characters)
```

### Custom Dictionary

```javascript
const uuidGenerator = new libFableUUID({
    UUIDModeRandom: true,
    UUIDLength: 16,
    UUIDDictionary: '0123456789abcdef'
});
console.log(uuidGenerator.getUUID());
// => "a3f1b9c2e04d7a82" (16 hex characters)
```

### Minimal Dictionary

```javascript
const uuidGenerator = new libFableUUID({
    UUIDModeRandom: true,
    UUIDLength: 50,
    UUIDDictionary: 'ab'
});
console.log(uuidGenerator.getUUID());
// => "abbaababbaabbaab..." (50 characters using only 'a' and 'b')
```

## Uniqueness Considerations

**Standard mode** uses 122 bits of cryptographic randomness, providing extremely high uniqueness guarantees suitable for database keys, distributed systems, and security-sensitive applications.

**Random mode** uniqueness depends on your configuration:

| Dictionary Size | UUID Length | Possible Combinations |
|-----------------|------------|----------------------|
| 62 (default) | 8 (default) | ~218 trillion |
| 62 | 12 | ~3.2 x 10^21 |
| 16 (hex) | 8 | ~4.3 billion |
| 2 (binary) | 50 | ~1.1 x 10^15 |

For applications requiring guaranteed uniqueness, prefer standard mode or use sufficiently long random strings.

## Runtime Behavior

Configuration is set at construction time and cannot be changed after initialization. To switch between modes, create a new instance:

```javascript
// Standard mode instance
const standardUUID = new libFableUUID();

// Random mode instance
const randomUUID = new libFableUUID({ UUIDModeRandom: true, UUIDLength: 12 });

// Use both as needed
const dbKey = standardUUID.getUUID();
const shortCode = randomUUID.getUUID();
```
