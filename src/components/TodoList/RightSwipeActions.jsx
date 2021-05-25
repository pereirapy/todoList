import React from 'react'
import { Text, View } from 'react-native'

const RightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 60,
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          color: 'white',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,

        }}
      >
        Delete
      </Text>
    </View>
  )
}

export default RightSwipeActions
