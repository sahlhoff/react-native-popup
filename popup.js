'use strict';
 
import React, {
  Component,
  PropTypes
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

class Popup extends Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    duration: PropTypes.number,
    entry: PropTypes.string,
    exit: PropTypes.string
  };

  static defaultProps = {
    isVisible: false,
    duration: 800,
    entry: 'top',
    exit: 'bottom'
  };
  
  constructor(props){
    super(props);

    this.state = {
      isVisible: this.props.isVisible,
      isTransitioning: false,
      startPosition: this._getStartPosition(this.props.entry),
      endPosition: this._getEndPosition(this.props.exit),
      position: new Animated.Value(this._getStartPosition(this.props.entry)),
      opacity: new Animated.Value(0),
      entry: this.props.entry,
      exit: this.props.exit
    };

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isVisible && !this.state.isVisible){
      this.setState({isTransitioning: true});
      this.setState({isVisible: true});
      this._animatePopupShow();
      this._animateOverlayShow();
    } else if (!nextProps.isVisible && this.state.isVisible) {
      this.setState({isTransitioning: true});
      this.setState({isVisible: false});
      this._animatePopupHide();
      this._animateOverlayHide();
    }
  }
  
  render(){
    if(!this.state.isVisible && !this.state.isTransitioning){
      return null;
    } else {
      return (
        <View style={styles.parentContainer}>
          <Animated.View style={[styles.overlay, {opacity: this.state.opacity}]} />
          {this._renderPopup()}
        </View>
      );
    }
  }

  _renderPopup(){
    let counter = 0;
    const items = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        className: (child.props.className ? child.props.className : ''),
        key: counter++
      });
    });

    return (
      <Animated.View style={this._getAnimatedPopupPosition()}>
        <View style={styles.popupContainer}>
          { items }
        </View>
      </Animated.View>
    );
  }

  
  // POPUP Animations
  
  _animatePopupHide(){
    Animated.timing(this.state.position, {
      duration: this.props.duration,
      toValue: this.state.endPosition
    }).start(() => {
      this._setStartPosition();
      this.setState({isTransitioning: false});
    });
  }

  _animatePopupShow(){
    Animated.timing(this.state.position, {
      duration: this.props.duration,
      toValue: 0
    }).start(() => {
      this.setState({isTransitioning: false});
    });
  }

  _getAnimatedPopupPosition(){
    return {
      transform: [
        {translateY: this.state.position},
      ]
    };
  }

  // OVERYLAY animations

  _animateOverlayShow(){
    Animated.timing(this.state.opacity, {
      duration: this.props.duration,
      toValue: .7
    }).start();
  }

  _animateOverlayHide(){
    Animated.timing(this.state.opacity, {
      duration: this.props.duration,
      toValue: 0
    }).start();    
  }

  _getStartPosition(entry){
    switch(entry){
    case 'top':
      return height * -1;
    case 'bottom':
      return height;
    default:
      return height * -1;
    }
  }

  _getEndPosition(exit){
    switch(exit){
    case 'top':
      return height * -1;
    case 'bottom':
      return height;
    default:
      return height * -1;
    }    
  }

  _setStartPosition(){
    this.setState({
      position: new Animated.Value(this.state.startPosition)
    });
  }
  
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000'
  },
  popupContainer: {
    right: 0,
    left: 0,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 5,
    padding: 20,
    justifyContent: 'center'
  },
  parentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  }
});


module.exports = Popup;
