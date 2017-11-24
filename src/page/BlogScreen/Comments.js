import React from 'react'
import {View,FlatList,Text, StyleSheet,Dimensions} from 'react-native'
import BlogComment from '../../component/Blog/blogComment'
import BlogInput from '../../component/Blog/blogInput'
import {observer} from 'mobx-react';
import BlogService from '../../services/blogService'
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'

@observer
class Comments extends React.Component{
    static navigationOptions= {
        headerTitle: '评论',
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
       const blogApp=this.props.navigation.state.params.BlogApp;
       await BlogService.getBlogComments(blogApp,Id);
    }

    replyComment(name){
        this.setState({
            reply:`@${name} `
        })
    }

    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const Id=this.props.navigation.state.params.Id;
        const blogApp=this.props.navigation.state.params.BlogApp;
        await BlogService.getBlogComments(blogApp,Id,1,10);
        this.setState({
            refreshState: RefreshState.Idle,
        })
    }

    onFooterRefresh =() => {
        this.setState({refreshState: RefreshState.FooterRefreshing}) 
        setTimeout(async() => {
            const Id=this.props.navigation.state.params.Id;
            const blogApp=this.props.navigation.state.params.BlogApp;
            await BlogService.loadBlogComments(blogApp,Id,this.state.index+1,10);
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
        return <BlogComment 
                   data={item} 
                   replyComment={this.replyComment.bind(this)} />
    }
    render(){
        return(
            <View style={{flex:1}}>
             <View style={{flex:1}}>
             <RefreshListView
                data={BlogService.blogComments}
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
                type='blogs'
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