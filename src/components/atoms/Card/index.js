import React, { Component, createRef } from 'react'
import { Animated, Dimensions, StyleSheet, View, Image, Text } from 'react-native'
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler'
import Swiper from 'react-native-swiper'

export default class Card extends Component {

    constructor(props){
        super(props)
        this.panHandler = React.createRef();
        this.pinchHandler = React.createRef();
        this.state = {
            zIndex: 1,
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
            this.setState({
                zIndex:1
            })
            Animated.spring(this.scale, {
                toValue: 1.01,
                useNativeDriver:true
            }).start();
        }
        if(event.nativeEvent.oldState === State.BEGAN || event.nativeEvent.oldState === State.UNDETERMINED){
            this.setState({
                zIndex:10
            })
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
        }
    }


    render() {
        const item = this.props.item
        const scale = this.scale
        const translateX = this.translateX
        const translateY = this.translateY
        return (
            <Animated.View style={styles.container(item.bg)}>
                <View style={styles.profile}>
                    <View>
                        <Image 
                            source={{uri: item.image}}
                            style={{width:50, height:50, borderRadius:50/2}}
                        />
                    </View>
                    <View>
                        <Text style={styles.name}>Kucing</Text>
                    </View>
                </View>
                <View>
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
                                    >
                                        <Animated.Image 
                                            source={{uri: item.image}}
                                            style={[styles.image, {
                                                transform: [{scale}, {translateX}, {translateY}],
                                                zIndex: this.state.zIndex
                                            }]}
                                            resizeMode="cover"
                                        />
                                    </Swiper>
                                </Animated.View>
                            </PanGestureHandler>
                        </Animated.View>
                    </PinchGestureHandler>
                </View>
                <View style={styles.descWrapper}>
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In malesuada eu elit a tempor. Sed in mi et elit scelerisque finibus sed non odio. Maecenas at magna rhoncus augue consectetur tristique. Praesent sed diam lacus.</Text>
                </View>
            </Animated.View>
        )
    }
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: (bg) => ({
        backgroundColor: bg,
        width: width,
        position:"relative",
    }),
    image: {
        width: width,
        height: width,
    },
    imageWrapper: {
        marginVertical:20
    },
    profile: {
        flexDirection: "row",
        alignItems: "center",
        padding:5,
        backgroundColor:"white",
        zIndex:0,
    },
    name: {
        fontSize:18,
        fontWeight: "600",
        marginLeft:10,
    },
    descWrapper: {
        paddingHorizontal:5,
        paddingTop:30,
        paddingBottom:10,
        backgroundColor:"gray",
        zIndex:0,
    }
})