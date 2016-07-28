# react-native-snackbar
SnackBar component written in react native

# Demo
![Demo](https://raw.githubusercontent.com/chethann/react-native-snackbar/master/static/demo.gif)

# Configurations
The set of configurations available

```javascript 
<SnackBar message = "snackbar content!"
    style={{width:Dimensions.get('window').width}}
    onDismiss={this.onDismiss.bind(this)}
    backgroundColor="#FF0000"
    textColor="#00FF00"
    duration="1"
    infinite={false} /> 
```

The above code gives a snackbar with background color red, with text color green. The snackbar is auto dismissed after 1 second. onDismiss() gets fired when snackbar is dismissed, either by user or auto dismissed. If infinite is set to true the snackbar is not dismissed unless the user explicitly dismisses it.

# Author
Chethan N (chethann12793@gmail.com)
