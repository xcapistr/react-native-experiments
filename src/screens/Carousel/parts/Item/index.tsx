import {
  Image,
  View,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  Easing
} from 'react-native'
import {
  ITEMS,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  RADIUS,
  SPACING
} from '../../index.preset'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'
import { Routes } from '../../../../navigation/routes'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated'

export interface IItem {
  id: string
  index: number
  title: string
  imageUrl: string
  scrollX: SharedValue<number>
}

export const Item = ({ id, index, title, imageUrl, scrollX }: IItem) => {
  const { navigate } = useNavigation()
  const handlePress = useCallback(
    () => navigate(Routes.CAROUSEL_ITEM, { id }),
    [id]
  )

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [
        (index - 2) * (ITEM_WIDTH + SPACING * 2),
        index * (ITEM_WIDTH + SPACING * 2),
        (index + 2) * (ITEM_WIDTH + SPACING * 2)
      ],
      [100, 0, -100],
      Extrapolate.CLAMP
    )

    return {
      transform: [{ translateX }]
    }
  })

  const animatedImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        (index - 1) * (ITEM_WIDTH + SPACING * 2),
        index * (ITEM_WIDTH + SPACING * 2),
        (index + 1) * (ITEM_WIDTH + SPACING * 2)
      ],
      [1, 1.2, 1],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ scale }]
    }
  })

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={{
          width: ITEM_WIDTH,
          height: ITEM_HEIGHT,
          borderRadius: RADIUS,
          overflow: 'hidden',
          marginHorizontal: SPACING,
          marginVertical: 70,
          padding: 10,
          justifyContent: 'flex-end'
        }}
      >
        <Animated.Image
          source={{ uri: imageUrl }}
          style={[
            StyleSheet.absoluteFillObject,
            { resizeMode: 'cover', borderRadius: RADIUS, overflow: 'hidden' }
            // animatedImageStyle
          ]}
          sharedTransitionTag={`carousel-image-${id}`}
        />
        <Animated.Text
          style={[
            {
              color: '#fff',
              textTransform: 'uppercase',
              fontSize: 18,
              fontWeight: '800',
              zIndex: 2
            },
            animatedTextStyle
          ]}
          sharedTransitionTag={`carousel-text-${id}`}
        >
          {title}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}
