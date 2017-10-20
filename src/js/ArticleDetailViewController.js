import React from 'react';
import { StyleSheet,Alert,View,Text,WebView,Animated,Dimensions,TouchableWithoutFeedback} from 'react-native';

export default class ArticleDetailViewController extends React.Component {

    constructor(){
        super();

        this.state = {
            focusShare: false
        }
        this.focusedShare = false

        // focus/blur用のアニメーション値
        this.focusValue = new Animated.Value(0.0)
        this.blurValue = new Animated.Value(1.0)

        // ↑を使ったstyle
        this.shareStyle = {
            text: [styles.shareText, {opacity:this.blurValue}]
            , focusBg: [styles.shareOverlay, {transform:[{scale:this.focusValue}]}]
            , focusText: [styles.shareText, {color:'#ffffff', opacity:this.focusValue}]
        }
    }

    componentWillUnmount(){ 
        // push元に伝える
        this.props.onBack()
    }

    render() {

        this._focusAnimate()

        return (
            <View style={styles.detailView}>
            <WebView
                style={styles.webView}
                source={{html: this.props.article.content}}
                automaticallyAdjustContentInsets={false}
                contentInset={{bottom:54}}
            />
            <View style={styles.footerView}>
                <TouchableWithoutFeedback onPress={() => this._tryShare()}>
                    <View style={styles.shareButton}>
                        <Animated.View style={this.shareStyle.focusBg}></Animated.View>
                        <Animated.Text style={this.shareStyle.text}>シェアする</Animated.Text>
                        <Animated.Text style={this.shareStyle.focusText}>シェアする</Animated.Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            </View>
        )
    }

    _focusAnimate(){
        if(this.state.focusShare && !this.focusedShare){
            Animated.parallel([
                Animated.timing(this.focusValue, {toValue: 1.0, duration: 300},).start()
                , Animated.timing(this.blurValue, {toValue: 0.0, duration: 300},).start()
            ])
            this.focusedShare = true
        }else if(!this.state.focusShare && this.focusedShare){
            Animated.parallel([
                Animated.timing(this.focusValue, {toValue: 0.0, duration: 250},).start()
                , Animated.timing(this.blurValue, {toValue: 1.0, duration: 250},).start()                        
            ])
            this.focusedShare = false
        }
    }

    _tryShare(){
        this.setState({focusShare:true})
        Alert.alert(
            'そのうちシェアする',
            null,
            [
                {text: 'OK', onPress: () => {
                    this.setState({focusShare:false})
                }}
            ],
            { cancelable: false }
          )
    }
}

// 大きさの計算
const windowWidth = Dimensions.get('window').width
const overlayWidth = windowWidth * 1.1
const buttonHeight = 54

const styles = StyleSheet.create({
    detailView:{ flex:1 },
    webView: { 
        flex:1
    },
    footerView:{
        height:buttonHeight,
        position:'absolute',
        bottom:0,left:0,right:0,
        borderTopWidth:1,
        borderTopColor: '#cccccc',
        backgroundColor:'rgba(255, 255, 255, 0.9)',
        overflow: 'hidden'
    },
    shareButton:{
        flex:1,
        justifyContent: 'center',
    },
    shareText:{
        textAlign: 'center',
        fontSize:18,
        fontWeight:'bold',
        position:'absolute',
        left:0,right:0
    },

    // めんどい。。
    shareOverlay:{
        position:'absolute',
        width:overlayWidth, height:overlayWidth,
        left:-(overlayWidth - windowWidth) / 2,
        top:-((overlayWidth - buttonHeight) / 2),
        backgroundColor:'#6699ff',
        borderRadius: overlayWidth / 2
    }
})
