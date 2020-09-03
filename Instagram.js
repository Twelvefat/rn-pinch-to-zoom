import React, { useRef } from "react";
import { Animated, Dimensions, Platform, StatusBar, StyleSheet, View, } from "react-native";
import ReAnimated, { Value, cond, eq, or } from "react-native-reanimated";
import { useSafeArea } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { ScrollView, State, } from "react-native-gesture-handler";
import { posts } from "./data";
import Post  from './Post';
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { height } = Dimensions.get("window");
const HEADER_HEIGHT = 200 
const FOOTER_HEIGHT = 200
const bottom = height - FOOTER_HEIGHT + (Platform.OS === "android" ? Constants.statusBarHeight : 0);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
export default () => {
    const scrollView = useRef(null);
    // This animation value needs to come from Vanilla Animated
    const y = new Animated.Value(0);
    const insets = useSafeArea();
    const paddingTop = HEADER_HEIGHT + insets.top;
    const paddingBottom = FOOTER_HEIGHT + insets.bottom;
    const items = posts.map((post) => ({
        post,
        state: new Value(State.UNDETERMINED),
        pinchRef: useRef(null),
    }));
    const pinchRefs = items.map(({ pinchRef }) => pinchRef);
    const isActive = or(...items.map(({ state }) => eq(state, State.ACTIVE)));
    const opacity = cond(isActive, 0.5, 0);
    return (
        <View style={styles.container}>
            <AnimatedScrollView
                ref={scrollView}
                pinchGestureEnabled={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                waitFor={pinchRefs}
                simultaneousHandlers={pinchRefs}
                contentContainerStyle={{
                    paddingTop,
                    paddingBottom,
                }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
                    useNativeDriver: true,
                })}
            >
                <Animated.View
                    style={{
                        zIndex: 2,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: HEADER_HEIGHT,
                        transform: [{ translateY: y }],
                    }}
                >
                    {
                        items.map(({ post, state, pinchRef }) => (
                            <Post
                                key={post.id}
                                {...{ post, state, scrollView, pinchRef, pinchRefs }}
                            />
                        ))
                    }
                </Animated.View>
                <ReAnimated.View
                    style={{
                        ...StyleSheet.absoluteFillObject,
                        zIndex: 0,
                        backgroundColor: "black",
                        opacity,
                    }}
                    pointerEvents="none"
                />
            </AnimatedScrollView>
        </View>
    )
};