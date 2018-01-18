import * as React from 'react'
import {Image,Text,StyleSheet,View,FlatList,TouchableHighlight} from 'react-native'
import Comment from './Comment'
import _statuesService from '../../api/statuesService'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {Spinner,Toast} from 'native-base'

/**
 * 闪存评论列表
 * 
 * @class CommentList
 * @extends {React.Component}
 */
class CommentList extends React.Component{ 
    constructor(){
        super()
        this.state={
            refreshState: RefreshState.Idle,
            listData:[],
            isLoading:true,
            index:1
        }
    }

    async componentWillMount(){
        const {statusId}=this.props;
        let data=await this._fetchCommentList(statusId);
        this.setState({
            listData:data,            
            isLoading:false,
         })
    }

    /**
     * 获取评论列表
     * 
     * @memberof CommentList
     */
    _fetchCommentList=async(id)=>{
        let response=await _statuesService.getCommentsById(id);
        if(response.status!=200){
            Toast.show({
               text:'服务器走丢了.',
               position:"center",
               type:'danger'
            })
         }
        return response.data;
    }


     /**
     * 下拉刷新
     * 
     * @memberof CommentList
     */
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const {statusId}=this.props;
        let data=await this._fetchCommentList(statusId);
        this.setState({
            refreshState: RefreshState.Idle,
            listData:data
        })
    }

    /**
     * 生成Key
     * 
     * @memberof CommentList
     */
    keyExtractor = (item, index) => {
        return index
    }
    
    _renderItem=({item})=>{
        const {getSendName}=this.props;
        return <Comment comment={item} getSendName={getSendName}/>;
    }
    
    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex:1}}>
                  <Spinner color='#3385ff'/>
                </View>
            )
        }
        return (
            <View style={{flex:1}}>
                <RefreshListView
                    data={this.state.listData}
                    keyExtractor={this.keyExtractor}
                    renderItem={this._renderItem}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}            
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderTopColor:'#D9D9D9',
        borderStyle:'solid',
    }
});

export default CommentList;