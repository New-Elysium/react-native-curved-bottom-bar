import type {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { GlassEffectStyle } from '../GlassBackground';

export interface ICurvedBottomBarRef {
  setVisible: (visible: boolean) => void;
}

type CircleRenderProps = {
  routeName: string;
  selectedTab: string;
  navigate: (selectedTab: string) => void;
};

/**
 * Props for CurvedBottomBar.Navigator and CurvedBottomBarExpo.Navigator.
 *
 * height is clamped to [50, 90] and circleWidth to [50, 60] at runtime;
 * plain `number` is used here to avoid noisy literal-union errors for consumers.
 */
export interface NavigatorBottomBarProps {
  type?: 'DOWN' | 'UP';
  circlePosition?: 'CENTER' | 'LEFT' | 'RIGHT';
  style?: StyleProp<ViewStyle>;
  /** Shadow styling. Not supported in Expo — use CurvedBottomBarExpo instead. */
  shadowStyle?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  borderTopLeftRight?: boolean;
  circleWidth?: number;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  initialRouteName: string;
  defaultScreenOptions?: BottomTabNavigationOptions;
  renderCircle: (props: CircleRenderProps) => React.ReactElement;
  tabBar?: (props: CircleRenderProps) => React.ReactElement;
  /**
   * Opt-in to Apple's Liquid Glass material (iOS 26+). Requires the optional
   * peer dependency `expo-glass-effect`. On unsupported platforms / versions
   * this is a no-op and the tab bar renders with its normal background.
   * When enabling, consider passing `bgColor="transparent"` so the SVG fill
   * does not occlude the glass underneath.
   */
  enableGlassEffect?: boolean;
  /** Variant of the Liquid Glass material to use. Defaults to `'regular'`. */
  glassEffectStyle?: GlassEffectStyle;
  /**
   * Rendering implementation forwarded to `@react-navigation/bottom-tabs`.
   *
   * React Navigation 8 renders *native* bottom tabs by default, which would
   * bypass this library's custom SVG curved `tabBar`. We therefore default to
   * `'custom'` (the JavaScript-based implementation) so the curved bar renders
   * identically on v7 and v8. The `implementation` prop does not exist in
   * React Navigation 7 and is harmlessly ignored there. Override with
   * `'native'` only if you intend to bypass the curved bar.
   */
  implementation?: 'custom' | 'native';
  // React Navigation Tab.Navigator pass-through props
  children?: React.ReactNode;
  /** @deprecated Removed in React Navigation 8; only honored on v7. */
  id?: string;
  screenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase>;
        navigation: BottomTabNavigationProp<ParamListBase>;
      }) => BottomTabNavigationOptions);
  backBehavior?: 'firstRoute' | 'initialRoute' | 'order' | 'history' | 'none';
}
