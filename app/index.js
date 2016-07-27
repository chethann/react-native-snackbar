import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

let SnackBar = require("./snackbar/SnackBar");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hide: false
    };
  }

  render() {
    return(
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.showSnackbar.bind(this)} underlayColor='#29303F0D'>
            <Text>Show SnackBar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={this.dismissSnackbar.bind(this)} underlayColor='#29303F0D'>
            <Text>Hide SnackBar</Text>
          </TouchableHighlight>
        </View>

        {this.state.hide ? <View/> :

        (<View style={styles.snackBarStyles}>
          <SnackBar message = "snackbar content!"
            style={{width:Dimensions.get('window').width}}
            onDismiss={this.onDismiss.bind(this)}  />
        </View>)
        }

      </View>
    );
  }

  onDismiss() {
    //actions to be done on dismiss of snackbar
    this.dismissSnackbar();
  }

  showSnackbar() {
    this.setState({
      hide: false
    });
  }

  dismissSnackbar() {
    this.setState({
      hide: true
    });
  }

}

const styles = StyleSheet.create({

  container : {
    flex: 1
  },

  snackBarStyles: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0
  },

  button: {
    height: 30,
    width : 150,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  buttonContainer : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

module.exports = App;
