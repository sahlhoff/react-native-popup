'use strict';
 
import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  LayoutAnimation
} from 'react-native';

const HIDE_VALUE     = -600;
const OVERLAY_VALUE  = 0;
const DURATION_VALUE = 800;

class Popup extends Component {

  constructor(props){
    super(props);

    this.state = {
      isVisible: true,
      isTransitioning: true,
      position: new Animated.Value(HIDE_VALUE),
      opacity: new Animated.Value(OVERLAY_VALUE)
    };
  }
  
  componentDidMount(){
    this._animatePopupShow();
    this._animateOverlayShow();
  }

  componentWillReceiveProps(nextProps){
    this.setState({isTransitioning: true});
    if(!nextProps.isVisible){
      this.setState({isVisible: false});
      this._animatePopupHide();
      this._animateOverlayHide();
    } else {
      this.setState({isVisible: true});
      this._animatePopupShow();
      this._animateOverlayShow();
    }
  }
  
  render(){
    if(!this.state.isVisible && !this.state.isTransitioning){
      return <View />;
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
      duration: DURATION_VALUE,
      toValue: -600
    }).start(() => {
      this.setState({isTransitioning: false});
    });
  }

  _animatePopupShow(){
    Animated.timing(this.state.position, {
      duration: DURATION_VALUE,
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
      duration: DURATION_VALUE,
      toValue: .7
    }).start();
  }

  _animateOverlayHide(){
    Animated.timing(this.state.opacity, {
      duration: DURATION_VALUE,
      toValue: 0
    }).start();    
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
