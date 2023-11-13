import {
  Path,
  type SkiaMutableValue,
  type AnimatedProp,
  type PathDef
} from '@shopify/react-native-skia'
import { useDerivedValue } from 'react-native-reanimated'
import { HORIZONTAL_PADDING, TABS, TOP_BORDER } from '../../index.preset'

export interface IIconPath {
  path: AnimatedProp<PathDef, any>
  index: number
  itemsCount: number
  dimensions: SkiaMutableValue<{
    width: number
    height: number
  }>
}

export const IconPath = ({
  path,
  index,
  itemsCount,
  dimensions
}: IIconPath) => {
  const transform = useDerivedValue(
    () => [
      {
        translateX:
          HORIZONTAL_PADDING +
          ((dimensions.current.width - 2 * HORIZONTAL_PADDING) / itemsCount) *
            (index + 0.5) -
          11
      },
      { translateY: TOP_BORDER + 18 },
      { scale: 0.7 }
    ],
    [dimensions.current.width, index, itemsCount]
  )

  return (
    <Path
      transform={transform}
      style="stroke"
      strokeCap="round"
      strokeJoin="round"
      strokeWidth={3.3}
      color="#aaa"
      path={path}
    />
  )
}
