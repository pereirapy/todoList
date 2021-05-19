import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import NavigationContainer from './src/components/Navigator/Navigator'


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer />
      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
