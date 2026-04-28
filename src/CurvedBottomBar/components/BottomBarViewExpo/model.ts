import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

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
  // React Navigation Tab.Navigator pass-through props
  children?: React.ReactNode;
  id?: string;
  screenOptions?:
    | BottomTabNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase>;
        navigation: any;
      }) => BottomTabNavigationOptions);
  backBehavior?: 'firstRoute' | 'initialRoute' | 'order' | 'history' | 'none';
}
