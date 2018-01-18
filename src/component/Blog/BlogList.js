import React, {Component} from 'react'
import {View} from 'react-native'
import {Toast,Spinner} from 'native-base'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import BlogItem  from './BlogItem'
import _blogService from '../../api/blogService'
import PropTypes from 'prop-types';

/**
 * 博客列表
 * 
 * @class BlogList
 * @extends {Component}
 */
class BlogListView extends Component {
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
     * 分页获取最新的博客列表
     * @memberof BlogList
     */
     _getOrUpdateData=async(categroy,index,size)=>{
        let response=await _blogService.getBlogsByCategoryAsync(categroy,index,size);
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
     * @memberof BlogList
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
     * @memberof BlogList
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
     * @memberof BlogList
     */
    keyExtractor = (item, index) => {
        return index
    }

    /**
     * 渲染BlogItem
     * 
     * @memberof BlogList
     */
    _renderItem = ({item}) => {
        const {linkToDetails}=this.props;        
        return <BlogItem {...item} linkToDetails={linkToDetails}/>
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
                    onFooterRefresh={this.onFooterRefresh}                   
                    footerRefreshingText= '玩命加载中 >.<'
                    footerFailureText = '我擦嘞，居然失败了 =.=!'
                    footerNoMoreDataText= '-我是有底线的-'
                />
            </View>
        )
    }
}

BlogListView.propTypes={
    category:PropTypes.string,
    navigation:PropTypes.object,
}

export default BlogListView;
