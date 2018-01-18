import React from 'react'
import {FlatList,View,Text,StyleSheet} from 'react-native'
import  {Button,Spinner,Toast} from 'native-base'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import Comment from '../../component/question/Comment'
import CommentInput from '../../component/comm/commentInput'
import _qService from '../../api/questionService'
import moment from 'moment'



/**
 * 回答评论
 * 
 * @class AnswerDetail
 * @extends {React.Component}
 */
class AnswerDetail extends React.Component{
    static navigationOptions= {
        headerTitle: '评论',
     }
    constructor(){
        super()
        this.state={
            refreshState: RefreshState.Idle,
            listData:[],
            isLoading:true,
            index:1,
            reply:'',            
        }
    }

   async componentDidMount(){
       const {AnswerID}=this.props.navigation.state.params;
       let data=await this._getAndUpdateData(AnswerID);
       console.log('评论数据');
       console.log(data);
        this.setState({
           listData:data,
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props!=nextProps){
            this.porps=nextProps
        }
    }

    /**
     * 分页获取评论列表
     * 
     * @memberof Comments
     */
    _getAndUpdateData=async (aid)=>{
        let response=await _qService.getAnswerCommentAsync(aid);
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
    * 更新数据
    * 
    * @memberof Comments
    */
    updateData=async()=>{
    const {AnswerID}=this.props.navigation.state.params;
    let data=await this._getAndUpdateData(AnswerID);
    this.setState({
        listData:data
    })
   }

  /**
   * 发布评论
   * 
   * @param {any} content 
   * @memberof Comments
   */
   postAnswerComment=async(content)=>{
      const {AnswerID,Qid}=this.props.navigation.state.params;
      await _qService.publishComment(Qid,AnswerID,content)
   }

    /**
     * 下拉刷新postBlogComment
     * 
     * @memberof Comments
     */
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const {AnswerID}=this.props.navigation.state.params;
        let data=await this._getAndUpdateData(AnswerID);
        this.setState({
            refreshState: RefreshState.Idle,
            listData:data
        })
    }

    /**
     * 生成Key
     * 
     * @memberof Comments
     */
    keyExtractor = (item, index) => {
        return index
    }

    /**
     * 渲染item
     * 
     * @memberof Comments
     */
    _renderItem=({item}) => {
        console.log(item);
        return <Comment data={item} />
    }

    render(){
        return(
           <View style={{flex:1}}>
             <View style={{flex:1}}>
             <RefreshListView
                data={this.state.listData}
                keyExtractor={this.keyExtractor}
                renderItem={this._renderItem}
                refreshState={this.state.refreshState}
                onHeaderRefresh={this.onHeaderRefresh}
                ItemSeparatorComponent={()=><View style={styles.sepa}></View>}                    
                footerRefreshingText= '玩命加载中 >.<'
                footerFailureText = '我擦嘞，居然失败了 =.=!'
                footerNoMoreDataText= '-我是有底线的-'
              />
            </View>
            <View>
              <CommentInput
                postComment={this.postAnswerComment}
                update={this.updateData}
                reply='' />
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

export default AnswerDetail;