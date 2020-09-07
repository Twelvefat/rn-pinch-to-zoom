import React, { Fragment } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

export default function Absoulte() {
    return (
        <Fragment>
            <ScrollView style={styles.container} horizontal>
                <View style={styles.box1}>

                </View>
                <View style={styles.box2}>

                </View>
            </ScrollView>
            <ScrollView style={styles.container2} horizontal>
                <View style={styles.box3}>

                </View>
                <View style={styles.box4}>

                </View>
            </ScrollView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding:20,
        position:"relative",
        maxHeight:90,
        backgroundColor:"black",
        zIndex:10,
        flexDirection:"row",
        flex:1,
    },
    container2: {
        // padding:20,
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
        backgroundColor:"red",
        // top:15,
        // left:15,
        // position:"absolute",
    },
    box2: {
        width:100,
        height:100,
        backgroundColor:"green",
        // position:"absolute",
        // top:10,
        // left:10,
        zIndex:10
    },
    box3: {
        width:100,
        height:100,
        backgroundColor:"pink",
        // top:25,
        // left:25,
        // position:"absolute",
        zIndex:0
    },
    box4: {
        width:100,
        height:100,
        backgroundColor:"blue",
        // position:"absolute",
        // top:20,
        // left:20,
        zIndex:0

    },
})
