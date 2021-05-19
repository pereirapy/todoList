import React from 'react'
import { ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native'

const Loading = ({ show = false }) =>
  show ? (
    <View style={[styles.container]}>
      <View style={[styles.spinner]}>
        <ActivityIndicator size="large" color="red" />
      </View>
    </View>
  ) : null

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: 10000,
  },
  spinner: {
    top: '50%',
  },
})

export default Loading
