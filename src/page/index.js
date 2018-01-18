import * as React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native'
import {
    TabNavigator
} from 'react-navigation';
import BlogPage from './BlogScreen/index';
import MimePage from './MyScreen/index';
import QuestionPage from './QuestionScreen/index';
import StatusPage from './StatuesScreen/index';
import ZiXunPage from './ZiXunScreen/index'
import {Icon,StyleProvider,getTheme} from 'native-base'

const MainPage = TabNavigator({
    Home: {
        screen: BlogPage,
        navigationOptions:{
            tabBarLabel: '首页',            
            header:null,
            tabBarIcon:({tintColor}) => (
                <StyleProvider style={getTheme({ iconFamily: 'MaterialIcons' })}>
                   <Icon name='home' style={{color:tintColor,fontSize:24}}/>
                </StyleProvider>),
        }
    },
    ZiXun: {
        screen:ZiXunPage,
        navigationOptions:{
                tabBarLabel: '资讯',
                header:null,
                tabBarIcon: ({tintColor}) => (
                    <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
                        <Icon name='newspaper-o' style={{color:tintColor,fontSize:24}}/>                       
                    </StyleProvider>),
        }
    },
    Status: {
        screen:StatusPage,
        navigationOptions:({navigation,observableStatuesStore})=>({
                tabBarLabel: '动态',
                header:null,
                tabBarIcon: ({tintColor}) => (
                    <StyleProvider style={getTheme({ iconFamily: 'FontAwesome' })}>
                       <Icon name='comments-o' style={{color:tintColor,fontSize:24}}/>
                    </StyleProvider>),
        })
    },
    Question: {
        screen: QuestionPage,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '博问',
            header:null,
            tabBarIcon: ({tintColor}) => (
                <StyleProvider style={getTheme({ iconFamily: 'MaterialIcons' })}>
                   <Icon name='question-answer' style={{color:tintColor,fontSize:24}}/>
                </StyleProvider>),
        })
    },
    Mime: {
        screen: MimePage,
        navigationOptions: {
            tabBarLabel: '更多',
            header:null,
            tabBarIcon: ({tintColor}) => (
                <StyleProvider style={getTheme({ iconFamily: 'MaterialIcons' })}>
                   <Icon name='more-horiz' style={{color:tintColor,fontSize:24}}/>
                </StyleProvider>),
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