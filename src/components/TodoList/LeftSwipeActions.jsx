import React from 'react'
import { Text, View } from 'react-native'

const LeftSwipeActions = ({ isChecked }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: !isChecked ? '#35EA56' : '#F43E4C', justifyContent: 'center' }}
    >
      <Text
        style={{
          color: '#40394a',
          paddingHorizontal: 10,
          fontWeight: '600',
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        {isChecked ? 'Uncheck' : 'Check'}
      </Text>
    </View>
  )
}

export default LeftSwipeActions
