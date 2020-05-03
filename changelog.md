# Changelog
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased / Upcoming]

## [0.1.0] - 2020.05.03
### Added
- Allow non-objects as keys on purpose (which was previously accidentally allowed by TypeScript compiler due to false type annotations, but not supported).

### Breaking
- Rename `PMap.add` into `PMap.set`.
- Handle `undefined` as unset and remove constant `Unset`.


## [0.0.1] - 2020.05.01
### Added
- First PoC version let loose into the wild.