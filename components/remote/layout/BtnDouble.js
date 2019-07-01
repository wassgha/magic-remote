import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Color from 'color'
import Touchable from 'react-native-platform-touchable'

import CommonStyles from '../../../styles/CommonStyles'
import { Theme, Layout } from '../../../constants'

export default class BtnDouble extends Component {
  render() {
    const {
      name,
      style = {},
      color = Theme.COLORS.ACCENT,
      first,
      second,
      layout = 'vertical',
      label = '',
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
            borderRadius: (size + 16 * 2) / 2,
            flexDirection: layout == 'vertical' ? 'column' : 'row'
          }
        ]}
        pointerEvents={'all'}
      >
        {first && (
          <Touchable
            style={styles.touchable}
            onPress={handler.bind(this, name + '-' + first.name)}
          >
            <Icon
              name={first.icon}
              size={size}
              color={accentColor}
              style={CommonStyles.icon}
            />
          </Touchable>
        )}
        <Text
          style={[
            styles.label,
            {
              color: accentColor
            }
          ]}
        >
          {label}
        </Text>
        {second && (
          <Touchable
            style={styles.touchable}
            onPress={handler.bind(this, name + '-' + second.name)}
          >
            <Icon
              name={second.icon}
              size={size}
              color={accentColor}
              style={CommonStyles.icon}
            />
          </Touchable>
        )}
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
  touchable: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    textTransform: 'uppercase',
    color: Theme.COLORS.ACCENT
  }
})
