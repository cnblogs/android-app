import React, {Component} from 'react'
import {View,AsyncStorage} from 'react-native'
import {Toast,Spinner,Container} from 'native-base'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import BlogItem  from '../../component/Blog/BlogItem'
import BlogList from '../../component/Blog/BlogList'
import Http from '../../utils/Http'

class MyBlogScreen extends React.Component {
	static navigationOptions={
        title:'我的博客'
	}
	
	constructor(props) {
		super(props)
        const { params } = this.props.navigation.state               
		this.state = {
			refreshState: RefreshState.Idle,
            listData:[],
            isLoading:true,
            index:1,
            blogApp:params.BlogApp
		};
	}
	
    async componentDidMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
         if(tokenStr){
             let data=await this._getOrUpdateData(this.state.blogApp,1);
             this.setState({
                listData:data
             })
         }
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
	async _getOrUpdateData(blogApp,index){
		const tokenStr=await AsyncStorage.getItem('a_token');
		let access_token=JSON.parse(tokenStr).access_token;	
        let url=`https://api.cnblogs.com/api/blogs/${blogApp}/posts?pageIndex=${index}`		
		let response=await Http.GetAsync(url,access_token);
		if(response.status!=200){
			console.log('请求出错！！！')
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
        let data=await this._getOrUpdateData(this.state.blogApp,1);
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
        let data=await this._getOrUpdateData(this.state.blogApp,this.state.index+1);
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
        return <BlogItem {...item} linkToDetails={this.linkToDetails}/>
    }
	
    linkToDetails=(id,title,avatar,author,postDate,blogApp)=>{
		const { navigate } = this.props.navigation;
		navigate("BlogContent",{
					Data:{
						Title:title,
						Avatar:avatar,
						Author:author,
						PostDate:postDate,
						BlogApp:blogApp,
						PostId:id,
					},
					Id:id,
					title:`${author}的博客`,
					Type:'blogposts'
			});
	}

	render() {    
		return (
			<Container>
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
			</Container>
		);
	}
}

export default MyBlogScreen;