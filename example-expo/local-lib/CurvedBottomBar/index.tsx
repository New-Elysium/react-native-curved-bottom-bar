import Screen from './components/MenuItemView';
import Navigator from './components/BottomBarView';
import NavigatorExpo from './components/BottomBarViewExpo';
import type { ICurvedBottomBarRef } from './components/BottomBarView/model';

const CurvedBottomBar = { Navigator, Screen };
const CurvedBottomBarExpo = { Navigator: NavigatorExpo, Screen };

export { CurvedBottomBar, CurvedBottomBarExpo };
export type { ICurvedBottomBarRef };
