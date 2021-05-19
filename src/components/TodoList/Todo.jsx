import React, { Component } from 'react'
import { Alert, StyleSheet, View, Text } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { fireStore } from '../../services'

class Todo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isChecked: props.complete,
      backgroundColor: 'white',
    }
    this.toggleComplete = this.toggleComplete.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.onLongPress = this.onLongPress.bind(this)
  }

  async toggleComplete() {
    const { id, updateItem, title } = this.props
    const { isChecked } = this.state

    try {
      this.setState({ isChecked: !isChecked })
      updateItem({ id, complete: !isChecked, title })

      await fireStore.update(id, {
        complete: !isChecked,
      })
    } catch (error) {
      Alert.alert('Something is wrong! Try again.')
      this.setState({ isChecked: !isChecked })
      updateItem({ id, complete: !isChecked, title })
    }
  }

  async deleteTodo() {
    try {
      const { id, loadList } = this.props

      await fireStore.delete(id)
      await loadList(true)
    } catch (error) {
      console.log(error)
      this.setState({ isChecked: !isChecked })
    }
  }

  onLongPress() {
    this.setState({ backgroundColor: 'red' })
    const { title } = this.props

    Alert.alert(
      'Are you sure you want to delete?',
      `If you confirm this action, the item '${title}' can't be undone`,
      [
        {
          text: 'Cancel',
          onPress: () => this.setState({ backgroundColor: 'white' }),
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => this.deleteTodo() },
      ]
    )
  }

  render() {
    const { isChecked } = this.state
    const { title } = this.props
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor,
          height: 60,
          paddingTop: 13,
          padding: 5,
          borderBottomColor: '#dedede',
          borderBottomWidth: 1
              }}
      >
        <BouncyCheckbox
          size={25}
          style={styles.checkbox}
          fillColor={isChecked ? '#35EA56' : '#F43E4C'}
          unfillColor="#FFFFFF"
          onLongPress={this.onLongPress}
          isChecked={isChecked}
          disableBuiltInState={true}
          text={title}
          iconStyle={{ borderColor: isChecked ? '#35EA56' : '#F43E4C' }}
          textStyle={{ fontFamily: 'Arial' }}
          onPress={this.toggleComplete}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  checkbox: {
    padding: 5,
    textAlign: 'center',
  },
})

export default Todo
