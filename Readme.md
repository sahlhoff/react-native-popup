# React Native Animated Popup

<img src="https://raw.githubusercontent.com/sahlhoff/react-native-popup/master/popup.gif" alt="React Native Popup" style="max-width: 200px;"/>
  
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
        <Popup isVisible={this.state.isVisible} duration={800} hidePosition={-600}>
          <Text style={styles.welcome}>Its a Popup!</Text>
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

## Props

- **`isVisible`** _(bool)_ - Value to show/hide popup.
- **`duration`** _(number)_ - Duration in milliseconds for animation. Defaults to 800.
- **`hidePosition`** _(number)_ - This is the absolute position for hiding the popup. Defaults to -600 (set < 0 to render from above; set > screen height to render from below).
