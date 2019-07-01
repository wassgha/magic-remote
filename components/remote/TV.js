import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Layout } from '../../constants'

import BtnDouble from './layout/BtnDouble'
import BtnSingle from './layout/BtnSingle'

export default class TV extends Component {
  render() {
    const { style = {} } = this.props

    return (
      <View style={[styles.container, style]} pointerEvents={'all'}>
        <View style={styles.row}>
          <BtnDouble
            name="vol"
            label="vol"
            layout="vertical"
            first={{ name: 'plus', icon: 'plus' }}
            second={{ name: 'minus', icon: 'minus' }}
            handler={this.handleBtn}
          />
          <BtnDouble
            name="ch"
            label="ch"
            layout="vertical"
            first={{ name: 'plus', icon: 'plus' }}
            second={{ name: 'minus', icon: 'minus' }}
            handler={this.handleBtn}
          />
        </View>
        <View style={styles.row}>
          <BtnSingle name="mute" icon="volume-off" handler={this.handleBtn} />
        </View>
        <View style={styles.grid}>
          <BtnSingle
            name="backward"
            icon="skip-backward"
            handler={this.handleBtn}
          />
          <BtnSingle name="play" icon="play" handler={this.handleBtn} />
          <BtnSingle
            name="forward"
            icon="skip-forward"
            handler={this.handleBtn}
          />
          <BtnSingle name="stop" icon="stop" handler={this.handleBtn} />
          <BtnSingle name="pause" icon="pause" handler={this.handleBtn} />
          <BtnSingle
            name="record"
            icon="record"
            color="#FF0000"
            handler={this.handleBtn}
          />
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
