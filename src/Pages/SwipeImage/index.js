import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
    add,
    clockRunning,
    cond,
    debug,
    divide,
    eq,
    floor,
    not,
    set,
    useCode,
} from "react-native-reanimated";
import {
    snapPoint,
    timing,
    useClock,
    usePanGestureHandler,
    useValue,
} from "react-native-redash";

export const images = [
    {image: 'https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg'},
    {image: 'https://cdn0-production-images-kly.akamaized.net/tAr72vTJCpF4IF9O5L493CD79kE=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/2754932/original/005940800_1552970791-fotoHL_kucing.jpg'},
    {image: 'https://static.scientificamerican.com/sciam/cache/file/92E141F8-36E4-4331-BB2EE42AC8674DD3_source.jpg'},
]


const {width, height} = Dimensions.get("window")
const snapPoints = images.map((_, index) => index * -width);


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,   
        backgroundColor: "black"
    },
    pictures: {
        width: width * images.length,
        height: height,
        flexDirection:"row"
    },
    picture: {
        width: width,
        height: height,
        overflow:"hidden"
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined
    }
})


export default function index() {
    const clock = useClock();
    const index = useValue(0);
    const offsetX = useValue(0);
    const translateX = useValue(0);
    const { gestureHandler, state, velocity, translation } = usePanGestureHandler();
    // const translateX  = withOffset(translation.x, state)
    const to = snapPoint(translateX, velocity.x, snapPoints);

    useCode(
    () => [
            cond(eq(state, State.ACTIVE), [
                set(translateX, add(offsetX, translation.x)),
            ]),
            cond(eq(state, State.END), [
                set(translateX, timing({ clock, from: translateX, to })),
                set(offsetX, translateX),
                cond(not(clockRunning(clock)), [
                set(index, floor(divide(translateX, -width))),
                debug("index", index),
                ]),
            ]),
        ],
        []
    );
    return (
        <View style={styles.container}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={StyleSheet.absoluteFill}>
                    <Animated.View style={[styles.pictures,{transform:[{translateX}]}]}>
                        {
                            images.map(({image, index}) => {
                                return (
                                    <View key={index} style={styles.picture}>
                                        <Image 
                                            source={{uri: image}}
                                            style={styles.image}
                                        />
                                    </View>
                                )
                            })
                        }
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}
