# Upstream Issue Triage

This document tracks open issues in the upstream repository
[`hoaphantn7604/react-native-curved-bottom-bar`](https://github.com/hoaphantn7604/react-native-curved-bottom-bar/issues)
that are relevant to this fork (`XChikuX/react-native-curved-bottom-bar`).

Each issue is categorized by what action we plan to take. Issue numbers refer to
the **upstream** issue tracker.

**Snapshot date:** 2026-05-18 — 27 open issues reviewed.

---

## Summary

| Status                    | Count | Notes                                                  |
| ------------------------- | ----- | ------------------------------------------------------ |
| ✅ Fixed in this fork     | 4     | Mostly type / dependency hygiene already addressed     |
| 🟢 Quick fix (this PR)    | 3     | Small, safe changes landing alongside this triage      |
| 🟡 Planned                | 6     | Larger refactors / feature work tracked for follow-ups |
| 🔵 Scaffolding (this PR)  | 2     | expo-router integration, iOS 26+ Liquid Glass         |
| ❓ Needs reproduction     | 6     | Cannot fix without an isolated repro                   |
| 🟣 Usage / docs           | 4     | Better answered by README updates than code            |
| ❌ Won't fix / wontaddress| 2     | Out of scope or duplicate                              |

---

## ✅ Already fixed in this fork

These were called out in `CLAUDE.md` and have been resolved on `main` of this
fork.

- **#82 — RN 0.76.5 Android crash (`EventDispatcher … null object reference`).**
  Root cause is `react-native-svg < 14` not supporting the New Architecture.
  This fork bumps the `react-native-svg` peer range and the example app to
  v15+, which resolves the crash. (See README peer-dependency table.)
- **#76 — TypeScript error: `Type 'ScreenComponentType | undefined'`.**
  Caused by `NavigatorBottomBarProps` resolving to `Pick<any, K>` after
  intersecting with the old `DefaultNavigatorOptions<…>`. Replaced by a
  standalone `interface` (see `src/CurvedBottomBar/components/BottomBarView/model.ts`).
- **#73 — `strokeColor` / `strokeWidth` removed in v3.**
  Replaced by typed `borderColor` and `borderWidth` props (already wired
  through `CurvedView` and documented in the README props table).
- **#55 — `screenOptions` is not supported.**
  v7 `screenOptions`, `id`, `backBehavior`, and `defaultScreenOptions` are now
  on `NavigatorBottomBarProps` and forwarded to `Tab.Navigator` via the
  existing `{...props}` spread.

## 🟢 Quick fixes landing in this PR

- **Dependency hygiene** (`package.json`): `d3-shape` and
  `react-native-size-scaling` were declared in **both** `dependencies` and
  `devDependencies`. The duplicate `devDependencies` entries are removed.
- **Deprecated `@types/react-native`** is removed; React Native ships its own
  types since 0.71.
- **Node engines bump** to `>= 18.0.0` (aligned with current toolchain
  requirements such as `commitlint` 20+, `del-cli` 7+).
- **Typed `d3-shape` usage** in `pathDown.ts` / `pathUp.ts`: replaced
  `(shape as any).line()…` casts with typed `line<{x: number; y: number}>()`,
  using `@types/d3-shape` that is already in devDependencies.

These are all internal-only changes; the public component API is unchanged.

## 🔵 Scaffolding landing in this PR

- **#62, #75 — expo-router support.** A new optional entry
  `react-native-curved-bottom-bar/expo-router` exposes `CurvedTabs`, the
  navigator wrapped with `withLayoutContext` from `expo-router`. `expo-router`
  is *not* a hard dependency: it is dynamically required only when the entry is
  imported, so consumers on bare React Native are unaffected. README has a new
  "Use with expo-router" section.
- **iOS 26+ Apple Liquid Glass.** A new `GlassBackground` component detects
  iOS ≥ 26 and conditionally wraps the SVG canvas in `GlassView` from
  `expo-glass-effect` (optional peer; falls back to a plain `View` everywhere
  else). Two new opt-in props are added to the navigator:
  `enableGlassEffect?: boolean` and `glassEffectStyle?: 'regular' | 'clear'`.
  Both default to `undefined`, so existing call sites are bit-for-bit
  unchanged. Implementing the actual Liquid Glass material requires a native
  package — this PR only lands the typed integration surface.

## 🟡 Planned follow-ups (not in this PR)

- **#88 — Pressing the active tab does not pop to root.**
  Requires intercepting `tabPress` and calling `navigation.popToTop()`. Will
  be added as an opt-in `resetOnSelected` prop to avoid changing default
  behavior. Tracked.
- **#74, #68 — Border on the curved edge / `borderBottomLeftRight`.**
  The SVG path generator already supports a stroke, but the bottom corners
  are not curve-controlled. Will be addressed together with a `cornerRadius`
  prop that drives both top and bottom corners.
- **#70 — Custom path overrides (`getPathUp` / `getPathDown` props).**
  Desirable; we can expose the path builders as a `pathBuilder` prop without
  breaking the default. Tracked.
- **#78 — `tabBarHideOnKeyboard` not honored.**
  The custom `tabBar` ignores `screenOptions` flags. Needs us to read the
  current screen's options and apply keyboard-aware visibility. Tracked.
- **#85, #84 — Notch distortion on resize / orientation change.**
  Path math uses `scale()` against a fixed 375px baseline. Needs a
  width-recompute pass when orientation flips. Partially mitigated by the
  existing `useDeviceOrientation` hook, but the path itself also needs to
  re-derive on `Dimensions` change. Tracked.
- **#59 — Render all tabs at startup.**
  React Navigation v7 exposes `lazy: false` on `screenOptions`; document this
  rather than reimplement. May still need an example.

## ❓ Needs reproduction / more info

These have no minimal reproduction attached, and we cannot confirm in the
example app on current versions. Will request a repro on the upstream issue:

- **#87** — Background "cutout" layer behind the bottom bar matching app bg.
- **#67** — Dynamic circle icon does not update.
- **#65** — `headerShown: false` still renders titles. (Likely a stale RN
  Navigation version; not reproducible against `@react-navigation/native@7`.)
