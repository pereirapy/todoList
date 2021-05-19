import React, { Component, useCallback } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Linking,
  TouchableHighlight,
} from 'react-native'

const linkedin = {
  url: 'https://www.linkedin.com/in/pereirapy/',
  image: require('../../../assets/linkedin.png'),
}
const gitHub = {
  url: 'http://github.com/pereirapy',
  image: require('../../../assets/github.png'),
}

const OpenURLButton = ({ data, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(data.url)

    if (supported) {
      await Linking.openURL(data.url)
    } else {
      Alert.alert(`Don't know how to open this URL: ${data.url}`)
    }
  }, [data.url])

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#dedede"
      onPress={handlePress}
    >
      <Image title={children} style={styles.cv} source={data.image} />
    </TouchableHighlight>
  )
}

class AboutScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/rodrigo.jpg')}
        />
        <Text style={styles.name}>Rodrigo Pereira</Text>
        <Text style={styles.myHistory}>
          After many years programming in the LAMP stack, I decided to give my
          career a turn by embracing Node.js and the SPA front-end frameworks
          React.js and Vue.js.
        </Text>

        <Text style={styles.myHistory}>
          I am a passionate Full Stack Web Developer, who likes to develop
          applications that are used by many people around the world.
        </Text>

        <Text style={styles.myHistory}>
          My colleagues say my greatest skill is Team-work and that I play well
          in an Agile environment.
        </Text>

        <Text style={styles.myHistory}>
          I am looking for a remote position where I can equally contribute and
          learn.
        </Text>
        <View style={styles.containerIcons}>
          <View style={styles.row}>
            <OpenURLButton data={linkedin}>LinkedIn</OpenURLButton>
            <OpenURLButton data={gitHub}>GitHub</OpenURLButton>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myHistory: {
    padding: 5,
    margin: 5,
    fontSize: 15,
    fontStyle: 'italic',
  },
  containerIcons: {
    padding: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  cv: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    margin: 15,
  },
})

export default AboutScreen
