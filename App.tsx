import { StatusBar } from 'expo-status-bar'
import React, { useMemo } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootStack } from './src/navigation/RootStack'
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme
} from '@react-navigation/native'
import { navigationRef } from './src/navigation/utils'
import { ColorSchemeProvider } from './src/context/colorScheme'

export default function App() {
  const theme = useColorScheme()
  const isDark = useMemo(() => theme === 'dark', [theme])

  return (
    <ColorSchemeProvider>
      <SafeAreaProvider
        style={{ backgroundColor: isDark ? '#131212' : '#fff' }}
      >
        <NavigationContainer
          ref={navigationRef}
          theme={isDark ? DarkTheme : DefaultTheme}
        >
          <StatusBar style="auto" />
          <SafeAreaView style={{ flex: 1 }}>
            <RootStack />
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </ColorSchemeProvider>
  )
}
