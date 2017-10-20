import React, { Component } from 'react';
import ArticleList from './ArticleListViewController';
import { NavigatorIOS} from 'react-native';

export default class App extends Component {

    render() {
        return (
            <NavigatorIOS
                style={{flex: 1}}
                initialRoute={{
                component: ArticleList,
                title: 'NakadoriBooks'
            }}/>
        );
    }

}
