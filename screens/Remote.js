import React from 'react'
import { StyleSheet, Text, View, Slider } from 'react-native'
import { view } from 'react-easy-state'
import { Magnetometer } from 'expo'
import Touchable from 'react-native-platform-touchable'
import { checkIntersection } from 'line-intersect'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import randomcolor from 'randomcolor'
import uuidv4 from 'uuid/v4'
import _ from 'lodash'
import Coordinate from 'coordinate-systems'

import Title from '../components/Title'
import Button from '../components/Button'
import Screen from '../components/Screen'
import FullWidthButton from '../components/FullWidthButton'

import TVRemote from '../components/remote/TV'
import SpotifyRemote from '../components/remote/Spotify'
import XboxRemote from '../components/remote/Xbox'

import { Theme, Fonts } from '../constants'

const ROOM_WIDTH = 200
const ROOM_HEIGHT = 260
const REMOTE_POS_X = 80
const REMOTE_POS_Y = 100

const DeviceTypes = {
  TV: {
    icon: 'youtube-tv'
  },
  Computer: {
    icon: 'laptop'
  },
  Speaker: {
    icon: 'speaker'
  },
  Light: {
    icon: 'lightbulb'
  },
  Projector: {
    icon: 'projector-screen'
  },
  Xbox: {
    icon: 'xbox'
  },
  Spotify: {
    icon: 'spotify'
  }
}

const degToRad = degrees =>
  (degrees * (Math.PI / 180) + 2 * Math.PI) % (2 * Math.PI)

const radToDeg = radians => (radians * (180 / Math.PI)) % 360

const angleDist = (alpha, beta) => {
  const phi = Math.abs(radToDeg(beta) - radToDeg(alpha)) % 360
  return phi > 180 ? 360 - phi : phi
}

const deviceAngle = (x, y, remoteX, remoteY) => {
  const polarCoords = Coordinate.cart({
    coords: [x - remoteX, y - remoteY],
    isDegree: true
  }).polar()
  return degToRad(polarCoords[1])
}

const normalizeAngleDeg = deg => radToDeg(degToRad(deg))
const normalizeAngle = rad => degToRad(radToDeg(rad))

