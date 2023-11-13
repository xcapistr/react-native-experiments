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
  runTiming
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
        duration: 500
      })
      setTimeout(() => setImage(null), 600)
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
          <Image
            invertClip
            clip={clipPath}
            image={image}
            x={0}
            y={0}
            width={width}
            height={height}
          />
        </Canvas>
      )}
    </ColorSchemeContext.Provider>
  )
}
