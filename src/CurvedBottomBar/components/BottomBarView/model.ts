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
  // React Navigation Tab.Navigator pass-through props
  children?: React.ReactNode;
  id?: string;
  screenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase>;
        navigation: BottomTabNavigationProp<ParamListBase>;
      }) => BottomTabNavigationOptions);
  backBehavior?: 'firstRoute' | 'initialRoute' | 'order' | 'history' | 'none';
}
