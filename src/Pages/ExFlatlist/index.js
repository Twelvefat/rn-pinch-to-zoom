import React, { Component } from 'react'
import { View, FlatList, Text, Dimensions, StyleSheet, VirtualizedList} from 'react-native'
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
            ],
            extraData: [
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
            ],
            activeIndex: null,
        }
    }

    renderData = ({item, index}) => {
        const zIndex = index === this.state.activeIndex ? 10 : 1;
        return (
            <View key={index} style={{zIndex: zIndex}}>
                <Card item={item} index={index} activeIndex={(val) => this.setState({activeIndex: val})}/>
            </View>
        )
    }

    renderCell = ({index, style, ...props}) => {
        const { activeIndex } = this.state
        const zIndex = {
            zIndex: index === activeIndex ? 2 : 1 
        }
        return (
            <View style={[style, zIndex]} {...props} />
        )
    }

    keyExtractor = (item, index) => index.toString()

    getItemCount = () => {
        return this.state.data.length
    }

    getItem = (data, index) => {
        return data[index]
    }

    handleMore = () => {
        this.setState({
            data: [...this.state.data, ...this.state.extraData]
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <VirtualizedList 
                    data={this.state.data}
                    extraData={this.state}
                    CellRendererComponent={this.renderCell}
                    renderItem={this.renderData}
                    keyExtractor={this.keyExtractor}
                    getItem={this.getItem}
                    getItemCount={this.getItemCount}
                    onEndReached={this.handleMore}
                />
                {/* <FlatList 
                    data={this.state.data}
                    extraData={this.state.activeIndex}
                    // CellRendererComponent={this.renderCell}
                    renderItem={this.renderData}
                    keyExtractor={this.keyExtractor}
                    initialNumToRender={10}
                    style={{zIndex:0}}
                /> */}
                {/* <ScrollView>
                    {
                        this.state.data.map((item, index) => {
                            return (
                                <Card item={item} />
                            )
                        })
                    }
                </ScrollView> */}
            </View>
        )
    }
}
