import * as React from 'react'
import { Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '../../pages/Home'
import AboutPage from '../../pages/About'

const Tab = createBottomTabNavigator()

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="List Todo"
          component={HomePage}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require('../../../assets/home_selected.png')
                    : require('../../../assets/home.png')
                }
                style={{
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutPage}
          options={{
            tabBarLabel: 'About',
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={
                  focused
                    ? require('../../../assets/about_selected.png')
                    : require('../../../assets/about.png')
                }
                style={{
                  width: size,
                  height: size,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}



export default Navigator
