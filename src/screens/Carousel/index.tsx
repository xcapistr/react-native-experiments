import React, { useCallback } from 'react'
import { View, Text, FlatList } from 'react-native'
import { ITEMS, ITEM_WIDTH, SPACING } from './index.preset'
import { Item } from './parts/Item'
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated'

interface IAnimatedList {
  data: typeof ITEMS
}

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<IAnimatedList['data'][number]>
)

export const Carousel = () => {
  const scrollX = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler(
    event => (scrollX.value = event.contentOffset.x)
  )

  const renderItem = useCallback(
    ({ item, index }: { item: (typeof ITEMS)[0]; index: number }) => {
      return <Item key={item.id} index={index} {...item} scrollX={scrollX} />
    },
    []
  )
  return (
    <View>
      <AnimatedFlatList
        data={ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="fast"
        onScroll={onScroll}
      />
    </View>
  )
}
