import {Image,Text,StyleSheet,View} from 'react-native';
import { TabNavigator } from "react-navigation";
import MyScreen from './QuestionScreen/MyScreen'
import HighScoreScreen from './QuestionScreen/HighScoreScreen'
import RealTimeScreen from './QuestionScreen/RealTimeScreen'
import ZeroAnswerSceen from './QuestionScreen/ZeroAnswerSceen'


const QuestionScreenNavigator = TabNavigator({
    RealTime: { screen:RealTimeScreen },
    ZeroAnswer: { screen:ZeroAnswerSceen },
    HighScore:{screen:HighScoreScreen},
    My:{screen:MyScreen}
  },{
    animationEnabled: false,
    tabBarPosition: 'top',
    lazy: false,
    swipeEnabled:false,
    backBehavior: 'none',
    tabBarOptions:{
      tabStyle:{
        borderBottomColor:'white',
        borderBottomWidth:2
      }
    }
});

export default QuestionScreenNavigator;