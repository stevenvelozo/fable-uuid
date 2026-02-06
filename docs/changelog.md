# Changelog

All notable changes to Fable-UUID are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.x] - Current

### Changed
- Refactored to extend `fable-serviceproviderbase` CoreServiceProviderBase
- Service type set to `'UUID'` for Fable service provider integration
- Module exports both the class and a legacy `new()` factory function

## [3.0.0] - ES6 Class Refactor

### Changed
- Complete rewrite as an ES6 class extending `CoreServiceProviderBase`
- Replaced external UUID dependencies with internal implementation
- Added `fable-serviceproviderbase` as the sole runtime dependency

### Added
- `generateUUIDv4()` method for explicit v4 UUID generation
- `generateRandom()` method for random string generation
- `bytesToUUID()` helper for byte buffer conversion
- Pre-built hex lookup table for performance
- Browser-specific random byte generator with WebCrypto support
- Browser shim for global `window.FableUUID` registration
- `UUIDModeRandom` configuration for random string mode
- `UUIDLength` configuration for custom random string lengths
- `UUIDDictionary` configuration for custom character sets

## [2.x] - Previous Major

### Core Features
- UUID generation with external dependencies
- Basic Node.js support

## [1.0.0] - 2015-03-05

### Added
- Initial project creation
- Basic UUID generation

## [1.0.1] - 2015-04-03

### Fixed
- Added error handling improvements

## [2.0.0] - 2019-04-19

### Changed
- Refactored to ES6 module syntax
- Removed all external dependencies

## Support

- **Bugs**: [GitHub Issues](https://github.com/stevenvelozo/fable-uuid/issues)
- **Source**: [GitHub Repository](https://github.com/stevenvelozo/fable-uuid)
