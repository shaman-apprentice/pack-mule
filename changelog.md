# Changelog
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased / Upcoming]

## [0.2.0] - 2020.05.08
### Changed
- Take all key-value pairs as set, even if the value is `undefined`. This effects:
  - `this.size` which previously was supposed to not count those entries with value `undefined`.
  - `this.has` which previously returned `false`, if the value stored to the key is `undefined`.

### Fixed
- Fix handling of `number` as keys.
- Fix overwriting of the keys `undefined` and `"undefined"`.
- Fix overwriting of the keys `null` and `"null"`.

## [0.1.0] - 2020.05.03
### Added
- Allow non-objects as keys on purpose (which was previously accidentally allowed by TypeScript compiler due to false type annotations, but not supported).

### Breaking
- Rename `PMap.add` into `PMap.set`.
- Handle `undefined` as unset and remove constant `Unset`.


## [0.0.1] - 2020.05.01
### Added
- First PoC version let loose into the wild.