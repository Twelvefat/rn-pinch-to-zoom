import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

export default function Swipe() {

    const circleRadius = 30
    const {width, height} = Dimensions.get("window");
    _touchX = new Animated.Value(width / 2 - circleRadius)
    _onPanGestureEvent = Animated.event([
        {
            nativeEvent: {
                x: this._touchX
            }
        }
    ], {
        useNativeDriver: true
    })
    return (
        <PanGestureHandler
            onGestureEvent={_onPanGestureEvent}
        >
            <Animated.View
                style={{height: 150, justifyContent:"center"}}
            >
                <Animated.View
                    style={[
                        {
                            backgroundColor: "#42a5f5",
                            borderRadius: circleRadius,
                            height: circleRadius * 2,
                            width: circleRadius * 2 
                        },
                        {
                            transform: [{
                                translateX: Animated.add(
                                    _touchX,
                                    new Animated.Value(-circleRadius)
                                )
                            }]
                        }
                    ]}
                >
                </Animated.View>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    
})
