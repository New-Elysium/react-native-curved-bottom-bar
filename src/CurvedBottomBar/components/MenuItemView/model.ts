import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type React from 'react';

export interface ScreenBottomBarProps {
  name: string;
  position: 'LEFT' | 'RIGHT' | 'CIRCLE' | 'CENTER';
  component: React.ComponentType<any>;
  options?: BottomTabNavigationOptions;
}
