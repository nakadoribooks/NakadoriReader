import React from 'react';
import {StyleSheet, Text,View,Animated,TouchableWithoutFeedback} from 'react-native';

export default class ArticleCell extends React.PureComponent{
    
    constructor(){
        super();
        this.selected = false
        
        this.focusValue = new Animated.Value(0.0)
        this.cellBgStyle = [styles.bg, {opacity:this.focusValue}]
    }

    _onPress = () => {
        this.props.onSelectData(this.props.data);
    }

    _focusAnimate() {
        let itemSelected = this.props.data.item.selected

        // 状態が違かったらアニメーション
        if(itemSelected && !this.selected){
            Animated.timing(this.focusValue, {toValue: 0.5, duration: 1},).start();
        }else if(!itemSelected && this.selected){
            Animated.timing(this.focusValue, {toValue: 0.0, duration: 200},).start();
        }
        
        this.selected = itemSelected
    }

    render() {
        let data = this.props.data
        let article = data.item
        let index = data.index

        this._focusAnimate()

        return (
            <TouchableWithoutFeedback  onPress={this._onPress}>
            <View style={[styles.cell]}>
                <Animated.View style={this.cellBgStyle}></Animated.View>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.pubDate}>{article.dateString}</Text>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    cell:{ 
        padding:10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    bg:{
        position:'absolute',
        left:0,right:0,top:0,bottom:0,
        backgroundColor: '#cccccc'
    },
    title:{
        fontSize:18,
        fontWeight:"bold",
        lineHeight: 22,
        backgroundColor:'transparent'
    },
    pubDate:{
        marginTop:15,
        textAlign:"right",
        backgroundColor: 'transparent'
    }
})
