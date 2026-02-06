# Browser Support

Fable-UUID works in both Node.js and browser environments. The module uses platform-specific random byte generators with automatic detection and fallbacks.

## Platform Detection

The module uses the `browser` field in `package.json` to swap the random byte generator at bundle time:

```json
{
    "browser": {
        "./source/Fable-UUID-Random.js": "./source/Fable-UUID-Random-Browser.js"
    }
}
```

Bundlers like Browserify and Webpack automatically resolve the browser-specific implementation when building for the browser.

## Node.js

In Node.js, random bytes are generated using the built-in `crypto` module:

```javascript
const crypto = require('crypto');
crypto.randomBytes(16);
```

This provides cryptographically secure random values from the operating system's entropy source.

## Browser Random Sources

The browser implementation uses a fallback chain to provide the best available randomness:

### 1. WebCrypto API (Preferred)

Modern browsers provide `crypto.getRandomValues()`, which generates cryptographically secure random values:

```javascript
const buffer = new Uint8Array(16);
crypto.getRandomValues(buffer);
```

**Supported in:** All modern browsers (Chrome, Firefox, Safari, Edge)

### 2. IE11 msCrypto

For Internet Explorer 11, the module falls back to the prefixed `msCrypto` implementation:

```javascript
const buffer = new Uint8Array(16);
window.msCrypto.getRandomValues(buffer);
```

### 3. Math.random() Fallback

If no cryptographic API is available, the module falls back to `Math.random()`. This provides lower quality randomness but ensures the module still works:

```javascript
// Generates 16 pseudo-random bytes using Math.random()
for (let i = 0; i < 16; i++) {
    buffer[i] = Math.random() * 0x100000000 >>> ((i & 0x03) << 3) & 0xff;
}
```

**Note:** This fallback uses `Math.random()` which is not cryptographically secure. For security-sensitive applications, ensure your target browsers support the WebCrypto API.

## Browser Shim

For non-bundled usage, a browser shim is provided that registers the module as a window global:

```html
<script src="path/to/Fable-UUID-Browser-Shim.js"></script>
<script>
    const uuidGenerator = new window.FableUUID();
    const id = uuidGenerator.getUUID();
</script>
```

The shim checks for the existence of `window.FableUUID` before registering, so it will not overwrite an existing global.

## Bundling

### Browserify

```bash
browserify -r fable-uuid -o bundle.js
```

Browserify automatically resolves the browser field in `package.json` and includes the browser-specific random byte generator.

### Webpack

Webpack also respects the `browser` field by default. No additional configuration is needed:

```javascript
// webpack.config.js - works with default settings
module.exports = {
    entry: './app.js',
    output: { filename: 'bundle.js' }
};
```

## Compatibility Summary

| Environment | Random Source | Cryptographic |
|-------------|-------------|---------------|
| Node.js | `crypto.randomBytes()` | Yes |
| Modern browsers | `crypto.getRandomValues()` | Yes |
| IE11 | `msCrypto.getRandomValues()` | Yes |
| Legacy browsers | `Math.random()` | No |
