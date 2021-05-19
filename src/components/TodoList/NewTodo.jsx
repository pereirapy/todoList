import React, { useState, createRef } from 'react'
import { Alert, Keyboard } from 'react-native'
import { fireStore } from '../../services'
import FormTodo from './FormTodo'

const NewTodo = ({ loadList = (f) => f }) => {
  const [todo, setTodo] = useState('')
  const childRef = createRef()

  async function addTodo() {
    if (todo === '') {
      childRef.current.focus()
      Alert.alert('Write something')
      return
    }
    try {
      await fireStore.add({
        title: todo,
        createdAt: new Date(),
        complete: false,
      })
      setTodo('')
      Keyboard.dismiss()
      await loadList()
    } catch (error) {
      Alert.alert('Something is wrong! Try again.')
    }
  }

  return (
    <FormTodo ref={childRef} addTodo={addTodo} setTodo={setTodo} todo={todo} />
  )
}

export default NewTodo
