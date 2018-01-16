import React from 'react'
import {View} from 'react-native'
import {Toast,Spinner} from 'native-base'
import KbItem from './KbItem'
import _kbService from '../../api/kbService'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'

/**
 * 知识库列表
 * 
 * @class KbList
 * @extends {React.Component}
 */
class KbList extends React.Component{
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
     * 分页获取最新的知识库列表
     * @memberof KbList
     */
    _getOrUpdateData=async(index,size)=>{
        let response=await _kbService.getKbsAsync(index,size);
        if(response.status!=200){
           return [];
        }
        return response.data;
     }

    /**
     * 跳转到详情页
     * 
     * @memberof KbList
     */
    linkToDetails=(item)=>{
        const { navigate } = this.props.navigation;
        navigate("KbContent",{
            Id:item.Id,
            Type:'kbarticles',
            Title:item.Title,
            Data:item
        });
    }

    /**
     * 下拉刷新
     * 
     * @memberof KbList
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
     * @memberof KbList
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
     * 生成KEY
     * 
     * @memberof KbList
     */
    keyExtractor = (item, index) => {
        return index
    }

    /**
     * 渲染KbItem
     * 
     * @memberof KbList
     */
    _renderItem=({item})=>{
         return <KbItem {...item} linkToDetails={this.linkToDetails}/>
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
export default KbList;