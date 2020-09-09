import React, { Component } from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import ViewPager from '@react-native-community/viewpager';

export default class ViewPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            position: 0
        }
    }

    onPageScroll = (e) => {
        this.setState({
            position: e.nativeEvent.position
        })
    }
    render() {
        return (
            // <View style={{flex:1, backgroundColor:"yellow"}}>
                <ViewPager style={styles.viewPager} initialPage={0} orientation="horizontal" onPageScroll={this.onPageScroll}>
                    <View key="1" style={{backgroundColor:"blue", width:300, height:300, padding:50}}>
                        <Text>First page</Text>
                    </View>
                    <View key="2">
                        <Text>Second page</Text>
                    </View>
                </ViewPager>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex:1,
    }
})
