import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { LinearGradient } from 'expo'
import Color from 'color'
import Touchable from 'react-native-platform-touchable'

import CommonStyles from '../../../styles/CommonStyles'
import { Theme, Fonts } from '../../../constants'

export default class Media extends Component {
  render() {
    const {
      name,
      title,
      album,
      cover,
      artist,
      size = 220,
      style = {},
      handler = () => {}
    } = this.props

    const accentColor =
      Color(Theme.COLORS.ACCENT).luminosity() < 0.7
        ? Theme.COLORS.ALWAYS_LIGHT
        : Theme.COLORS.ALWAYS_DARK

    return (
      <View
        style={[styles.container, { width: size, height: size }, style]}
        pointerEvents={'all'}
      >
        {cover && <Image style={styles.cover} source={{ url: cover }} />}
        {cover && (
          <LinearGradient
            colors={[Theme.COLORS.BG + '00', Theme.COLORS.BG + 'AA']}
            style={styles.coverBg}
            pointerEvents={'none'}
          />
        )}
        <View style={styles.controls}>
          <View style={styles.btn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_backward')}
            >
              <Icon
                name={'skip-backward'}
                size={24}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
          <View style={styles.btn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_play')}
            >
              <Icon
                name={'play'}
                size={32}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
          <View style={styles.btn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_forward')}
            >
              <Icon
                name={'skip-forward'}
                size={24}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
        </View>
        <Text style={styles.title}>
          {title} - {album}
        </Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden',
    margin: 8
  },
  touchable: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controls: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  },
  title: {
    color:
      Color(Theme.COLORS.ACCENT).luminosity() < 0.7
        ? Theme.COLORS.ALWAYS_LIGHT
        : Theme.COLORS.ALWAYS_DARK,
    ...Fonts.FONT_PRIMARY_800,
    fontSize: 16,
    marginBottom: 8
  },
  artist: {
    color:
      (Color(Theme.COLORS.ACCENT).luminosity() < 0.7
        ? Theme.COLORS.ALWAYS_LIGHT
        : Theme.COLORS.ALWAYS_DARK) + 'AA',
    ...Fonts.FONT_PRIMARY_600,
    fontSize: 14,
    marginBottom: 8
  },
  coverBg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 120
  }
})
