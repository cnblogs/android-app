import * as React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native'
import {
    TabNavigator
} from 'react-navigation';
import BlogPage from './BlogScreen/index';
import MimePage from './MimePage';
import QuestionPage from './QuestionPage';
import StatusPage from './StatuesScreen/index';
import SearchBar from './../component/home/SeachBar'
import StatusHeader from './../component/statues/StatusHeader'
import QuestionHeader from './../component/question/QuestionHeader'
import { Icon } from 'react-native-elements'
import NewsPage from './NewsScreen/index'
import KbPage from './KbScreen/index'
import observableStatuesStore from '../services/statuesService'

const MainPage = TabNavigator({
    Home: {
        screen: BlogPage,
        navigationOptions:{
            tabBarLabel: '首页',            
            header:null,
            tabBarIcon:({tintColor}) => (
                <Image
                    source={require('../images/fonts/home.png')}
                    style={[styles.icon,{tintColor: tintColor}]}
                />),
        }
    },
    News: {
        screen:NewsPage,
        navigationOptions:{
                tabBarLabel: '资讯',
                header:null,
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../images/fonts/news.png')}
                        style={[styles.icon,{tintColor: tintColor}]}
                    />),
        }
    },
    Status: {
        screen:StatusPage,
        navigationOptions:({navigation,observableStatuesStore})=>({
                tabBarLabel: '动态',
                header:null,
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../images/fonts/start.png')}
                        style={[styles.icon,{tintColor: tintColor}]}
                    />),
        })
    },
    Question: {
        screen: QuestionPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '博问',
            header: <QuestionHeader {...navigation} />,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../images/fonts/question.png')}
                    style={[styles.icon,{tintColor: tintColor}]}
                />),
        })
    },
    Mime: {
        screen: MimePage,
        navigationOptions: {
            tabBarLabel: '更多',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../images/fonts/more.png')}
                    style={[styles.icon,{tintColor: tintColor}]}
                />),
        }
    }
}, {
        animationEnabled: false,
        tabBarPosition: 'bottom',
        lazy: true,
        swipeEnabled: false,
        backBehavior: 'none',
        tabBarOptions: {
            activeTintColor: '#008AC9',
            inactiveTintColor: '#999',
            showIcon: true,
            indicatorStyle: {
                height: 0
            },
            style: {
                backgroundColor: '#fff',
                borderColor: '#e6e6e6',
                borderTopWidth: 1,
                borderStyle: 'solid',
            },
            tabStyle: {
                height:49,
                justifyContent:'flex-start',
                marginBottom:3,
            },
            labelStyle: {
                fontSize: 10,
                fontWeight: 'bold',
                marginTop: 0,
                paddingTop: 0
            }
        },
    });

    const styles = StyleSheet.create({
        icon: {
            height: 22,
            width: 22,
            resizeMode: 'contain'
        }
    });
export default MainPage;