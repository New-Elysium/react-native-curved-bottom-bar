# CLAUDE.md — react-native-curved-bottom-bar

This file is a guide for AI coding assistants (Claude, Copilot, etc.) working in this repository.

---

## Project Overview

`react-native-curved-bottom-bar` is a React Native library that renders a curved/notched bottom navigation bar. It wraps `@react-navigation/bottom-tabs` and uses `react-native-svg` with `d3-shape` to draw a custom SVG path for the curved notch.

Two flavours are exported:
- `CurvedBottomBar` — uses `react-native`'s `View` with native shadow support (iOS/Android CLI).
- `CurvedBottomBarExpo` — plain `View` without shadow utilities, compatible with Expo managed workflow.

---

## Repository Structure

```
react-native-curved-bottom-bar/
├── src/
│   ├── index.tsx                         # Library entry point (re-exports)
│   ├── useDeviceOrientation.ts           # Hook: portrait/landscape detection
│   └── CurvedBottomBar/
│       ├── index.tsx                     # Exports Navigator, Screen, ref type
│       ├── model.ts                      # Top-level type re-exports
│       ├── utils/
│       │   ├── pathDown.ts               # SVG path builder for "DOWN" curve
│       │   └── pathUp.ts                 # SVG path builder for "UP" curve
│       └── components/
│           ├── BottomBarView/            # CLI (non-Expo) Navigator component
│           │   ├── index.tsx
│           │   ├── model.ts              # Navigator prop types ← main types file
│           │   └── styles.ts
│           ├── BottomBarViewExpo/        # Expo Navigator component (near-duplicate)
│           │   ├── index.tsx
│           │   ├── model.ts              # Identical types to BottomBarView/model.ts
│           │   └── styles.ts
│           ├── CurvedView/
│           │   ├── curvedView.tsx        # SVG renderer (CLI, wraps in CurvedBottomBarView)
│           │   ├── curvedViewExpo.tsx    # SVG renderer (Expo, plain View)
│           │   └── model.ts
│           ├── MenuItemView/             # Screen/tab placeholder component
│           │   ├── index.tsx
│           │   └── model.ts
│           └── ShadowView/
│               └── index.tsx             # Alias: CurvedBottomBarView = View
├── example/                              # Demo RN CLI app
│   └── src/App.tsx
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── babel.config.js
```

---

## Development Commands

All commands run from the repository root unless noted.

```bash
# Install dependencies
yarn bootstrap        # installs root + example deps

# Type-check (no emit)
yarn typecheck        # runs: tsc --noEmit

# Lint
yarn lint             # runs: eslint "**/*.{js,ts,tsx}"

# Tests
yarn test             # runs: jest

# Build the library (outputs to lib/)
yarn prepack          # runs: bob build  (react-native-builder-bob)

# Run the example app
yarn example android
yarn example ios
```

---

## Architecture Notes

### Navigator composition pattern
`CurvedBottomBar.Navigator` (and `CurvedBottomBarExpo.Navigator`) are `React.forwardRef` wrappers around `createBottomTabNavigator()`. They accept `CurvedBottomBar.Screen` children—plain JSX nodes—and map them to `Tab.Screen` entries internally. Children are read from `props.children` cast to `any[]`; no React context is used.

### SVG path generation
`pathDown.ts` and `pathUp.ts` use `d3-shape`'s `line()` + `curveBasis` interpolator to generate SVG `d` attribute strings. These strings are passed to a `<Path>` inside an `<Svg>` (from `react-native-svg`).

### `react-native-size-scaling`
Used for `scale()` calls throughout path math and styles. This scales pixel values relative to a 375px-wide base screen. It is a runtime dependency declared in both `dependencies` and `devDependencies` (duplicate — should be just `dependencies`).

### Expo vs CLI split
The only difference between `BottomBarView` and `BottomBarViewExpo` is:
- `BottomBarView` uses `CurvedViewComponent` which wraps SVG in `CurvedBottomBarView` (currently just `View` alias — the original shadow abstraction is now a no-op).
- `BottomBarViewExpo` uses `CurvedViewExpoComponent` which wraps in a plain `View`.

The two Navigator components are otherwise identical — a refactor opportunity.

---

## Identified Issues and Recommended Upgrades

### Outdated Dependencies (as of 2026-04-28)

| Package | Current | Latest | Notes |
|---|---|---|---|
| `typescript` | `^4.5.2` | `^6.0.3` | Two major versions behind |
| `react` | `18.2.0` | `19.2.5` | Major version behind |
| `react-native` | `0.71.3` | `0.85.2` | Very outdated; several breaking changes |
| `@react-navigation/bottom-tabs` | `^6.3.1` | `^7.15.10` | v7 has breaking API changes |
| `@react-navigation/native` | `^6.0.10` | `^7.2.2` | Breaking changes in v7 |
| `react-native-svg` | `^13.8.0` | `^15.15.4` | Two major versions behind |
| `react-native-size-scaling` | `^0.5.1` | `^0.5.4` | Minor |
| `eslint` | `^8.4.1` | `^10.2.1` | ESLint 9/10 uses flat config |
| `prettier` | `^2.0.5` | `^3.8.3` | Major version behind |
| `jest` | `^28.1.1` | `^30.3.0` | Two major versions behind |
| `react-native-builder-bob` | `^0.20.0` | `^0.41.0` | Many improvements |
| `@evilmartians/lefthook` | `^1.2.2` | `^2.1.6` | Major version |
| `release-it` | `^15.0.0` | `^20.0.1` | Major version |
| `@release-it/conventional-changelog` | `^5.0.0` | `^11.0.0` | Major version |
| `commitlint` | `^17.0.2` | `^20.5.2` | Now requires Node ≥ 18 |
| `@commitlint/config-conventional` | `^17.0.2` | `^20.5.0` | Match commitlint version |
| `del-cli` | `^5.0.0` | `^7.0.0` | Major version |
| `@types/react` | `~17.0.21` | `^19.2.14` | Two major versions behind |
| `@types/react-native` | `0.70.0` | Deprecated | RN ships its own types; remove this |

