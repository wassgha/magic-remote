import React from 'react'
import { view } from 'react-easy-state'
import { StyleSheet } from 'react-native'
import { AppLoading, Font, Asset } from 'expo'

import { TopLevelNavigation } from './navigation/TopLevel'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoadingComplete: false
    }

    // eslint-disable-next-line
    console.ignoredYellowBox = ['Setting a timer', 'Remote debugger']
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require('./assets/images/logo.png')]),
      Font.loadAsync({
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf')
      })
    ])
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
        />
      )
    }
    return <TopLevelNavigation />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default view(App)
