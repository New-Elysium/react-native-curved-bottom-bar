/**
 * Optional integration with `expo-router`.
 *
 * Usage (app/_layout.tsx or app/(tabs)/_layout.tsx):
 *
 * ```tsx
 * import { CurvedTabs } from 'react-native-curved-bottom-bar/expo-router';
 *
 * export default function TabLayout() {
 *   return (
 *     <CurvedTabs
 *       initialRouteName="home"
 *       renderCircle={({ navigate }) => (...)}
 *       tabBar={({ routeName, selectedTab }) => (...)}
 *     >
 *       <CurvedTabs.Screen name="home" position="LEFT" />
 *       <CurvedTabs.Screen name="settings" position="RIGHT" />
 *     </CurvedTabs>
 *   );
 * }
 * ```
 *
 * `expo-router` is an optional peer dependency: it is required dynamically so
 * consumers on bare React Native are not forced to install it. If you import
 * this entry point without `expo-router` installed, you will get a clear
 * runtime error.
 */
import * as React from 'react';

import { CurvedBottomBar } from './CurvedBottomBar';

type AnyNavigator = React.ComponentType<any> & {
  Screen: React.ComponentType<any>;
};

type WithLayoutContext = <T extends AnyNavigator>(navigator: T) => T;

let withLayoutContext: WithLayoutContext | undefined;
try {
  const mod = require('expo-router') as {
    withLayoutContext?: WithLayoutContext;
  };
  withLayoutContext = mod?.withLayoutContext;
} catch {
  withLayoutContext = undefined;
}

const buildCurvedTabs = (): AnyNavigator => {
  if (!withLayoutContext) {
    const missing: AnyNavigator = (() => {
      throw new Error(
        "react-native-curved-bottom-bar/expo-router requires 'expo-router' to be installed. " +
          'Run `npx expo install expo-router` and ensure it is configured before importing this entry point.'
      );
    }) as unknown as AnyNavigator;
    missing.Screen =
      CurvedBottomBar.Screen as unknown as AnyNavigator['Screen'];
    return missing;
  }

  // Mirror the shape `withLayoutContext` expects: a Navigator component that
  // also has a `.Screen` attached. Our `CurvedBottomBar.Navigator` already
  // wraps `createBottomTabNavigator()` and accepts `CurvedBottomBar.Screen`
  // children, so this composition matches what `expo-router` consumes.
  const NavigatorWithScreen = Object.assign(
    CurvedBottomBar.Navigator as unknown as React.ComponentType<any>,
    { Screen: CurvedBottomBar.Screen }
  ) as AnyNavigator;

  return withLayoutContext(NavigatorWithScreen);
};

export const CurvedTabs = buildCurvedTabs();

export type { ICurvedBottomBarRef } from './CurvedBottomBar/components/BottomBarView/model';
