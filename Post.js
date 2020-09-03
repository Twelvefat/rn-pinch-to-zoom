import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { Value, block, cond, eq, set, useCode, } from "react-native-reanimated";
import { PinchGestureHandler, State, } from "react-native-gesture-handler";
import { onGestureEvent, pinchActive, pinchBegan, timing, transformOrigin, translate, vec, } from "react-native-redash";
const { width } = Dimensions.get("window");
const SIZE = width;
const styles = StyleSheet.create({
    image: Object.assign(Object.assign({}, StyleSheet.absoluteFillObject), { width: undefined, height: undefined, resizeMode: "cover" }),
});
export default ({ post, state, pinchRef, pinchRefs, scrollView, }) => {
    const origin = vec.createValue(0, 0);
    const pinch = vec.createValue(0, 0);
    const focal = vec.createValue(0, 0);
    const scale = new Value(1);
    const numberOfPointers = new Value(0);
    const pinchGestureHandler = onGestureEvent({
        numberOfPointers,
        scale,
        state,
        focalX: focal.x,
        focalY: focal.y,
    });
    const zIndex = cond(eq(state, State.ACTIVE), 3, 0);
    const adjustedFocal = vec.add({
        x: -SIZE / 2,
        y: -SIZE / 2,
    }, focal);
    useCode(() => block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal)))),
        cond(eq(state, State.END), [
            set(pinch.x, timing({ from: pinch.x, to: 0 })),
            set(pinch.y, timing({ from: pinch.y, to: 0 })),
            set(scale, timing({ from: scale, to: 1 })),
        ]),
    ]), [adjustedFocal, numberOfPointers, origin, pinch, scale, state]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Animated.View, { style: { width: SIZE, height: SIZE, zIndex, backgroundColor:"#000000" } },
            React.createElement(PinchGestureHandler, Object.assign({ ref: pinchRef, simultaneousHandlers: [
                    scrollView,
                    ...pinchRefs.filter((ref) => ref !== pinchRef),
                ] }, pinchGestureHandler),
                React.createElement(Animated.View, { style: StyleSheet.absoluteFill },
                    React.createElement(Animated.Image, { style: [
                            styles.image,
                            {
                                transform: [
                                    ...translate(pinch),
                                    ...transformOrigin(origin, { scale }),
                                ],
                            },
                        ], source: { uri: post.picture.uri } }))))));
};