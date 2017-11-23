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
import StatusPage from './StatuesPage';
import SearchBar from './../component/home/SeachBar'
import StatusHeader from './../component/statues/StatusHeader'
import QuestionHeader from './../component/question/QuestionHeader'
import { Icon } from 'react-native-elements'
import BlogHeader from './../component/Blog/blogHeader'
import NewsPage from './NewsScreen/index'
import KbPage from './KbScreen/index'
import observableStatuesStore from '../services/statuesService'

const MainPage = TabNavigator({
    Home: {
        screen: BlogPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '首页',            
            header:null,
            tabBarIcon: ({
                tintColor
            }) => (<
                    Icon name="home" color={tintColor}
                />
                ),
        })
    },
    News: {
        screen:NewsPage,
        navigationOptions:({navigation})=>({
                tabBarLabel: '新闻',
                header:null,
                tabBarIcon: ({
                    tintColor
                }) => (<
                        Icon name="newspaper-o" color={tintColor} type='font-awesome'
                    />
                    ),
        })
    },
    Kb: {
        screen:KbPage,
        navigationOptions:({navigation})=>({
                tabBarLabel: '知识',
                tabBarIcon: ({
                    tintColor
                }) => (<
                        Icon name="book" color={tintColor} type="font-awesome"
                    />
                    ),
        })
    },
    Status: {
        screen:StatusPage,
        navigationOptions:({navigation,observableStatuesStore})=>({
                tabBarLabel: '闪存',
                header: <StatusHeader {...navigation}/>,
                tabBarIcon: ({
                    tintColor
                }) => (<
                        Icon name="textsms" color={tintColor}
                    />
                    ),
        })
    },
    Question: {
        screen: QuestionPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '博问',
            header: <QuestionHeader {...navigation} />,
            tabBarIcon: ({
                tintColor
            }) => (<
                    Icon name="question-answer" color={tintColor}
                />
                ),
        })
    },
    Mime: {
        screen: MimePage,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon: ({
                tintColor
            }) => (<
                    Icon name="account-circle" color={tintColor}
                />
                ),
        }
    }
}, {
        animationEnabled: true,
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
                justifyContent: 'center'
            },
            tabStyle: {
                height:49
            },
            labelStyle: {
                fontSize: 10,
                fontWeight: 'bold',
                marginTop: 0,
                paddingTop: 0
            }
        },
    });
export default MainPage;