import React from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export default class ArticleCell extends React.PureComponent{
    
    constructor(){
        super();
        this.selected = false
    }

    _onPress = () => {
        this.props.onSelectData(this.props.data);
    }

    // アニメーションのstyle (select/deselect)
    _animateStyle() {
        let itemSelected = this.props.data.item.selected
        if(itemSelected && !this.selected){
            this.selected = true
            return { opacity: 0.5 }
        }else if(!itemSelected && this.selected){
            let anim = new Animated.Value(0.5)
            Animated.timing(anim, {toValue: 1.0, duration: 100},).start();
            this.selected = false
            return { opacity: anim }
        }

        return null
    }

    render() {
        let data = this.props.data
        let article = data.item
        let index = data.index

        var cellStyles = [styles.cell, this._animateStyle()];

        return (
            <TouchableWithoutFeedback  onPress={this._onPress}>
            <Animated.View style={cellStyles}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.pubDate}>{article.dateString}</Text>
            </Animated.View>
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
    title:{
        fontSize:18,
        fontWeight:"bold",
        lineHeight: 22
    },
    pubDate:{
        marginTop:15,
        textAlign:"right"
    }
})
