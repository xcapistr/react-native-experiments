import React, { useEffect, useMemo, useState } from 'react'
import {
  Skia,
  Canvas,
  Path,
  useValue,
  useComputedValue,
  Circle,
  Shadow,
  Group,
  Mask
} from '@shopify/react-native-skia'
import Animated, {
  withTiming,
  useSharedValue,
  useDerivedValue,
  withSequence,
  Easing,
  withDelay
} from 'react-native-reanimated'
import { View } from 'react-native'
import { IconButton } from './parts/IconButton'
import { TABS } from './index.preset'
import { IconPath } from './parts/IconPath'

const BALL_RADIUS = 30
const HORIZONTAL_PADDING = 32
const TOP_BORDER = 40

const ITEMS_COUNT = 5

export interface ITabBar {
  activeTab: number
  setActiveTab: (tab: number) => void
}

export const TabBar = ({ activeTab, setActiveTab }: ITabBar) => {
  const dimensions = useValue({ width: 0, height: 0 })
  const cx = useComputedValue(() => dimensions.current.width / 2, [dimensions])
  const [isInit, setIsInit] = useState(false)

  const animatedOffset = useSharedValue(0)
  const animatedCircleOffset = useSharedValue(0)
  const animatedPathEnd = useSharedValue(1)

  useEffect(() => {
    console.log('active tab', activeTab.toString())
    if (!isInit) {
      setIsInit(true)
      return
    }
    animatedOffset.value = withTiming(
      (dimensions.current.width / (ITEMS_COUNT + 1)) * (activeTab + 1) -
        dimensions.current.width / 2,
      {
        duration: 500,
        easing: Easing.bezierFn(0, 0.5, 0.5, 1)
      }
    )
    animatedCircleOffset.value = withSequence(
      withTiming(60, {
        duration: 100,
        easing: Easing.bezierFn(0, 0.5, 0.5, 1)
      }),
      withTiming(0, { duration: 350, easing: Easing.bezierFn(0.2, 0, 1, 0.8) })
    )
    animatedPathEnd.value = 0
    animatedPathEnd.value = withDelay(
      350,
      withTiming(1, {
        duration: 600,
        easing: Easing.bezierFn(0, 0.5, 0.5, 1)
      })
    )
  }, [activeTab])

  const tabTransform = useDerivedValue(() => [
    {
      translateX: animatedOffset.value
    }
  ])

  const circleTransform = useDerivedValue(() => [
    { translateY: animatedCircleOffset.value },
    { translateX: animatedOffset.value }
  ])

  const circleIconTransform = useDerivedValue(() => [
    {
      translateX: dimensions.current.width / 2 - 12
    },
    { translateY: TOP_BORDER - 1 },
    { scale: 0.7 }
  ])

  const path = useComputedValue(
    () =>
      Skia.Path.Make()
        .moveTo(-dimensions.current.width, TOP_BORDER)
        .lineTo(dimensions.current.width / 2 - BALL_RADIUS * 1.8, TOP_BORDER)
        .cubicTo(
          dimensions.current.width / 2 - BALL_RADIUS,
          TOP_BORDER,
          dimensions.current.width / 2 - BALL_RADIUS * 1.4,
          TOP_BORDER + BALL_RADIUS * 1.5,
          dimensions.current.width / 2,
          TOP_BORDER + BALL_RADIUS * 1.5
        )
        .cubicTo(
          dimensions.current.width / 2 + BALL_RADIUS * 1.4,
          TOP_BORDER + BALL_RADIUS * 1.5,
          dimensions.current.width / 2 + BALL_RADIUS,
          TOP_BORDER,
          dimensions.current.width / 2 + BALL_RADIUS * 1.8,
          TOP_BORDER
        )
        .lineTo(dimensions.current.width * 2, TOP_BORDER)
        .lineTo(dimensions.current.width * 2, dimensions.current.height)
        .lineTo(-dimensions.current.width, dimensions.current.height)
        .lineTo(-dimensions.current.width, TOP_BORDER),

    [dimensions]
  )
  return (
    <View
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 80
        }
      ]}
    >
      <Canvas
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 100
        }}
        onSize={dimensions}
        onLayout={event => {
          dimensions.current = {
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height
          }
        }}
      >
        <Group transform={circleTransform}>
          <Circle cx={cx} cy={TOP_BORDER + 10} r={BALL_RADIUS} color="#fff">
            <Shadow dx={0} dy={0} blur={5} color="#00000030" />
          </Circle>
          <Path
            transform={circleIconTransform}
            start={0}
            end={animatedPathEnd}
            style="stroke"
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={3.3}
            path={TABS[activeTab].path}
          />
        </Group>
        <Path
          transform={tabTransform}
          path={path}
          strokeJoin="round"
          color="#fff"
        >
          <Shadow dx={0} dy={0} blur={5} color="#00000030" />
        </Path>
        <Mask
          mask={
            <Path transform={tabTransform} path={path} strokeJoin="round" />
          }
        >
          {[1, 2, 3, 4, 5].map((_, index) => (
            <IconPath
              key={index}
              path={TABS[index].path}
              index={index}
              itemsCount={ITEMS_COUNT}
              dimensions={dimensions}
            />
          ))}
        </Mask>
      </Canvas>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 80,
          paddingHorizontal: HORIZONTAL_PADDING
        }}
      >
        {[1, 2, 3, 4, 5].map((_, index) => (
          <IconButton key={index} onPress={() => setActiveTab(index)} />
        ))}
      </View>
    </View>
  )
}
