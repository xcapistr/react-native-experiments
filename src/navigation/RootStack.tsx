import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Carousel } from '../screens/Carousel'
import { CarouselItem } from '../screens/CarouselItem'
import { Drawings } from '../screens/Drawings'
import { Home } from '../screens/Home'
import { Model3dView } from '../screens/Model3dView'
import { Model3dView2 } from '../screens/Model3dView2'
import { Shaders1 } from '../screens/Shaders1'
import { Shaders2 } from '../screens/Shaders2'
import { Shaders3 } from '../screens/Shaders3'
import { TabBar } from '../screens/TabBar'
import { ThemeSwitch } from '../screens/ThemeSwitch'
import { Routes } from './routes'
import { RootStackParamList } from './types'

const Root = createNativeStackNavigator<RootStackParamList>()

export const RootStack = () => {
  return (
    <Root.Navigator screenOptions={{ headerShown: true }}>
      <Root.Screen name={Routes.HOME} component={Home} />
      <Root.Screen name={Routes.SHADERS_1} component={Shaders1} />
      <Root.Screen name={Routes.SHADERS_2} component={Shaders2} />
      <Root.Screen name={Routes.SHADERS_3} component={Shaders3} />
      <Root.Screen name={Routes.TAB_BAR} component={TabBar} />
      <Root.Screen name={Routes.DRAWINGS} component={Drawings} />
      <Root.Screen name={Routes.CAROUSEL} component={Carousel} />
      <Root.Screen
        name={Routes.CAROUSEL_ITEM}
        component={CarouselItem}
        options={{
          title: ''
        }}
      />
      <Root.Screen name={Routes.THEME_SWITCH} component={ThemeSwitch} />
      <Root.Screen name={Routes.MODEL_3D_VIEW} component={Model3dView} />
      <Root.Screen name={Routes.MODEL_3D_VIEW_2} component={Model3dView2} />
    </Root.Navigator>
  )
}
