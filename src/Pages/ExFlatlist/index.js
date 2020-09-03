import React, { Component } from 'react'
import { View, FlatList, Text, Dimensions } from 'react-native'
import { Card } from '../../components/atoms'

export default class ExFlatlist extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [
                {
                    id: '1',
                    name: 'data1',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
                },
                {
                    id: '2',
                    name: 'data2',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
                },
                {
                    id: '3',
                    name: 'data3',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
                },
                {
                    id: '4',
                    name: 'data4',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'
                },
            ]
        }
    }

    renderData = ({item, index}) => (
        <View>
            <Card item={item} />
        </View>
    )

    render() {
        return (
            <View>
                <FlatList 
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this.renderData}
                    scrollEnabled={this.state.scrollEnabled}
                    contentContainerStyle={{zIndex:1}}
                />
            </View>
        )
    }
}
