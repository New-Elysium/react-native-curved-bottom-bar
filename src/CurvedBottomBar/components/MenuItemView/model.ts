import type { RouteConfig, ParamListBase } from '@react-navigation/native';

type MenuItem = {
  position: 'LEFT' | 'RIGHT' | 'CIRCLE' | 'CENTER';
};
type RouteConfigComponent = RouteConfig<ParamListBase, any, any, any, any>;

export type ScreenBottomBarProps = RouteConfigComponent & MenuItem;
