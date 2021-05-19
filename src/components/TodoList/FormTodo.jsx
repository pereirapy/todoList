import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'

const FormTodo = React.forwardRef(
  ({ addTodo = (f) => f, setTodo = (f) => f, todo }, ref) => {
    const preAddTodo = () => {
      if (todo !== '') addTodo()
    }

    const isWeb = Platform.OS !== 'android' && Platform.OS !== 'ios'
    const placeHolder = `New todo... ${isWeb ? '' : 'Press enter to save'}`

    return (
      <View style={[styles.container, isWeb ? styles.web : styles.native]}>
        <TextInput
          ref={ref}
          style={styles.txtInput}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          onEndEditing={preAddTodo}
          placeholder={placeHolder}
        />
        {isWeb && (
          <TouchableOpacity style={styles.button} title="Add" onPress={addTodo}>
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  web: {
    height: 120,
  },
  native: {
    height: 60,
  },
  button: {
    backgroundColor: '#2B67F1',
    borderWidth: 0,
    fontSize: 20,
    margin: 5,
    borderRadius: 5,
    padding: 5,
    paddingTop: 15,
    flex: 1,
    height: 40,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
  txtInput: {
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    fontSize: 20,
    margin: 5,
    padding: 5,
    flex: 1,
    height: 40,
  },
})

export default FormTodo
