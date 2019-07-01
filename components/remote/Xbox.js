import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Layout } from '../../constants'

import DirectionalPad from './layout/DirectionalPad'
import BtnDouble from './layout/BtnDouble'
import BtnSingle from './layout/BtnSingle'
import Media from './layout/Media'

export default class Xbox extends Component {
  render() {
    const { style = {} } = this.props

    return (
      <View style={[styles.container, style]} pointerEvents={'all'}>
        <View style={styles.row}>
          <DirectionalPad
            name="pad"
            icon="circle-outline"
            handler={this.handleBtn}
          />
        </View>

        <View style={styles.row}>
          <BtnDouble
            name="vol"
            label="vol"
            layout="horizontal"
            first={{ name: 'plus', icon: 'plus' }}
            second={{ name: 'minus', icon: 'minus' }}
            handler={this.handleBtn}
          />
          <BtnSingle
            name="home"
            icon="xbox"
            color="#1DB954"
            handler={this.handleBtn}
          />
        </View>

        <View style={styles.grid}>
          <BtnSingle name="list" icon="menu" handler={this.handleBtn} />
          <BtnSingle
            name="menu"
            icon="window-restore"
            handler={this.handleBtn}
          />
          <BtnSingle name="mute" icon="volume-off" handler={this.handleBtn} />
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
