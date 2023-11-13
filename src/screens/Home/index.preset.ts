import { type MenuItem } from '.'
import { Routes } from '../../navigation/routes'

export const MENU_ITEMS: MenuItem[] = [
  { label: 'drawings', route: Routes.DRAWINGS },
  { label: 'shaders 1', route: Routes.SHADERS_1 },
  { label: 'shaders 2', route: Routes.SHADERS_2 },
  { label: 'shaders 3', route: Routes.SHADERS_3 },
  { label: 'tab bar', route: Routes.TAB_BAR },
  { label: 'carousel', route: Routes.CAROUSEL },
  { label: 'theme swtich', route: Routes.THEME_SWITCH },
  { label: '3d model view', route: Routes.MODEL_3D_VIEW },
  { label: '3d model view 2', route: Routes.MODEL_3D_VIEW_2 }
]
