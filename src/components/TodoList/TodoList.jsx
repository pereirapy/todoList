import React, { Component } from 'react'
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native'
import { reduce, map, filter, pipe } from 'lodash/fp'
import Todo from './Todo'
import Loading from '../Loading/Loading'
import NewTodo from './NewTodo'
import { fireStore } from '../../services'

class TodosList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      sections: [],
      loading: false,
    }
    this.loadList = this.loadList.bind(this)
    this.updateSection = this.updateSection.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  async loadList(useLoading) {
    if (useLoading) this.setState({ loading: true })
    try {
      const data = await fireStore.getAll()
      const list = reduce(
        (acc, doc) => {
          const data = doc.data()

          return [
            ...acc,
            {
              ...data,
              id: doc.id,
            },
          ]
        },
        [],
        data.docs
      )
      this.updateTodo(list)
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      Alert.alert('Something is wrong! Try again.')
    }
  }

  componentDidMount() {
    this.loadList(true)
  }

  updateSection(list) {
    const todoIncomplete = pipe(
      filter((todo) => !todo.complete),
      (data) => {
        return { title: 'Incomplete', type: 'incomplete', data }
      }
    )(list)
    const todoComplete = pipe(
      filter((todo) => todo.complete),
      (data) => {
        return { title: 'Complete', type: 'complete', data }
      }
    )(list)

    const sections = [todoIncomplete, todoComplete]
    this.setState({ sections })
  }

  updateTodo(todosUpdated) {
    this.setState({ todos: todosUpdated })
    this.updateSection(todosUpdated)
  }

  updateItem(newItem) {
    const { todos } = this.state
    const todosUpdated = map((todo) => {
      if (todo.id === newItem.id) return newItem
      return todo
    }, todos)
    this.updateTodo(todosUpdated)
  }

  renderItem({ item }) {
    return (
      <Todo {...item} loadList={this.loadList} updateItem={this.updateItem} />
    )
  }

  renderSectionHeader({ section }) {
    return (
      <View style={[styles.sectionHeader, styles[section.type]]}>
        <Text>{section.title}</Text>
      </View>
    )
  }

  listEmptyComponent() {
    return <Text style={styles.noData}>No data</Text>
  }

  render() {
    const { loading, sections } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <Loading show={loading} />
        <NewTodo loadList={this.loadList} />
        <SectionList
          style={styles.scrollView}
          sections={sections}
          renderSectionHeader={this.renderSectionHeader}
          ListEmptyComponent={this.listEmptyComponent}
          refreshing={loading}
          onRefresh={this.loadList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignSelf: 'center',
    flex: 1,
    minWidth: 385,
  },
  scrollView: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
  },
  sectionHeader: {
    paddingTop: 12,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    marginTop: 20,
    height: 50,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  complete: {
    borderTopColor: '#35EA56',
    borderBottomColor: '#35EA56',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  incomplete: {
    borderTopColor: '#F43E4C',
    borderBottomColor: '#F43E4C',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  noData: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
    height: 30,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
})

export default TodosList
