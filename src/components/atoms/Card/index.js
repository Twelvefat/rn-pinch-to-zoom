import React, { Component, createRef } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'

export default class Card extends Component {

    constructor(props){
        super(props)
        this.panHandler = React.createRef();
        this.pinchHandler = React.createRef();
        this.state = {
            zIndex: 10
        }
    }
    translateX = new Animated.Value(0)
    translateY = new Animated.Value(0)
    scale  = new Animated.Value(1)

    handleGesture =  Animated.event(
        [
            {
                nativeEvent: {
                    translationX: this.translateX,
                    translationY:this.translateY
                }
            }
        ], 
        { useNativeDriver: true }
    );
    handleGesturePinch = Animated.event(
        [
            {
                nativeEvent: {
                    scale:this.scale
                }
            }
        ], 
        { useNativeDriver: true });    
    
    _onGestureStateChangePinch = (event)=>{
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(this.scale, {
                toValue: 1.01,
                useNativeDriver:true
            }).start();
        }
    }

    _onGestureStateChange = (event) => {
        this.setState({
            zIndex: 99
        })
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(this.translateX, {
                toValue: 1,
                useNativeDriver:true
            }).start(() => {
                this.setState({
                    zIndex:1
                })
            });
            Animated.spring(this.translateY, {
                toValue: 1,
                useNativeDriver:true
            }).start(() => {
                this.setState({
                    zIndex:1
                })
            });
        }
    }


    render() {
        const item = this.props.item
        const scale = this.scale
        const translateX = this.translateX
        const translateY = this.translateY
        return (
            <Animated.View style={[styles.container]}>
                <PinchGestureHandler 
                        ref={this.pinchHandler}
                        onGestureEvent={this.handleGesturePinch} 
                        onHandlerStateChange={this._onGestureStateChangePinch}
                    >
                    <Animated.View>
                        <PanGestureHandler
                            ref={this.panHandler}
                            onGestureEvent={this.handleGesture}
                            onHandlerStateChange={this._onGestureStateChange}
                            minPointers={2}
                            simultaneousHandlers={this.pinchHandler}
                        >
                            <Animated.View>
                                <Swiper
                                    loop={false}
                                    height={width}
                                    containerStyle={{zIndex:1}}
                                >
                                    <Animated.Image 
                                        source={{uri: item.image}}
                                        style={[styles.image, {
                                            transform: [{scale}, {translateX}, {translateY}],
                                            position:"absolute", zIndex: this.state.zIndex
                                        }]}
                                        resizeMode="cover"
                                    />
                                    <Animated.Image 
                                        source={{uri: item.image}}
                                        style={[styles.image, {
                                            transform: [{scale}, {translateX}, {translateY}],
                                            position:"absolute", zIndex: this.state.zIndex
                                        }]}
                                        resizeMode="cover"
                                    />
                                </Swiper>
                            </Animated.View>
                        </PanGestureHandler>
                    </Animated.View>
                </PinchGestureHandler>
            </Animated.View>
        )
    }
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"red",
    },
    image: {
        width: width,
        height: width,
    },
    imageWrapper: {
        marginVertical:20
    }
})