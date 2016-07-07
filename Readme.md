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
        <Popup isVisible={this.state.isVisible} duration={800} entry={'bottom'} exit={'top'}>
          <Text style={styles.welcome}>Its a Popup!</Text>
          <Text style={styles.instructions}>You can add text</Text>
          <Image style={styles.image} source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
          <Text style={styles.instructions}>And images too!</Text>
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
- **`entry`** _(string)_ - Entry position for showing popup. This can be 'top' or 'bottom' defaults to 'top'.
- **`exit`** _(string)_ - Exit position for hiding popup. This can be 'top' or 'bottom' defaults to 'bottom'.  
