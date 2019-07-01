import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Color from 'color'
import Touchable from 'react-native-platform-touchable'

import CommonStyles from '../../../styles/CommonStyles'
import { Theme, Layout } from '../../../constants'

export default class BtnSingle extends Component {
  render() {
    const {
      name,
      style = {},
      color = Theme.COLORS.ACCENT,
      icon = 'settings',
      size = Layout.iconSize,
      handler = () => {}
    } = this.props

    const accentColor =
      Color(color).luminosity() < 0.7
        ? Theme.COLORS.ALWAYS_LIGHT
        : Theme.COLORS.ALWAYS_DARK

    return (
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: color,
            borderRadius: ((size + 16 * 2 + 8 * 2) * 3) / 2
          }
        ]}
        pointerEvents={'all'}
      >
        <View style={styles.row} pointerEvents={'all'}>
          <View style={styles.topBtn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_up')}
            >
              <Icon
                name={'chevron-up'}
                size={size}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
        </View>
        <View style={styles.row} pointerEvents={'all'}>
          <View style={styles.leftBtn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_left')}
            >
              <Icon
                name={'chevron-left'}
                size={size}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
          <View
            style={[
              styles.mainBtn,
              style,
              {
                backgroundColor: color,
                width: size + 16 * 2 + 8,
                height: size + 16 * 2 + 8,
                borderRadius: (size + 16 * 2 + 8) / 2
              }
            ]}
            pointerEvents={'all'}
          >
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_main')}
            >
              <Icon
                name={icon}
                size={size}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
          <View style={styles.rightBtn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_right')}
            >
              <Icon
                name={'chevron-right'}
                size={size}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
        </View>
        <View style={styles.row} pointerEvents={'all'}>
          <View style={styles.bottomBtn} pointerEvents={'all'}>
            <Touchable
              style={styles.touchable}
              onPress={handler.bind(this, name + '_down')}
            >
              <Icon
                name={'chevron-down'}
                size={size}
                color={accentColor}
                style={CommonStyles.icon}
              />
            </Touchable>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8
  },
  mainBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Theme.COLORS.BG,
    borderWidth: 4
  },
  touchable: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
