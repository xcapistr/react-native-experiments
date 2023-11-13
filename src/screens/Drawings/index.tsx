import { ScrollView, View } from 'react-native'
import { Canvas, Path, Skia } from '@shopify/react-native-skia'

const path = Skia.Path.Make()
path.moveTo(128, 0)
path.lineTo(168, 80)
path.lineTo(256, 93)
path.lineTo(192, 155)
path.lineTo(207, 244)
path.lineTo(128, 202)
path.lineTo(49, 244)
path.lineTo(64, 155)
path.lineTo(0, 93)
path.lineTo(88, 80)
path.lineTo(128, 0)
path.close()

export const Drawings = () => {
  return (
    <ScrollView>
      <Canvas style={{ width: 256, height: 256 }}>
        <Path path={path} color="lime" />
      </Canvas>
    </ScrollView>
  )
}
