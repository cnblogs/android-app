import React,{Component} from 'react'
import {View} from 'react-native'
import NewsItem from './NewsItem'
import {Toast,Spinner} from 'native-base'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import _newsService from '../../api/newsService'

/**
 * 新闻列表
 * 
 * @class NewsList
 * @extends {Component}
 */
class NewsList extends Component {
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
        let data=await this._getOrUpdateData(1,10);
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
     * 分页获取最新的新闻列表
     * @memberof NewsList
     */
    _getOrUpdateData=async(index,size)=>{
        let response=await _newsService.getNewsAsync(index,size);
        if(response.status!=200){
           return [];
        }
        return response.data;
     }


    /**
     * 跳转到详情页
     * 
     * @memberof NewsList
     */
    linkToDetails=(item)=> {
        const {navigate} = this.props.navigation;
        navigate("NewsContent", {
            Id: item.Id,
            Data: item,
            Type: 'newsitems',
            Title: item.Title
        });
    }

    /**
     * 下拉刷新
     * 
     * @memberof NewsList
     */
    onHeaderRefresh = async() => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        let data=await this._getOrUpdateData(1,10);
        this.setState({
            refreshState: RefreshState.Idle,
            listData:data
        })
    }

    /**
     * 上拉加载
     * 
     * @memberof NewsList
     */
    onFooterRefresh = async() => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        let data=await this._getOrUpdateData(this.state.index+1,10)
        this.state.listData.push(...data)
        this.setState({
            refreshState:RefreshState.Idle,
            listData:this.state.listData,
            index:this.state.index+1
        })
    }

    /**
     * 生成key
     * 
     * @memberof NewsList
     */
    keyExtractor = (item, index) => {
        return index
    }

    /**
     * 渲染NewsItem
     * 
     * @memberof NewsList
     */
    _renderItem=({item})=>{
        return <NewsItem {...item} linkToDetails={this.linkToDetails}/>
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
            <View style={{flex: 1}}>
                <RefreshListView
                    data={this.state.listData}
                    keyExtractor={this.keyExtractor}
                    renderItem={this._renderItem}
                    refreshState={this.state.refreshState}
                    onHeaderRefresh={this.onHeaderRefresh}
                    onFooterRefresh={this.onFooterRefresh}
                    footerRefreshingText='玩命加载中 >.<'
                    footerFailureText='我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText='-我是有底线的-'/>
            </View>
            ) 
        } 
    }

export default NewsList