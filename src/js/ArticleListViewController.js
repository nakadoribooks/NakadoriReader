import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  NavigatorIOS
} from 'react-native';
import Article from './Article';
import ArticleCell from './ArticleCell';
import ArticleDetailViewController from './ArticleDetailViewController';

const RssUrl = "https://nakadoribooks.com/feed/"

export default class ArticleListViewController extends React.Component {
    
    constructor(){
        super();

        this.state = {
            articleList: []
            , reloadCount: 0
            , loading: false 
        }
    }

     // 今回のこれ！
     _deselectView(){
        let articleList = this.state.articleList
        for(let i = 0, to = articleList.length; i<to; i++){
            let article = articleList[i]
            article.selected = false
        }
        this._reloadListView()
    }

    componentDidMount(){
        this.fetchData()
    }

    render() {
        return (
            <View style={styles.listView}>
                <FlatList
                    data={this.state.articleList}
                    extraData={this.state.reloadCount}
                    enableEmptySections={true}
                    keyExtractor={item => item.link}
                    renderItem={(data) => {
                        return <ArticleCell 
                            data={data}
                            onSelectData={this._onSelectData}
                        ></ArticleCell>
                    }}>
                </FlatList>
                {this.state.loading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
                }
            </View>
        )
    }

    // reloadData
    _reloadListView(){
        this.setState({
            reloadCount: this.state.reloadCount + 1
        })
    }

    // 記事選択しましたー
    _onSelectData = (data) => {
        let article = data.item
        article.selected = true

        this._reloadListView()        

        this.props.navigator.push({
            title: article.title,
            component: ArticleDetailViewController,
            passProps: { article: article, onBack:()=>{
                this._deselectView()
            } }
        })
    }

    // RSS 取ってくる
    fetchData(){
        this.setState({
            loading: true
        })
        fetch(RssUrl)
        .then((response) => response.text())
        .then((responseData) => {
            var articleList = Article.createFromRssString(responseData)
            this.setState({
                articleList: articleList
                , loading: false
            })
        })
        .done();
    }
}

const styles = StyleSheet.create({
    listView:{
        flex:1
    },
    loading: {
        backgroundColor:'rgba(0,0,0,0.3)',
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})