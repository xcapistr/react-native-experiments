import React, { useMemo } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { ITEMS, RADIUS } from '../Carousel/index.preset'
import Animated from 'react-native-reanimated'

export const CarouselItem = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'CarouselItem'>) => {
  const id = useMemo(() => route.params.id, [route.params.id])
  const data = useMemo(() => ITEMS.find(item => item.id === id), [])

  return data ? (
    <Animated.View
      style={{
        height: 600,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 100
      }}
    >
      <Animated.Image
        source={{ uri: data.imageUrl }}
        style={[StyleSheet.absoluteFillObject, { resizeMode: 'cover' }]}
        sharedTransitionTag={`carousel-image-${id}`}
      />
      <Animated.Text
        style={[
          {
            color: '#fff',
            textTransform: 'uppercase',
            fontSize: 18,
            fontWeight: '800',
            zIndex: 2,
            transform: [{ scale: 2 }]
          }
        ]}
        sharedTransitionTag={`carousel-text-${id}`}
      >
        {data.title}
      </Animated.Text>
    </Animated.View>
  ) : null
}
