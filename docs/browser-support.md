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
// Node.js reference — this won't run in the browser playground (the
// 'crypto' module isn't available via require here), so we just print
// what the equivalent Node code looks like.
console.info("In Node.js: const crypto = require('crypto'); crypto.randomBytes(16);");
```

This provides cryptographically secure random values from the operating system's entropy source.

## Browser Random Sources

The browser implementation uses a fallback chain to provide the best available randomness:

### 1. WebCrypto API (Preferred)

Modern browsers provide `crypto.getRandomValues()`, which generates cryptographically secure random values:

```javascript
const buffer = new Uint8Array(16);
crypto.getRandomValues(buffer);
console.log('16 random bytes:', Array.from(buffer));
```

**Supported in:** All modern browsers (Chrome, Firefox, Safari, Edge)

### 2. IE11 msCrypto

For Internet Explorer 11, the module falls back to the prefixed `msCrypto` implementation:

```javascript
// IE11-only — `window.msCrypto` doesn't exist in modern browsers, so
// gate the call with a feature check and print a friendly note in the
// playground (which is running in a modern browser).
const buffer = new Uint8Array(16);
if (typeof window !== 'undefined' && window.msCrypto)
{
    window.msCrypto.getRandomValues(buffer);
    console.log('Filled via msCrypto:', Array.from(buffer));
}
else
{
    console.info('window.msCrypto is not present in this browser (only IE11 had it).');
}
```

### 3. Math.random() Fallback

If no cryptographic API is available, the module falls back to `Math.random()`. This provides lower quality randomness but ensures the module still works:

```javascript
// Generates 16 pseudo-random bytes using Math.random()
const buffer = new Uint8Array(16);
for (let i = 0; i < 16; i++)
{
    buffer[i] = Math.random() * 0x100000000 >>> ((i & 0x03) << 3) & 0xff;
}
console.log('Math.random fallback bytes:', Array.from(buffer));
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
// webpack.config.js — this is a build-time config, not a runnable
// snippet, so we just print it as reference text.
const webpackConfig = {
    entry: './app.js',
    output: { filename: 'bundle.js' }
};
console.info('Webpack config:', webpackConfig);
```

## Compatibility Summary

| Environment | Random Source | Cryptographic |
|-------------|-------------|---------------|
| Node.js | `crypto.randomBytes()` | Yes |
| Modern browsers | `crypto.getRandomValues()` | Yes |
| IE11 | `msCrypto.getRandomValues()` | Yes |
| Legacy browsers | `Math.random()` | No |
