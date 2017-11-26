import React from 'react'
import {View,Text} from 'react-native'
import NewsList from './../../component/News/NewsList'
import newsService from '../../services/newsService'
import { observer } from 'mobx-react/native';
import NewsHeader from '../../component/News/NewsHeader';
import KbView from '../KbScreen/index'
import ZiXunTabBar from '../../component/News/zixunTabBar'
import ScrollableTabView from 'react-native-scrollable-tab-view';


@observer
class Index extends React.Component{
    constructor(){
        super();
        this.state={
            type:'home',
            tabNames: ['新闻', '文章'],         
            index:1,
            isLoading:true
        }
    }
    async componentWillMount(){
        await newsService.getNewsList(this.state.type,1,10)  
        this.setState({
            isLoading:false
        })     
    }
    
    async _onRefresh(){
        await newsService.getNewsList(this.state.type,1,10);
    }

    async _onLoad(){
        await newsService.loadNewsList(this.state.type,this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
    }
    render(){
        return(
            <View style={{flex:1}}>
            <ScrollableTabView
            renderTabBar={() => <ZiXunTabBar tabNames={this.state.tabNames} />}
            tabBarPosition='top'
            >

            <View style={{flex:1}} tabLabel='key1'>
              <NewsList
                isLoading={this.state.isLoading}
                type='sitehome'
                navigation={this.props.navigation} 
                store={newsService.newsList}
                OnRefresh={this._onRefresh.bind(this)}
                OnLoad={this._onLoad.bind(this)}
             />
            </View>

            <View style={{flex:1}} tabLabel='key2'>
                <KbView navigation={this.props.navigation} />
            </View>
        </ScrollableTabView>
            </View>
        )
    }
}

export default Index;