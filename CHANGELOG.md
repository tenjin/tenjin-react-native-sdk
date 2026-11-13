# Changelog

## Unreleased

### Build dependencies

* Refresh patched JavaScript tooling dependencies without changing React Native, React, or native Tenjin SDK versions.
* Resolve the CLI's fast-xml-parser 4.x requests to 5.12.0. Upstream documents v5 as functionally equivalent to v4; CLI consumers use the retained CommonJS XMLParser/XMLValidator APIs and attribute-preserving XML parsing.
* Fix fresh lockfile findings with compatible releases: CVE-2025-69873 (Ajv 6.14.0), CVE-2026-118772 (Joi 17.13.9), CVE-2026-33532 (yaml 2.8.3), and all seven addressable advisories (GHSA-4w5q-wg7v-w6gp, GHSA-8gmh-2hhj-2hv9, GHSA-9crm-g4mf-wc5j, GHSA-9f42-57jx-vpp3, GHSA-j82w-28jv-3pmj, GHSA-qq38-m9mg-xjj5, GHSA-539f-xcgw-2gjg) via example lock resolution 2.9.2.
* Fix CVE-2026-118773 and CVE-2026-118764 with scoped glob 14.0.2 resolutions for existing glob 10/13 parents and minimatch 11.0.1 for TypeScript-ESTree's ^9.0.4 range. Builder Bob's CommonJS globSync/cwd/absolute/nodir and cacache's CommonJS glob APIs are retained; TypeScript-ESTree's CommonJS minimatch(path, pattern) call is retained. glob 14 and minimatch 11 support Node 18, 20, and >=22; parent packages retain their higher Node engine requirements.
* Retain explicit blockers: ActiveSupport CVE-2026-126080/GHSA-8474-xrp6-wh69 requires 8.0.5.2+ while CocoaPods-core requires `< 8`; image-size CVE-2025-71329/GHSA-5p2g-fcmc-qvqq and CVE-2025-71330/GHSA-w3rx-r6r6-pgpr require 2.0.3, but Metro 0.82.5 uses the synchronous callable CommonJS API while v2 exposes named `imageSize`. No Metro 0.82 patch with v2 support or image-size 1.x backport is published. The supplied deepmerge advisory remains unresolved because no patched release is published.

## [1.8.1](https://github.com/tenjin/tenjin-react-native-sdk/compare/1.8.0...1.8.1) (2026-10-27)


### Bug Fixes

* update Android SDK to 2.0.2 ([#105](https://github.com/tenjin/tenjin-react-native-sdk/issues/105)) ([b323da6](https://github.com/tenjin/tenjin-react-native-sdk/commit/b323da60c9bd7ba07593ca50d6c541781b47d547))

## [1.8.0](https://github.com/tenjin/tenjin-react-native-sdk/compare/1.7.0...1.8.0) (2026-10-07)


### Features

* update Android SDK to 2.0.0 and iOS SDK to 1.20.0 ([#99](https://github.com/tenjin/tenjin-react-native-sdk/issues/99)) ([d35ed76](https://github.com/tenjin/tenjin-react-native-sdk/commit/d35ed76ced7bfdf6320159f937d11660ca7b9b6b))

## [1.7.0](https://github.com/tenjin/tenjin-react-native-sdk/compare/1.6.0...1.7.0) (2026-09-22)


### Features

* update Android SDK to 1.24.0 and iOS SDK to 1.19.1 ([#95](https://github.com/tenjin/tenjin-react-native-sdk/issues/95)) ([14e7374](https://github.com/tenjin/tenjin-react-native-sdk/commit/14e7374bf87d1dff72c39fa2887d5e619e8cc1aa))

## [1.6.0](https://github.com/tenjin/tenjin-react-native-sdk/compare/1.5.1...1.6.0) (2026-08-25)


### Features

* Add handleOpenUrl for re-engagement deeplinks [TENJIN-28220] ([#87](https://github.com/tenjin/tenjin-react-native-sdk/issues/87)) ([2148a33](https://github.com/tenjin/tenjin-react-native-sdk/commit/2148a332c0878c42df6accdeb68712f8c4ac7f5b))


### Bug Fixes

* use include-component-in-tag instead of invalid tag-format key [TENJIN-28888] ([#84](https://github.com/tenjin/tenjin-react-native-sdk/issues/84)) ([656ab89](https://github.com/tenjin/tenjin-react-native-sdk/commit/656ab899cbf46f9365dd2a94e54a07b6e152fc79))
