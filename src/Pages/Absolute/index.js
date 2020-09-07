import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Absoulte() {
    return (
        <Fragment>
            <View style={styles.container}>
                <View style={styles.box1}>

                </View>
                <View style={styles.box2}>

                </View>
            </View>
            <View style={styles.container2}>
                <View style={styles.box3}>

                </View>
                <View style={styles.box4}>

                </View>
            </View>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:20,
        position:"relative",
        maxHeight:90,
        backgroundColor:"black",
        zIndex:10,
        flexDirection:"row",
        flex:1,
    },
    container2: {
        padding:20,
        position:"relative",
        maxHeight:90,
        backgroundColor:"orange",
        zIndex:0,
        flexDirection:"row",
        flex:1,
    },
    box1: {
        width:100,
        height:100,
        // top:15,
        // left:15,
        // position:"absolute",
        backgroundColor:"red",
    },
    box2: {
        width:100,
        height:100,
        backgroundColor:"green",
        // position:"absolute",
        // top:10,
        // left:10,
    },
    box3: {
        width:100,
        height:100,
        // top:25,
        // left:25,
        // position:"absolute",
        backgroundColor:"pink",
    },
    box4: {
        width:100,
        height:100,
        backgroundColor:"blue",
        // position:"absolute",
        // top:20,
        // left:20,
    },
})
