import React from 'react'
import {View,FlatList,Text, StyleSheet,Dimensions} from 'react-native'
import NewsComment from '../../component/News/newComment'
import BlogInput from '../../component/Blog/blogInput'
import {observer} from 'mobx-react';
import newsService from '../../services/newsService' 
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'

@observer
class Comments extends React.Component{
    static navigationOptions= {
        headerTitle: '评论',
        headerStyle:{
            marginTop:20
        }
    }
    constructor(){
        super()
        this.state={
            index:1,
            reply:''
        }
    }

   async componentWillMount(){
        const Id=this.props.navigation.state.params.Id;
        await newsService.getNewsComment(Id,1,10);
    }

    replyComment(name){
        this.setState({
            reply:`@${name} `
        })
    }
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const Id=this.props.navigation.state.params.Id;
        await newsService.getNewsComment(Id,1,10);
        this.setState({
            refreshState: RefreshState.Idle,
        })
    }

    onFooterRefresh =() => {
        this.setState({refreshState: RefreshState.FooterRefreshing}) 
        setTimeout(async() => {
            const Id=this.props.navigation.state.params.Id;
            await newsService.loadNewsComment(Id,this.state.index+1,10);
            this.setState({
                refreshState:RefreshState.Idle,
                index:this.state.index+1
            })
        },1000)    
    }

    keyExtractor = (item, index) => {
        return index
    }

    _renderItem=({item})=>{
        return <NewsComment 
                   data={item} 
                   replyComment={this.replyComment.bind(this)} />
    }
    render(){
        return(
            <View style={{flex:1}}>
             <View style={{flex:1}}>
              <RefreshListView
               data={newsService.newsComments}
               keyExtractor={this.keyExtractor}
               renderItem={this._renderItem}
               refreshState={this.state.refreshState}
               onHeaderRefresh={this.onHeaderRefresh}
               onFooterRefresh={this.onFooterRefresh}
               ItemSeparatorComponent={()=><View style={styles.sepa}></View>}                    
               footerRefreshingText= '玩命加载中 >.<'
               footerFailureText = '我擦嘞，居然失败了 =.=!'
               footerNoMoreDataText= '-我是有底线的-'
             />
            </View>
            <View>
              <BlogInput 
                blogApp={this.props.navigation.state.params.BlogApp}
                id={this.props.navigation.state.params.Id}
                type='news'
                reply={this.state.reply}/>
           </View>
        </View>
        )
    }
}
const styles=StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderStyle:'solid',
        borderColor:'#E9E9EF'
    }
})
export default Comments