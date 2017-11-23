import {Image,Text,StyleSheet,View} from 'react-native';
import { TabNavigator } from "react-navigation";
import AboutMeScreen from './StatuesScreen/AboutMeScreen'
import AttentionScreen from './StatuesScreen/AttentionScreen'
import RealTimeScreen from './StatuesScreen/RealTimeScreen'
import MyScreen from './StatuesScreen/MyScreen'
import ReplyMeScreen from './StatuesScreen/ReplyMeScreen'
import service from '../services/statuesService'

const StatusScreenNavigator = TabNavigator({
    RealTime:{
      screen:RealTimeScreen,
    },
    Attention:{screen:AttentionScreen},
    ReplyMe:{screen:ReplyMeScreen},
    AboutMe:{screen:AboutMeScreen},
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

export default StatusScreenNavigator;