class Remote extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      devices: [],
      remoteYaw: 0,
      page: 'settings',
      currentDevice: null
    }

    this.remoteYawChangeThrottled_ = _.throttle(this.remoteYawChange, 200)
  }

  componentDidMount() {
    Magnetometer.addListener(({ x = null, y = null, z = null }) => {
      let angle = 0
      let pitch = 0
      if (x != null && y != null && z != null) {
        // angle = Math.atan(-x / y)
        // if (y > 0 && -x > 0) {
        //   //
        // } else if (y < 0) {
        //   angle += Math.PI
        // } else {
        //   angle += Math.PI * 2
        // }
        if (Math.atan2(y, x) >= 0) {
          angle = -Math.atan2(y, x)
        } else {
          angle = -(Math.atan2(y, x) + 2 * Math.PI)
        }

        if (Math.atan2(z, y) >= 0) {
          pitch = -Math.atan2(z, y)
        } else {
          pitch = -(Math.atan2(z, y) + 2 * Math.PI)
        }
      }
      this.setState({
        remoteYaw: normalizeAngle(angle),
        remotePitch: normalizeAngle(pitch)
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.remoteYaw == this.state.remoteYaw) {
      return
    }
    const { remoteYaw = 0, offset = 0, devices = [] } = this.state

    let closestDevice = null
    let closestDeviceDist = 360
    for (const device of devices) {
      const dist = angleDist(
        deviceAngle(device.x, device.y, REMOTE_POS_X, REMOTE_POS_Y),
        normalizeAngle(remoteYaw - offset)
      )
      if (dist < closestDeviceDist) {
        closestDeviceDist = dist
        closestDevice = device
      }
    }
    this.setState({ currentDevice: closestDevice })
  }

  addDevice = type => {
    const { remoteYaw = 0, offset = 0 } = this.state
    const r = Math.pow(ROOM_WIDTH, 2) + Math.pow(ROOM_HEIGHT, 2)
    const cartesianCoords = Coordinate.pol([
      r,
      normalizeAngle(remoteYaw - offset)
    ]).cartesian()
    let x = cartesianCoords[0] + REMOTE_POS_X
    let y = cartesianCoords[1] + REMOTE_POS_Y
    const rpx = REMOTE_POS_X
    const rpy = REMOTE_POS_Y
    const rh = ROOM_HEIGHT
    const rw = ROOM_WIDTH
    const leftIntersection = checkIntersection(rpx, rpx, x, y, 0, 0, 0, rh)
    const rightIntersection = checkIntersection(rpx, rpy, x, y, rw, 0, rw, rh)
    const topIntersection = checkIntersection(rpx, rpx, x, y, 0, rh, rw, rh)
    const bottomIntersection = checkIntersection(rpx, rpy, x, y, 0, 0, rw, 0)
    if (leftIntersection.type == 'intersecting' && x < rpx) {
      x = leftIntersection.point.x
      y = leftIntersection.point.y
    } else if (rightIntersection.type == 'intersecting' && x >= rpx) {
      x = rightIntersection.point.x
      y = rightIntersection.point.y
    } else if (topIntersection.type == 'intersecting' && y >= rpy) {
      x = topIntersection.point.x
      y = topIntersection.point.y
    } else if (bottomIntersection.type == 'intersecting' && y < rpy) {
      x = bottomIntersection.point.x
      y = bottomIntersection.point.y
    }
    this.setState({
      devices: [
        ...this.state.devices,
        {
          id: uuidv4(),
          x,
          y,
          type,
          color: randomcolor()
        }
      ]
    })
  }

  togglePage = () => {
    this.setState({
      page: this.state.page == 'settings' ? 'remote' : 'settings'
    })
  }

  remoteYawChange = angle => {
    this.setState({
      remoteYaw: angle
    })
  }

  recordOrientation = () => {
    this.setState({
      offset: normalizeAngle(this.state.remoteYaw - Math.PI / 2)
    })
  }

  render() {
    const { navigation } = this.props

    const {
      devices = [],
      page = 'remote',
      currentDevice = null,
      remoteYaw = 0,
      remotePitch = 0,
      offset = 0
    } = this.state

    let rotationStyle = {
      transform: [
        {
          rotate: (3 * Math.PI) / 2 - normalizeAngle(remoteYaw - offset) + 'rad'
        }
      ]
    }

    return (
      <Screen
        ref="screen"
        name="Home"
        refreshable={false}
        standalone={true}
        keyboardAware={true}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Title>Remote</Title>
            <View style={styles.btns}>
              <Button
                icon={page == 'settings' ? 'remote' : 'tune'}
                style={styles.headerBtn}
                action={this.togglePage}
              />
            </View>
          </View>
          {page == 'settings' ? (
            <View style={styles.remoteContainer}>
              <Touchable
                onPress={() => this.recordOrientation()}
                style={styles.room}
              >
                <View style={styles.roomContent}>
                  {devices.map(({ x = 0, y = 0, color }, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.device,
                          { bottom: y, left: x, backgroundColor: color }
                        ]}
                      />
                    )
                  })}
                  <View
                    style={[
                      styles.remote,
                      rotationStyle,
                      { bottom: REMOTE_POS_Y, left: REMOTE_POS_X }
                    ]}
                  >
                    <View style={styles.remoteRange} />
                    {/* <Text style={styles.debugText} numberOfLines={0}>
                      {remoteYaw}
                    </Text> */}
                  </View>
                </View>
              </Touchable>
              <Text>Yaw: {radToDeg(remoteYaw)}</Text>
              <Text>Pitch: {radToDeg(remotePitch)}</Text>
              <Slider
                minimumValue={0}
                maximumValue={359}
                minimumTrackTintColor="#1EB1FC"
                maximumTractTintColor="#1EB1FC"
                step={1}
                onValueChange={value =>
                  this.remoteYawChangeThrottled_(degToRad(value))
                }
                style={{ width: 200 }}
                thumbTintColor="#1EB1FC"
              />
              {currentDevice ? (
                <View style={styles.deviceRemote}>
                  <Icon
                    name={DeviceTypes[currentDevice.type].icon}
                    color={Theme.COLORS.TITLE}
                    size={64}
                  />
                  <View style={styles.deviceTitleContainer}>
                    <View
                      style={[
                        styles.deviceColor,
                        {
                          backgroundColor: currentDevice.color
                        }
                      ]}
                    />
                    <Text style={styles.deviceTitle}>{currentDevice.type}</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.deviceRemote}>
                  Not pointing at a device.
                </Text>
              )}
              <FullWidthButton
                action={() => this.addDevice('Xbox')}
                text={'ADD XBOX'}
                icon={'plus'}
                style={{ width: '100%', marginTop: 16 }}
              />
              <FullWidthButton
                action={() => this.addDevice('Light')}
                text={'ADD Light'}
                icon={'plus'}
                style={{ width: '100%', marginTop: 16 }}
              />
              <FullWidthButton
                action={() => this.addDevice('Spotify')}
                text={'ADD Spotify'}
                icon={'plus'}
                style={{ width: '100%', marginTop: 16 }}
              />
              <FullWidthButton
                action={() => this.addDevice('TV')}
                text={'ADD TV'}
                icon={'plus'}
                style={{ width: '100%', marginTop: 16 }}
              />
              <FullWidthButton
                action={() => this.addDevice('Computer')}
                text={'ADD COMPUTER'}
                icon={'plus'}
                style={{ width: '100%', marginTop: 16 }}
              />
            </View>
          ) : (
            <View style={styles.remoteContainer}>
              {currentDevice ? (
                <View style={styles.deviceRemote}>
                  <Icon
                    name={DeviceTypes[currentDevice.type].icon}
                    color={Theme.COLORS.TITLE}
                    size={64}
                  />
                  <View style={styles.deviceTitleContainer}>
                    <View
                      style={[
                        styles.deviceColor,
                        {
                          backgroundColor: currentDevice.color
                        }
                      ]}
                    />
                    <Text style={styles.deviceTitle}>{currentDevice.type}</Text>
                  </View>
                  {currentDevice.type == 'TV' ? (
                    <TVRemote />
                  ) : currentDevice.type == 'Spotify' ? (
                    <SpotifyRemote />
                  ) : currentDevice.type == 'Xbox' ? (
                    <XboxRemote />
                  ) : (
                    <View />
                  )}
                </View>
              ) : (
                <Text style={styles.deviceRemote}>
                  Point to a device to show its remote control.
                </Text>
              )}
            </View>
          )}
        </View>
        <View style={styles.bottomSpacer} />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'column'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btns: {
    flexDirection: 'row'
  },
  headerBtn: {
    marginLeft: 16
  },
  text: {
    color: Theme.COLORS.TEXT,
    ...Fonts.FONT_PRIMARY_500
  },
  remoteContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ perspective: 200 }]
  },
  room: {
    width: ROOM_WIDTH,
    height: ROOM_HEIGHT,
    backgroundColor: Theme.COLORS.ACCENT,
    borderRadius: 4,
    overflow: 'hidden'
    // transform: [{ rotateX: '80deg' }, { rotateZ: '10deg' }, { translateY: 100 }]
  },
  roomContent: {
    width: '100%',
    height: '100%'
  },
  device: {
    width: 8,
    height: 8,
    backgroundColor: Theme.COLORS.MAIN + '80',
    borderRadius: 2,
    position: 'absolute',
    marginLeft: -4,
    marginBottom: -4,
    zIndex: 2
  },
  remote: {
    width: 8,
    height: 8,
    backgroundColor: Theme.COLORS.TEXT,
    borderRadius: 4,
    position: 'absolute',
    marginLeft: -4,
    marginBottom: -4,
    zIndex: 2
  },
  remoteRange: {
    width: 10,
    height: 90,
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -50,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 1000,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Theme.COLORS.TEXT + '30',
    zIndex: 1
  },
  debugText: {
    position: 'absolute',
    width: 200
  },
  deviceRemote: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  deviceTitleContainer: {
    color: Theme.COLORS.TITLE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  deviceTitle: {
    color: Theme.COLORS.TITLE,
    ...Fonts.FONT_PRIMARY_500
  },
  bottomSpacer: {
    height: 60
  },
  deviceColor: {
    width: 8,
    height: 8,
    borderRadius: 2,
    marginRight: 8
  }
})

export default view(Remote)
