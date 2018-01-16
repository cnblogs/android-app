import React from 'react'
import {View,FlatList,Text, StyleSheet,Dimensions} from 'react-native'
import NewsComment from '../../component/Blog/blogComment'
import BlogInput from '../../component/Blog/blogInput'
import _newsService from '../../api/newsService' 
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import {Spinner} from 'native-base'

const height=Dimensions.get('window').height;
/**
 * 新闻评论页面
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
       const {Id}=this.props.navigation.state.params;
       let data=await this._getAndUpdateData(Id,1,10);
        this.setState({
           listData:data,            
           isLoading:false,
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
    _getAndUpdateData=async (id, index, size)=>{
        let response=await _newsService.getNewsComment(id,index,size);
        if(response.status!=200){
            return  Toast.show({
                text:'服务器走丢了.',
                position: "bottom",
                style:{'marginBottom':height/2-49-49},
                type:'error'
              })
        }
        return response.data;
    }

    /**
     * 更新数据
     * 
     * @memberof Comments
     */
    updateData=async ()=>{
        const {Id}=this.props.navigation.state.params;
        let data=await this._getAndUpdateData(Id,1,10);
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
        const {Id}=this.props.navigation.state.params;
        let data=await this._getAndUpdateData(Id,1,10);
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
        const {Id}=this.props.navigation.state.params;
        let data=await this._getAndUpdateData(Id,this.state.index+1,10);
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

    _renderItem=({item})=>{
        item.Body=item.CommentContent;
        item.Author=item.UserName;
        return <NewsComment 
                   data={item} 
                   replyComment={this.replyComment.bind(this)} />
    }
    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex:1,}}>
                  <Spinner color='#3385ff'/>
                </View>
            )
        }
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