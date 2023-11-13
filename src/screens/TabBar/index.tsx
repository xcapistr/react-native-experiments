import { ScrollView, View } from 'react-native'
import {
  Skia,
  Canvas,
  Shader,
  Fill,
  vec,
  useValue,
  Path,
  DisplacementMap,
  Turbulence
} from '@shopify/react-native-skia'
import { withTiming, Easing, useSharedValue } from 'react-native-reanimated'
import { Text } from 'react-native'
import { TabBar as TabBarComp } from './parts/TabBar'
import { useEffect, useState } from 'react'
import { TABS } from './parts/TabBar/index.preset'

export const TabBar = () => {
  const [activeTab, setActiveTab] = useState(2)
  const dimensions = useValue({ width: 0, height: 0 })
  const animatedPathEnd = useSharedValue(0)

  useEffect(() => {
    animatedPathEnd.value = withTiming(1, {
      duration: 2000,
      easing: Easing.bezierFn(0, 0.5, 0.5, 1)
    })
  }, [activeTab])
  return (
    <>
      <ScrollView
        style={{ backgroundColor: '#3467ce' }}
        contentContainerStyle={{
          gap: 20,
          padding: 20,
          paddingBottom: 100,
          alignItems: 'center',
          justifyContent: 'space-around',
          minHeight: '100%'
        }}
      >
        <Canvas
          onSize={dimensions}
          onLayout={event => {
            dimensions.current = {
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height
            }
          }}
          style={{
            width: 250,
            height: 250
          }}
        >
          <Path
            transform={[{ scale: 7 }, { translateX: 1, translateY: 1 }]}
            start={0}
            end={animatedPathEnd}
            style="stroke"
            strokeCap="round"
            strokeJoin="round"
            strokeWidth={3.3}
            path={TABS[activeTab].path}
            color="#fff"
          >
            <DisplacementMap channelX="g" channelY="a" scale={2}>
              <Turbulence freqX={0.5} freqY={0.5} octaves={10} seed={11} />
            </DisplacementMap>
          </Path>
        </Canvas>
        <Text style={{ color: '#fff' }}>
          Anim laborum deserunt enim fugiat eu aute dolor sint. Eu minim aute
          consequat officia enim Lorem do officia veniam excepteur fugiat
          pariatur aliquip. Id nulla veniam dolor ea dolore ad cillum ex
          occaecat amet pariatur. Nisi non occaecat deserunt occaecat ullamco
          duis incididunt quis. Sint deserunt fugiat labore ipsum cillum labore
          proident sunt. Aute laborum id reprehenderit id aliquip ea sit.
        </Text>
      </ScrollView>
      <TabBarComp
        activeTab={activeTab}
        setActiveTab={(index: number) => {
          animatedPathEnd.value = 0
          setActiveTab(index)
        }}
      />
    </>
  )
}
