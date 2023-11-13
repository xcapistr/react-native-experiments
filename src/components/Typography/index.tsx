import { Text, TextProps } from 'react-native'
import { useColorScheme } from '../../context/colorScheme'

export const Typography = ({ children, style, ...props }: TextProps) => {
  const { isDark } = useColorScheme()
  return (
    <Text style={[{ color: isDark ? '#fff' : '#333' }, style]} {...props}>
      {children}
    </Text>
  )
}
