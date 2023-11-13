import { useCallback } from 'react'
import { View, Text, Appearance, TouchableOpacity } from 'react-native'
import { useColorScheme } from '../../context/colorScheme'

export const ThemeSwitch = () => {
  const { isDark, toggleTheme, theme } = useColorScheme()

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: isDark ? '#000' : '#fff'
      }}
    >
      <TouchableOpacity
        onPress={({ nativeEvent: { pageX, pageY } }) =>
          toggleTheme({ x: pageX, y: pageY })
        }
        style={{
          padding: 10,
          borderRadius: 5,
          backgroundColor: isDark ? '#333' : '#ccc'
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textTransform: 'uppercase',
            color: isDark ? '#fff' : '#333'
          }}
        >
          {theme}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
