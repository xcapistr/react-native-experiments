import { View } from 'react-native'
import { Canvas } from '@react-three/fiber'
import React, { useEffect, useState } from 'react'
import { Scene } from './parts/Scene'
import { Text } from 'react-native'
import { Gyroscope } from 'expo-sensors'
import { SensorType, useAnimatedSensor } from 'react-native-reanimated'
import { Subscription } from 'expo-sensors/build/DeviceSensor'

export const Model3dView = () => {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100
  })

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0
  })
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData)
      })
    )
  }
  const _unsubscribe = () => {
    subscription && subscription.remove()
    setSubscription(null)
  }

  useEffect(() => {
    _subscribe()
    return () => _unsubscribe()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Canvas
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Scene animatedSensor={animatedSensor} />
      </Canvas>
      <Text style={{ position: 'absolute', bottom: 50, left: 5 }}>
        {/* <Text>
          {x}
          {'\n'}
          {y}
          {'\n'}
          {z}
        </Text> */}
      </Text>
    </View>
  )
}
