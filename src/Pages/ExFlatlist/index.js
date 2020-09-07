import React, { Component } from 'react'
import { View, FlatList, Text, Dimensions} from 'react-native'
import { Card } from '../../components/atoms'
import { ScrollView } from 'react-native-gesture-handler'

export default class ExFlatlist extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [
                {
                    id: '1',
                    name: 'data1',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
                    bg: 'red'
                },
                {
                    id: '2',
                    name: 'data2',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
                    bg: 'yellow'
                },
                {
                    id: '3',
                    name: 'data3',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
                    bg: 'blue'
                },
                {
                    id: '4',
                    name: 'data4',
                    image: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
                    bg: 'green'
                },
            ]
        }
    }

    renderData = ({item, index}) => (
        <Card item={item}/>
    )

    render() {
        return (
            <View>
                {/* <FlatList 
                    data={this.state.data}
                    extraData={this.state}
                    renderItem={this.renderData}
                    contentContainerStyle={{zIndex:1}}
                /> */}
                <ScrollView>
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <Card item={item} />
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}
