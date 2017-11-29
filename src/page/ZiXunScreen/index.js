import React from 'react'
import {View,Text} from 'react-native'
import NewsList from './../../component/News/NewsList'
import newsService from '../../services/newsService'
import kbService from '../../services/kbService'
import { observer } from 'mobx-react/native';
import NewsHeader from '../../component/News/NewsHeader';
import KbList from '../../component/News/kbList'
import ZiXunTabBar from '../../component/comm/ScrollTabBar'
import ScrollableTabView from 'react-native-scrollable-tab-view';


@observer
class Index extends React.Component{
    constructor(){
        super();
        this.state={
            type:'news',
            tabNames: ['新闻', '文章'],         
            index:1,
            isLoading:true
        }
    }

    async componentWillMount(){
        await newsService.getNewsList(1,10);
        this.setState({
            isLoading:false
        })
    }

    async updateZiXunList(obj){
		this.setState({
			isLoading:true
		})
		if(obj.i==0){
		   await this._updateList('news')
			return;
		}
		await this._updateList('kb')
  }

	async _updateList(type){
        if(type=='news'){
            await newsService.getNewsList(1,10);
            this.setState({
                type:type,
                isLoading:false
            })
            return;
        }
        await kbService.getKnowledgeList(1,10);
        this.setState({
            type:type,
            isLoading:false
        })
	}
    
    async _onRefresh(type){
        if(type=='news'){
           await newsService.getNewsList(1,10);
           return;
        }
        await kbService.getKnowledgeList(1,10)
    }

    async _onLoad(type){
        if(type=='news'){
            await newsService.loadNewsList(this.state.index+1,10);
            this.setState({
                index:this.state.index+1
            })
            return;
        }
        await kbService.loadKnowledgeList(this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
    }

    _renderItem(type){
        if(type=='news'){
           return (
            <NewsList
            isLoading={this.state.isLoading}
            type='news'
            navigation={this.props.navigation} 
            store={newsService.newsList}
            OnRefresh={this._onRefresh.bind(this)}
            OnLoad={this._onLoad.bind(this)}
           />);
        }

        return (<KbList 
                 isLoading={this.state.isLoading}
                 type='kb'
                 navigation={this.props.navigation} 
                 store={kbService.knowledgeList}
                 OnRefresh={this._onRefresh.bind(this)}
                 OnLoad={this._onLoad.bind(this)}
                 />)
    }
    render(){
        return(
            <View style={{flex:1}}>
            <ScrollableTabView
              renderTabBar={() => <ZiXunTabBar tabNames={this.state.tabNames} />}
              tabBarPosition='top'
              onChangeTab={(obj) => {
                this.updateZiXunList(obj);
              }}
            >
            <View style={{flex:1}} tabLabel='key1'>
                {this._renderItem(this.state.type)}
            </View>

            <View style={{flex:1}} tabLabel='key2'>
                {this._renderItem(this.state.type)}
            </View>
        </ScrollableTabView>
            </View>
        )
    }
}

export default Index;