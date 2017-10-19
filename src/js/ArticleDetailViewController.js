import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView
} from 'react-native';

export default class ArticleDetailViewController extends React.Component {

    componentWillUnmount(){ 
        // push元に伝える
        this.props.onBack()
    }

    render() {
        return (
            <View style={styles.detailView}>
            <WebView
                style={styles.webView}
                source={{html: this.props.article.content}}
                automaticallyAdjustContentInsets={false}
                contentInset={{top:0,bottom:54}}
            />
            <View style={styles.footerView}>
                <Text style={styles.share}>シェアする</Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    detailView:{ flex:1 },
    webView: { 
        flex:1
    },
    footerView:{
        height:54,
        position:'absolute',
        bottom:0,left:0,right:0,
        borderTopWidth:1,
        borderTopColor: '#cccccc',
        backgroundColor:'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
    },
    share:{
        textAlign: 'center',
        fontSize:20
    }
})
