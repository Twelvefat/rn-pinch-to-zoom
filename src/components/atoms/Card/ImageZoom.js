import React, { Component, createRef } from 'react'
import { Animated, Dimensions, StyleSheet, View, Image, Text } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'
import ViewPager from '@react-native-community/viewpager'



export default class ImageZoom extends Component {

    constructor(props){
        super(props)
        this.panHandler = React.createRef();
        this.pinchHandler = React.createRef();
        this.state = {
            zIndex: 1,
            active: false,
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
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(this.translateX, {
                toValue: 1,
                useNativeDriver:true
            }).start();
            Animated.spring(this.translateY, {
                toValue: 1,
                useNativeDriver:true
            }).start();
            this.setState({zIndex: 1, active: false})
            // this.props.activeIndex(null)
            this.props.setIndex(1)
            this.props.setIndexDetail(2)
        }
        
        if(event.nativeEvent.oldState === State.BEGAN){
            this.setState({zIndex: 2, active: true})
            this.props.setIndexDetail(1)
            this.props.setIndex(2)
            // this.props.activeIndex(this.props.index)
        }
    }

    render() {
        const item = this.props.item
        const scale = this.scale
        const translateX = this.translateX
        const translateY = this.translateY
        return (
            <View style={{zIndex: this.state.zIndex, paddingTop: this.props.headerHeight, paddingBottom: this.props.footerHeight}}>
                <PinchGestureHandler 
                        ref={this.pinchHandler}
                        onGestureEvent={this.handleGesturePinch} 
                        onHandlerStateChange={this._onGestureStateChangePinch}
                    >
                    <Animated.View style={{zIndex: this.state.zIndex}}>
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
                                    style={{zIndex:0}}
                                    scrollViewStyle={{zIndex: this.state.zIndex}}
                                >
                                    <View style={{zIndex: this.state.zIndex}}>
                                        <Animated.Image 
                                            source={{uri: item.image}}
                                            style={[styles.image, {
                                                transform: [{scale}, {translateX}, {translateY}],
                                            }]}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{zIndex: this.state.zIndex}}>
                                        <Animated.Image 
                                            source={{uri: item.image}}
                                            style={[styles.image, {
                                                transform: [{scale}, {translateX}, {translateY}],
                                            }]}
                                            resizeMode="cover"
                                        />
                                    </View>
                                </Swiper>
                            </Animated.View>
                        </PanGestureHandler>
                    </Animated.View>
                </PinchGestureHandler>
            </View>
        )
    }
}


const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: (zIndex, bg) => ({
        backgroundColor: bg,
        width: width,
        position:"relative",
        zIndex: zIndex
    }),
    image: {
        width: width,
        height: width,
    },
    imageWrapper: {
        marginVertical:20
    },
    profile: (zIndex) => ({
        flexDirection: "row",
        alignItems: "center",
        padding:5,
        backgroundColor:"white",
        zIndex:zIndex,
        position:"absolute",
        top:0,
        left:0,
        height:62,
        width: width,
        flex:1,
    }),
    name: {
        fontSize:18,
        fontWeight: "600",
        marginLeft:10,
    },
    descWrapper: (zIndex) => ({
        paddingHorizontal:5,
        paddingTop:30,
        paddingBottom:10,
        backgroundColor:"gray",
        zIndex:zIndex,
        position:"absolute",
        bottom:0,
        left: 0,
        width: width,
    }),
    viewPager: {
        flex:1,
        width: width,
        height: width,
        overflow:"visible",
    }
})
