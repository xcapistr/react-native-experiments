import React, {
  type PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Appearance,
  Dimensions,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native'
import {
  makeImageFromView,
  SkImage,
  Canvas,
  Image,
  Skia,
  useComputedValue,
  useValue,
  runTiming,
  Mask,
  Circle,
  Rect,
  Group,
  Blur,
  DisplacementMap,
  Turbulence
} from '@shopify/react-native-skia'
import { useSharedValue, withTiming } from 'react-native-reanimated'

import { ColorSchemeContext } from './ColorSchemeContext'

export const ColorSchemeProvider = ({ children }: PropsWithChildren) => {
  const { width, height } = Dimensions.get('window')
  const contentRef = useRef(null)
  const [image, setImage] = useState<SkImage | null>(null)
  const radius = useValue(0)
  const cx = useValue(0)
  const cy = useValue(0)

  const theme = useColorScheme()

  const toggleTheme = useCallback(
    async ({ x, y }: { x: number; y: number }) => {
      cx.current = x
      cy.current = y
      if (contentRef.current) {
        const snapshot = await makeImageFromView(contentRef)
        setImage(snapshot)
      }
      theme === 'dark'
        ? Appearance.setColorScheme('light')
        : Appearance.setColorScheme('dark')

      radius.current = 0
      runTiming(radius, height, {
        duration: 2000
      })
      setTimeout(() => setImage(null), 2000)
    },
    [theme, height]
  )

  const isDark = useMemo(() => theme === 'dark', [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark
    }),
    [theme, toggleTheme, isDark]
  )

  const clipPath = useComputedValue(() => {
    const path = Skia.Path.Make()
    path.addCircle(cx.current, cy.current, radius.current)
    return path
  }, [radius, cx, cy])

  return (
    <ColorSchemeContext.Provider value={value}>
      <View ref={contentRef} style={{ flex: 1 }}>
        {children}
      </View>
      {image && (
        <Canvas style={[StyleSheet.absoluteFill]}>
          <Mask
            mode="luminance"
            mask={
              <Group>
                {/* <Blur blur={1} /> */}
                <DisplacementMap channelX="r" channelY="r" scale={50}>
                  <Turbulence
                    freqX={0.005}
                    freqY={0.005}
                    octaves={5}
                    seed={2}
                  />
                </DisplacementMap>
                <Rect
                  x={-100}
                  y={-100}
                  width={width + 200}
                  height={height + 200}
                  color="#fff"
                />
                <Circle cx={cx} cy={cy} r={radius} color="#000" />
              </Group>
            }
          >
            <Image
              invertClip
              //   clip={clipPath}
              image={image}
              x={0}
              y={0}
              width={width}
              height={height}
            />
          </Mask>
        </Canvas>
      )}
    </ColorSchemeContext.Provider>
  )
}
