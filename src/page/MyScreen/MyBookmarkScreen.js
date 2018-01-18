import React, {Component} from 'react'
import {View,AsyncStorage,TouchableHighlight,StyleSheet} from 'react-native'
import {Toast,Spinner,Container,Text} from 'native-base'
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view'
import _bookmarkService from '../../api/bookmarksService'
import moment from 'moment'


/**
 * 我的收藏
 * 
 * @class MyBookmarkScreen
 * @extends {React.Component}
 */
class MyBookmarkScreen extends React.Component{
	static navigationOptions={
        title:'我的收藏'
    }
	constructor(props) {
		super(props)
		this.state = {
			refreshState: RefreshState.Idle,
            listData:[],
            isLoading:true,
            index:1,
		};
	  }
	  async componentDidMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
         if(tokenStr){
			 let data=await this.getBookmarksList(1,10);
             this.setState({
                listData:data
             })
         }
	}
	
    _goDeail(item){
        const { navigate } = this.props.navigation;
        navigate("Content",{
            Url:item.LinkUrl,
            title:item.Title,
            type:'blog'
        });
    }
    
	async getBookmarksList(){
		let response=await _bookmarkService.getBookmarks(1,10);
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
  * @memberof MyBookmarkScreen
  */
 onHeaderRefresh =async () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        let data=await this.getBookmarksList(1,10);
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
        // let data=await this.getBookmarksList(this.state.index+1,10);
        // this.state.listData.push(...data);
        this.setState({
            refreshState:RefreshState.Idle,
            // listData:this.state.listData,
            // index:this.state.index+1
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
        return (
	<TouchableHighlight
		onPress={ ()=>this._goDeail(item) }>
		<View>
			<Text style={{fontSize:12,margin:8}}>{item.Title}</Text>
			<Text style={{marginLeft:8,marginBottom:8,fontSize:8}}>收藏于 {moment(item.DateAdded).format('YYYY-MM-DD HH:mm')}</Text>
		</View>
	</TouchableHighlight>)
	}
	
	render() {    
		return (
			<View style={{backgroundColor:'white',flex:1}}>
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
		);
	}
}

const styles=StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderStyle:'solid',
        borderColor:'#E9E9EF'
    }
})
export default MyBookmarkScreen;