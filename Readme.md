# React Native Animated Popup

![react native popup](https://raw.githubusercontent.com/sahlhoff/react-native-popup/master/popup.gif)
  
## Installation

```
  npm install rn-popup --save
```

## Usage

```js

  const Popup = require('rn-popup');

  ...  

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this._openPopUp()} buttonType='primary'>Show</Button>
        <Popup isVisible={this.state.isVisible}>
          <Text style={styles.welcome}>It's a Popup!</Text>
          <Text style={styles.instructions}>You can add text</Text>
          <Button textStyle={{textAlign: 'center'}} onPress={() => this._closePopUp()} buttonType='primary'>Close</Button>
        </Popup>
      </View>
    );
  }

  _openPopUp() {
    this.setState({
      isVisible: true
    });
  }

  _closePopUp() {
    this.setState({
      isVisible: false
    });
  }

  
```
