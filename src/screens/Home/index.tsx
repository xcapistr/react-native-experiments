import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Routes } from '../../navigation/routes'
import { MENU_ITEMS } from './index.preset'
import { Typography } from '../../components/Typography'

export type MenuItem = {
  label: string
  route: (typeof Routes)[keyof typeof Routes]
}

export const Home = () => {
  const { navigate } = useNavigation()
  const renderItem = useCallback(
    ({ item }: { item: MenuItem }) => (
      <TouchableOpacity
        onPress={() => navigate(item.route)}
        style={{ padding: 8 }}
      >
        <Typography style={{ fontSize: 18, lineHeight: 24 }}>
          {item.label}
        </Typography>
      </TouchableOpacity>
    ),
    []
  )
  const keyExtractor = (item: MenuItem) => item.label
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, minHeight: '100%' }}
      data={MENU_ITEMS}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  )
}
