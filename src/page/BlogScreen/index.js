import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
  View,
  StatusBar
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomeTabBar from '../../component/Blog/HomeTabBar';
import BlogList from '../../component/Blog/blogs'
import blogService from '../../services/blogService';
import { observer } from 'mobx-react/native';

@observer
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabNames: ['首页', '推荐'],
			type:'sitehome'
		};
	}

	// async componentWillMount(){
	// 	await blogService.getBlogList(this.state.type,1,10)
	// }

	async updateBlogList(obj){
		if(obj.i==0){
			await blogService.getBlogList('sitehome',1,10);
			this.setState({
				type:'sitehome'
			})
		}else{
		await blogService.getBlogList('picked',1,10);
		this.setState({
			type:'picked'
		})
	  }
	}
	
	async _onRefresh(type){
        await blogService.getBlogList(type,1,10);    
    }

    async _onLoad(type){
        await blogService.loadBlogList(type,this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
    }

	render() {
		let tabNames = this.state.tabNames;
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
				renderTabBar={() => <HomeTabBar tabNames={tabNames} />}
				tabBarPosition='top'
				onChangeTab={(obj) => {
					this.updateBlogList(obj);
				 }}
				>

				<View style={styles.content} tabLabel='key1'>
				  <BlogList 
				    type={this.state.type}
				    navigation={this.props.navigation} 
				    store={blogService.blogList}
				    OnRefresh={this._onRefresh.bind(this)}
				    OnLoad={this._onLoad.bind(this)}
				  />
				</View>

				<View style={styles.content} tabLabel='key2'>
				  <BlogList 
				   type={this.state.type}
				   navigation={this.props.navigation} 
				   store={blogService.blogList}
				   OnRefresh={this._onRefresh.bind(this)}
				   OnLoad={this._onLoad.bind(this)}
				 />
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