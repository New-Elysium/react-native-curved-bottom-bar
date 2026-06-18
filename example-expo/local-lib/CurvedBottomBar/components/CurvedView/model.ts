import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

interface ICurvedView {
  style?: StyleProp<ViewStyle>;
  width: number;
  height: number;
  bgColor: string;
  path: any;
  borderColor?: string;
  borderWidth?: number;
}

export type CurvedView = React.FC<ICurvedView>;
