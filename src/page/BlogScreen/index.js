import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
  View,
  StatusBar
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomeTabBar from '../../component/comm/ScrollTabBar';
import BlogList from '../../component/Blog/BlogList'
import blogService from '../../services/blogService';
import { observer } from 'mobx-react/native';
import SplashScreen from 'rn-splash-screen';


/**
 * App首页---首页博文列表以及推荐博文列表渲染
 */
@observer
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabNames: ['首页', '推荐'],
			type:'sitehome',
			isLoading:true,
		};
	}

componentDidMount() {
			//添加APP启动应用图  加载完成隐藏应用图
      SplashScreen.hide();
  }

	async updateBlogList(obj){
		this.setState({
			isLoading:true
		})
		if(obj.i==0){
			this._updateList('sitehome')
			return;
		}
		this._updateList('picked')
  }

	async _updateList(type){
		await blogService.getBlogList(type,1,10);
		this.setState({
			type:type,
			isLoading:false
		})
	}
	
		//下拉刷新
	  async _onRefresh(type){
        await blogService.getBlogList(type,1,10);    
    }

		//上拉加载更多
    async _onLoad(type){
        await blogService.loadBlogList(type,this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
		}

		//根据 this.state.type渲染不同的列表
		_renderItem(){
			return(
			 	 <BlogList 
				  isLoading={this.state.isLoading}
				  type={this.state.type}
				  navigation={this.props.navigation} 
				  store={blogService.blogList}
				  OnRefresh={this._onRefresh.bind(this)}
				  OnLoad={this._onLoad.bind(this)}
			  />
			)
		}

	render() {
		return (
         <View style={{flex:1}}>
           <StatusBar  
            animated={true} 
            hidden={false}   
            backgroundColor={'white'}
            translucent={false}  
            barStyle={'dark-content'}
            >  
           </StatusBar>
			<ScrollableTabView
				  renderTabBar={() => <HomeTabBar tabNames={this.state.tabNames} />}
				  tabBarPosition='top'
				  onChangeTab={(obj) => {
					  this.updateBlogList(obj);
				  }}
				>
			   <View style={styles.content} tabLabel='key1'>
				  	{this._renderItem()}
					</View>
					
				  <View style={styles.content} tabLabel='key2'>
				     {this._renderItem()}
					</View>
      </ScrollableTabView>
      </View>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex: 1
	}
});

export default Index;