### TypeScript Issues

#### 1. `NavigatorBottomBarProps` resolves to `Pick<any, K>` (consumer-visible error)
`NavigatorBottomBarProps` is defined as an intersection with `DefaultNavigatorOptions<...>`:
```typescript
// ❌ Current — causes Pick<any, K> explosion in consumer code
export type NavigatorBottomBarProps = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> & Props & TabRouterOptions;
```
When the installed `@react-navigation` version differs from what the types expect (e.g., using v7 types against v6, or vice-versa), `DefaultNavigatorOptions<...>` resolves to `any`. The intersection `any & Props` collapses to `any`, and TypeScript then emits `Pick<any, K>` which makes **all** keys—including optional ones—appear as required, producing confusing errors about missing `style`, `borderColor`, `width`, etc.

**Fix:** Replace with a standalone `interface` that explicitly lists all props. See `src/CurvedBottomBar/components/BottomBarView/model.ts`.

#### 2. `Enumerate<N>` / `Range<F, T>` literal union types
```typescript
// ❌ Current — generates a 40-member literal union for height
height?: Range<50, 91>  // = 50 | 51 | 52 | ... | 90
```
This creates enormous union types that:
- Slow down type-checking
- Show unhelpful error messages ("Type '55' is not assignable to type '50 | 51 | ...'")
- Break when consumers pass variables rather than literals

**Fix:** Use `number` (validation is already enforced at runtime via `Math.min`/`Math.max` clamping).

#### 3. `JSX.Element` return type (deprecated in TypeScript 5.1+)
Callback prop types use `JSX.Element` which is namespace-qualified and deprecated in TS 5.1+.
**Fix:** Use `React.ReactElement` instead.

#### 4. Deprecated `tsconfig.json` options
- `importsNotUsedAsValues: "remove"` — removed in TypeScript 5.5; use `verbatimModuleSyntax` instead.
- `noImplicitUseStrict: false` — deprecated; remove it.
- `noStrictGenericChecks: false` — **not a real TypeScript compiler option**; remove it.
- `moduleResolution: "node"` — legacy; should be `"bundler"` for modern toolchains or `"node16"` for Node ESM.

#### 5. `@types/react-native` in devDependencies
This package is deprecated (stub only). React Native ships its own TypeScript definitions. Remove from `devDependencies`.

### ESLint / Prettier Issues
- ESLint config still lives inside `package.json`. ESLint 9+ uses a flat config file (`eslint.config.js`).
- `@react-native-community/eslint-config` is maintained but targets older ESLint versions.
- `eslint-plugin-prettier` is optional — many projects drop it in favour of running prettier separately.

### Build Tooling Issues
- `metro-react-native-babel-preset` in `example/package.json` is deprecated in React Native 0.73+; replaced by `@react-native/babel-preset`.
- `blacklistRE` in `example/metro.config.js` is deprecated; renamed to `blockList`.
- The `babel.config.js` uses `module:metro-react-native-babel-preset` (old); should be `module:@react-native/babel-preset` for RN 0.73+.

### Node Version
`engines.node` is `>= 16.0.0` but several updated tools (`commitlint` 20, `del-cli` 7, etc.) require Node ≥ 18. Update to `>= 18.0.0` and update `.nvmrc` accordingly.

### Code Quality Issues
- **Duplicate code:** `BottomBarView/index.tsx` and `BottomBarViewExpo/index.tsx` are nearly identical. The only difference is which `CurvedView*` sub-component is used. These should be unified into a single component that accepts the `CurvedView` implementation as a prop or injects it via context.
- **`(shape as any).line()`**: `d3-shape` ships TypeScript types (`@types/d3-shape` is already in devDependencies). The `as any` casts in `pathDown.ts` and `pathUp.ts` should be replaced with typed usage.
- **No tests:** `src/__tests__/index.test.tsx` contains only `it.todo('write a test')`. There are no actual tests.
- **`d3-shape` in both `dependencies` and `devDependencies`:** Remove it from `devDependencies` (it belongs only in `dependencies`).
- **`react-native-size-scaling` in both `dependencies` and `devDependencies`:** Same issue.

---

## React Navigation v7 Migration Notes

If upgrading to `@react-navigation/bottom-tabs@^7` and `@react-navigation/native@^7`:
- `DefaultNavigatorOptions` signature changed; the `NavigatorBottomBarProps` type must not depend on it (already fixed in the new standalone interface approach).
- `Tab.Navigator` now accepts `id` as a standard prop.
- `screenOptions` type narrowed; `TabRouterOptions` is mostly absorbed into the navigator's own type.
- Navigation container now wraps differently; see React Navigation v7 migration guide.
