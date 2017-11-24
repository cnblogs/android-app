import React from 'react'
import {View} from 'react-native'
import NewsList from './../../component/News/NewsList'
import newsService from '../../services/newsService'
import { observer } from 'mobx-react/native';
import NewsHeader from '../../component/News/NewsHeader';
import KbView from '../KbScreen/index'


@observer
class Index extends React.Component{
    constructor(){
        super();
        this.state={
            type:'home',
            index:1
        }
    }
    async componentWillMount(){
        await newsService.getNewsList(this.state.type,1,10)       
    }

    async _swithType(type){
        this.setState({
            type:type,
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

    _renderItem(){
        if(this.state.type=='kb'){
            return <KbView navigation={this.props.navigation} />
        }else{
             return <NewsList
                    type='sitehome'
                    navigation={this.props.navigation} 
                    store={newsService.newsList}
                    OnRefresh={this._onRefresh.bind(this)}
                    OnLoad={this._onLoad.bind(this)}
                 />
            }
    }

    render(){
        return(
            <View style={{flex:1}}>
            <View style={{flex:1}}>
                <View>
                   <NewsHeader Switch={this._swithType.bind(this)}/>
                </View>
                {this._renderItem()}
            </View>
            </View>
        )
    }
}

export default Index;