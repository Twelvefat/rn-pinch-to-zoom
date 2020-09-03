import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Absoulte() {
    return (
        <View style={styles.container}>
            <View style={styles.box1}>

            </View>
            <View style={styles.box2}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:20
    },
    box1: {
        width:100,
        height:100,
        backgroundColor:"red",
        position:"absolute"
    },
    box2: {
        width:100,
        height:100,
        backgroundColor:"green",
        position:"absolute",
        top:10,
        left:10
    },
})
