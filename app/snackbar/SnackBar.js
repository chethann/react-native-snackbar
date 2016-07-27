import React, {Component} from 'react';

import {
  View,
  Animated,
  Dimensions,
  Text,
  StyleSheet,
  PanResponder
} from 'react-native';

const {height, width} = Dimensions.get('window');
//time after which snack bar will be self dismissed!
const DEFAULT_TIMEOUT = 10;
//snack bar will be dismmised if user swipes beyound DISMISS_THRESHOLD% of screen width
const DISMISS_THRESHOLD = 0.5;

class SnackBar extends Component {
  constructor(props) {
    super(props);
    this.handlePanResponderMove = this.handlePanResponderMove.bind(this);
    this.handlePanResponderEnd = this.handlePanResponderEnd.bind(this);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });

    this.left = 0;
    this.opacity = 1;
    this.shouldHide = false;
    this.backgroundColor = this.props.backgroundColor || '#29303F';
    this.textColor = this.props.textColor || '#FFFFFF';

    this.onDismiss = this.props.onDismiss;

    this.snackBarStyles = {
      style: {
        left: this.left,
        opacity: this.opacity,
        backgroundColor: this.backgroundColor
      }
    };

    this.state = {
      hide: false
    }

    if(!this.props.infinite) {
      let showDuration = this.props.duration || DEFAULT_TIMEOUT;
      this.hideTimeout = setTimeout(() => {
        this.setState({
          hide: true
        })
        this.onDismiss && this.onDismiss()
      }, showDuration * 1000)
    }
  }

  render() {
    return this.state.hide ? null :
      (<Animated.View style={[this.snackBarStyles.style, this.props.style, styles.container]} ref={(snackBar) => {
            this.snackBar = snackBar;
          }} {...this.panResponder.panHandlers}>
          <Text style={[styles.text, {color : this.textColor}]}>{this.props.message}</Text>
      </Animated.View>);
  }

  componentWillUnmount() {
    clearTimeout(this.hideTimeout);
  }

  handlePanResponderMove(e, gestureState) {
    this.snackBarStyles.style.left = this.left + gestureState.dx;
    this.getOpacity();
    this.updateNativeStyles();
  }
  handlePanResponderEnd(e, gestureState) {
    if (this.shouldHide) {
      this.setState({
        hide: true
      })
      clearTimeout(this.hideTimeout)
      this.onDismiss && this.onDismiss()
    }
    this.snackBarStyles.style.opacity = 1;
    this.snackBarStyles.style.left = 0;
    this.updateNativeStyles();
  }

  updateNativeStyles() {
    this.snackBar && this.snackBar.setNativeProps(this.snackBarStyles);
  }

  getOpacity() {
    let leftFactor = Math.abs(this.snackBarStyles.style.left) / width;
    if (leftFactor > 0.5) {
      this.snackBarStyles.style.opacity = 0;
      this.shouldHide = true;
    } else {
      this.snackBarStyles.style.opacity = 1 - (leftFactor / 0.5);
      this.shouldHide = false;
    }
  }
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 16,
    marginVertical: 12,
    fontSize: 14,
  },

  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0
  }
});

module.exports = SnackBar
