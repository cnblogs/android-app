import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Spinner,Toast} from 'native-base'
import BlogComment from '../../component/Blog/blogComment'
import BlogInput from '../../component/Blog/blogInput'
import _blogService from '../../api/blogService'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

/**
 * 博客评论
 * 
 * @class Comments
 * @extends {React.Component}
 */
class Comments extends React.Component{
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
       const {PostId,BlogApp}=this.props.navigation.state.params;
       let data=await this._getAndUpdateData(BlogApp,PostId,1,10);
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
     * 添加·@·
     * 
     * @memberof Comments
     */
    replyComment=(name)=>{
        this.setState({
            reply:`@${name} `
        })
    }

    /**
     * 分页获取评论列表
     * 
     * @memberof Comments
     */
    _getAndUpdateData=async (blogApp, postId, index, size)=>{
        let response=await _blogService.getBlogComments(blogApp, postId, index, size);
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
    const {PostId,BlogApp}=this.props.navigation.state.params;
    let data=await this._getAndUpdateData(BlogApp,PostId,1,10);
    this.setState({
        listData:data
    })
   }

    /**
     * 下拉刷新
     * 
     * @memberof Comments
     */
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const {PostId,BlogApp}=this.props.navigation.state.params;
        let data=await this._getAndUpdateData(BlogApp,PostId,1,10);
        this.setState({
            refreshState: RefreshState.Idle,
            listData:data
        })
    }

    /**
     * 上拉加载
     * 
     * @memberof Comments
     */
    onFooterRefresh =async () => {
        this.setState({refreshState: RefreshState.FooterRefreshing}) 
        const {PostId,BlogApp}=this.props.navigation.state.params;
        let data=await this._getAndUpdateData(BlogApp,PostId,this.state.index+1,10);
        this.state.listData.push(...data);
        this.setState({
            refreshState:RefreshState.Idle,
            listData:this.state.listData,
            index:this.state.index+1
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
                data={this.state.listData}
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
                update={this.updateData}
                blogApp={this.props.navigation.state.params.BlogApp}
                id={this.props.navigation.state.params.PostId}
                type='blogs'
                reply={this.state.reply} />
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