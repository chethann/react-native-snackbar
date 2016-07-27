import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

let App = require('./app')

class RnSnackbar extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('RnSnackbar', () => RnSnackbar);
