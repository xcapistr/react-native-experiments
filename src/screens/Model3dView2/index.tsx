import { View } from 'react-native'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { Scene } from './parts/Scene'
import { Text } from 'react-native'
import { Gyroscope } from 'expo-sensors'
import { SensorType, useAnimatedSensor } from 'react-native-reanimated'
import { Subscription } from 'expo-sensors/build/DeviceSensor'

export const Model3dView2 = () => {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100
  })

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 2
        }}
      >
        <Suspense fallback={null}>
          <Scene animatedSensor={animatedSensor} />
        </Suspense>
      </Canvas>
    </View>
  )
}
