import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Layout } from '../../constants'

import BtnDouble from './layout/BtnDouble'
import BtnSingle from './layout/BtnSingle'
import Media from './layout/Media'

export default class Spotify extends Component {
  handleBtn() {}

  render() {
    const { style = {} } = this.props

    return (
      <View style={[styles.container, style]} pointerEvents={'all'}>
        <View style={styles.row}>
          <Media
            title="Mercy"
            album="Illuminate"
            artist="Shawn Mendes"
            cover="https://i0.wp.com/themusicalhype.com/wp-content/uploads/2017/10/shawn-mendes-illuminate-island.jpg?fit=2480%2C2480&ssl=1"
            size={200}
            name={'media'}
            handler={this.handleBtn}
          />
        </View>

        <View style={styles.row}>
          <BtnSingle
            name="like"
            icon="check"
            color="#1DB954"
            handler={this.handleBtn}
          />
          <BtnDouble
            name="vol"
            label="vol"
            layout="horizontal"
            first={{ name: 'plus', icon: 'plus' }}
            second={{ name: 'minus', icon: 'minus' }}
            handler={this.handleBtn}
          />
        </View>

        <View style={styles.grid}>
          <BtnSingle name="repeat" icon="repeat" handler={this.handleBtn} />
          <BtnSingle name="mute" icon="volume-off" handler={this.handleBtn} />
          <BtnSingle name="shuffle" icon="shuffle" handler={this.handleBtn} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: (Layout.iconSize + 16 * 2 + 8 * 2) * 3,
    marginTop: 16
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: (Layout.iconSize + 16 * 2 + 8 * 2) * 3,
    marginTop: 16
  }
})
