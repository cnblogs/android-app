import React, {Component} from 'react'
import {View,StyleSheet} from 'react-native'
import {Toast,Spinner} from 'native-base'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import QuestionItem  from './QuestionItem'
import _qService from '../../api/questionService'
import PropTypes from 'prop-types';

/**
 * 问题列表
 * 
 * @class QuestionListView
 * @extends {Component}
 */
class QuestionListView extends Component {
    constructor() {
        super()
        this.state = {
            refreshState: RefreshState.Idle,
            listData:[],
            isLoading:true,
            index:1
        }
    }

    async componentDidMount(){
        const {category}=this.props;
        let data=await this._getOrUpdateData(category,1,10);
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
     * 分页获取最新的问题列表
     * @memberof QuestionListView
     */
     _getOrUpdateData=async(categroy,index,size)=>{
        let response=await _qService.getQuestionsAsync(categroy,index,size);
        if(response.status!=200){
           return [];
        }
        return response.data;
     }

    /**
     * 下拉刷新
     * 
     * @memberof QuestionListView
     */
    onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        const {category}=this.props;
        let data=await this._getOrUpdateData(category,1,10);
        this.setState({
            refreshState: RefreshState.Idle,
            listData:data
        })
    }

    /**
     * 上拉加载
     * 
     * @memberof QuestionListView
     */
    onFooterRefresh =async () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        const {category}=this.props;        
        let data=await this._getOrUpdateData(category,this.state.index+1,10);
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
     * @memberof QuestionListView
     */
    keyExtractor = (item, index) => {
        return index
    }

   /**
    * 转到详情页
    * 
    * @memberof QuestionListView
    */
   _goDeail=(item)=>{
        const { navigate } = this.props.navigation;
        navigate("QuestionDetail",{
            data:item
         })
      }

    /**
     * 渲染BlogItem
     * 
     * @memberof QuestionListView
     */
    _renderItem = ({item}) => {
        return <QuestionItem {...item} GoTo={this._goDeail}/>
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex:1,}}>
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
                    onFooterRefresh={this.onFooterRefresh}
                    ItemSeparatorComponent={()=><View style={styles.sepa}></View>}                
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
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

QuestionListView.propTypes={
    category:PropTypes.string,
    navigation:PropTypes.object,
}

export default QuestionListView;
