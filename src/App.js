import * as React from 'react' 
import { StackNavigator } from "react-navigation"
import {AppRegistry} from 'react-native'
import MainPage from './page/index'
import ContentPage from './page/CommScreen/ContentPage'
import SearchPage from './page/CommScreen/SearchPage'
import SearchHeader from './component/seach/SeachHeader'
import LoginPage from './page/CommScreen/LoginPage'
import MyBlogPage from './page/MyScreen/MyBlogScreen'
import MyBookmarksPage from './page/MyScreen/MyBookmarkScreen'
import SettingPage from './page/MyScreen/SettingScreen'
import PublishStatus from './page/StatuesScreen/PublishStatus'
import StatusDetail from './page/StatuesScreen/StatusDetailScree'
import PublishQuestion from './page/QuestionScreen/PublishQuestion'
import QuestionDetail from './page/QuestionScreen/QDetailScreen'
import QAnswerDetail from './page/QuestionScreen/AnswerDetail'
import BlogContent from './page/BlogScreen/showContent'
import BlogComments from './page/BlogScreen/Comments'
import NewsContent from './page/ZiXunScreen/showNewsContent'
import NewsComments from './page/ZiXunScreen/comments'
import KbContent from './page/ZiXunScreen/showKbContent'


const AndroidCnBlogsApp=StackNavigator({
    Main:{screen:MainPage},
    Content:{screen:ContentPage},
    BlogContent:{screen:BlogContent},
    NewsContent:{screen:NewsContent},
    KbContent:{screen:KbContent},
    BlogComments:{screen:BlogComments},
    NewsComments:{screen:NewsComments},
    Login:{screen:LoginPage},
    MyBlog:{screen:MyBlogPage},
    MyBookmark:{screen:MyBookmarksPage},
    Setting:{screen:SettingPage},
    Search:{
        screen:SearchPage,
        navigationOptions:({navigation})=>({
            header:<SearchHeader {...navigation}/>
        })
    },
    StatusDetail:{screen:StatusDetail},
    PublishStatus:{screen:PublishStatus},
    QuestionDetail:{screen:QuestionDetail},    
    PublishQuestion:{screen:PublishQuestion},
    QAnswerDetail:{screen:QAnswerDetail}

})

export default AndroidCnBlogsApp