- **#63** — `headerShown: false` ignored on `CurvedBottomBar.Screen` in v3.
  (Same suspected cause as #65.)
- **#61** — `[Android] Shadow issue on Expo`. The shadow code path has since
  been replaced by a plain `View` (`ShadowView/index.tsx`), so this may
  already be fixed; needs confirmation.
- **#57, #56** — Lag when nesting Stack ↔ CurvedBottomBar. Likely RN core
  perf rather than this library; needs profiler trace.

## 🟣 Usage / documentation requests

- **#86** — "How do I create a floating-center-button design?" — extend the
  example app.
- **#66** — "How do I show a component on circle press?" — handled inside the
  user's `renderCircle` callback; add a recipe.
- **#60** — "How do I add bottom padding to the bar?" — document use of
  `style` + `paddingBottom` (and `useSafeAreaInsets`).
- **#50** — "Hide bottom tab on nested screens" — document the standard
  React Navigation pattern (`screenOptions: ({ route }) => …`).

## ❌ Won't fix / out of scope

- **#84** (Vietnamese) — Tabs disappearing after screen rotation. Same root
  cause as #85; we'll address via #85 rather than tracking separately.
- **#48** — Stack navigation params not preserved when nested under
  `CurvedBottomBar.Screen`. This is a documented React Navigation behavior
  for nested navigators (`merge: true` must be passed). Will be addressed by
  documentation, not a code change.

---

## How this triage was produced

- Listed all 27 open issues via the GitHub API at the snapshot date above.
- Categorized each issue based on (a) whether the current source already
  resolves it, (b) whether a small surgical change can resolve it, or
  (c) whether it requires broader design work / a reproduction.
- Cross-referenced existing notes in `CLAUDE.md` for previously-identified
  problems and chosen direction.
