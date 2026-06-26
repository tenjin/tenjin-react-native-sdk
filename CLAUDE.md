# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Native TurboModule SDK for Tenjin, a mobile marketing analytics platform. The package (`react-native-tenjin`) wraps native Tenjin SDKs for iOS and Android, exposing them to JavaScript via React Native's TurboModule architecture.

## Common Commands

- **Build JS/TypeScript:** `yarn prepare` (uses react-native-builder-bob, outputs to `lib/`)
- **Typecheck:** `yarn typecheck`
- **Lint:** `yarn lint`
- **Test:** `yarn test` (Jest with react-native preset)
- **Clean:** `yarn clean`
- **Run example app:** `yarn example start`, `yarn example android`, `yarn example ios`
- **Release:** `yarn release` (uses release-it with conventional changelog)

## Architecture

### Native Bridge Pattern

This is a React Native TurboModule (not a legacy native module). The bridge layer works as follows:

1. **TurboModule spec** (`src/NativeTenjin.ts`) — defines the native interface contract using `TurboModuleRegistry.getEnforcing<Spec>('Tenjin')`. This is the source of truth for codegen.
2. **JS entry** (`src/index.tsx`) — conditionally loads TurboModule or falls back to `NativeModules.Tenjin` for old architecture. Wraps the native module with `makeTenjin()` to override `updatePostbackConversionValue` and `eventWithNameAndValue` with JS-side logic.
3. **iOS native** (`ios/Tenjin.mm`) — Objective-C++ implementation using `RCT_EXPORT_METHOD` macros. Delegates to `TenjinSDK` (pod dependency). Supports both old and new architecture via `#ifdef RCT_NEW_ARCH_ENABLED`.
4. **iOS Swift helper** (`ios/TenjinStoreKit.swift`) — Uses StoreKit 2 `Transaction.latest(for:)` to fetch SK2 transaction data natively. Called by `subscriptionWithStoreKit` for IAP libraries that don't expose SK2 data (e.g., RevenueCat). Requires `@objc(TenjinStoreKit)` annotation for correct ObjC symbol name.
5. **Android native** (`android/src/main/java/com/tenjin/TenjinModule.kt`) — Kotlin implementation extending `NativeTenjinSpec`. Delegates to `com.tenjin.android.TenjinSDK` instance. Registered via `TenjinPackage.kt`.

### Key JS-side Overrides

- `updatePostbackConversionValue` (`src/updatePostbackConversionValue.ts`) — routes to one of three native methods based on which optional params (coarseValue, lockWindow) are provided. iOS-only feature (SKAdNetwork); Android methods are no-ops.
- `eventWithNameAndValue` (`src/index.tsx`) — handles deprecated string values by parsing to int with a warning.
- `subscription` (`src/subscription.ts`) — converts a params object to positional native args, coercing `undefined` to `null` and ensuring string types for the TurboModule bridge.

### Codegen

Configured in `package.json` under `codegenConfig` with spec name `TenjinSpec` and Java package `com.tenjin`. The TurboModule spec in `src/NativeTenjin.ts` drives native codegen for both platforms.

## Conventions

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint)
- Package manager: Yarn 3 (with workspaces: root + `example/`)
- Prettier config in `package.json`: single quotes, 2-space indent, es5 trailing commas
- When adding a new SDK method: update `NativeTenjin.ts` (spec), `TenjinSDK` interface in `index.tsx`, both native implementations (`Tenjin.mm` and `TenjinModule.kt`)
