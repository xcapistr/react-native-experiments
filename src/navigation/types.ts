import {
  type NavigationState,
  type PartialState
} from '@react-navigation/native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'

import { type Routes } from './routes'

export type RootStackParamList = {
  [Routes.HOME]: undefined
  [Routes.SHADERS_1]: undefined
  [Routes.SHADERS_2]: undefined
  [Routes.SHADERS_3]: undefined
  [Routes.TAB_BAR]: undefined
  [Routes.DRAWINGS]: undefined
  [Routes.CAROUSEL]: undefined
  [Routes.CAROUSEL_ITEM]: { id: string }
  [Routes.THEME_SWITCH]: undefined
  [Routes.MODEL_3D_VIEW]: undefined
  [Routes.MODEL_3D_VIEW_2]: undefined
}

export type ResetState = PartialState<NavigationState<RootStackParamList>>

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>
