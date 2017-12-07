import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
    View,
  AsyncStorage
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StatusTabBar from '../../component/statues/StatusTabBar';
import StatuesList from './StatuesList';
import statuesService from '../../services/statuesService';
import { observer } from 'mobx-react/native';
import {Icon} from 'react-native-elements'

@observer
class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabNames: ['动态', '关注','我的'],
			index:1,
			type:'all',
			isLoading:true,
			islogin:false,
		};
	}

	async componentWillMount(){
		await statuesService.getStatuesList('all',1,10)
		this.setState({
			isLoading:false,
		})
	}

	_navigationToPublish(){
		this.props.navigation.navigate("PublishStatus")
	}

	async updateZiXunList(obj){
		this.setState({
			isLoading:true
		})
		if(obj.i==0){
			await statuesService.getStatuesList('all',1,10)
			this.setState({
				type:'all',
				isLoading:false,
				islogin:true
			})
			return;
		}

		if(obj.i==1){
			let islogin=this._isLogin();
			if(islogin){
			await statuesService.getStatuesList('following',1,10)
			this.setState({
				type:'following',
				isLoading:false	,
				islogin:islogin
			})
			return;
		  }
		}

		if(obj.i==2){
			let islogin=this._isLogin();
			if(islogin){
				await statuesService.getStatuesList('my',1,10)
				this.setState({
					type:'my',
					isLoading:false,
					islogin:islogin
				})
				return;
			}	
		}
	}

	async _isLogin(){
		const tokenStr=await AsyncStorage.getItem('a_token');
		if(tokenStr!=null){
		   return true;
		}
		return false;
	}
	
	async _onRefresh(type){
        await statuesService.getStatuesList(type,1,10);
    }

    async _onLoad(type){
        await statuesService.loadStatuesList(type,this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
    }

	render() {
		return(
			<ScrollableTabView
				renderTabBar={() => <StatusTabBar 
					   tabNames={this.state.tabNames} 
					   navigationToPublish={this._navigationToPublish.bind(this)}/>}
				  tabBarPosition='top'
				  onChangeTab={(obj) => {
					 this.updateZiXunList(obj);
				   }}
				>

				<View style={styles.content} tabLabel='key1'>
				  <StatuesList
					type={this.state.type}
					isLogin={true}
					isLoading={this.state.isLoading}	
				    navigation={this.props.navigation} 
				    store={statuesService.statuesList}
				    OnRefresh={this._onRefresh.bind(this)}
				    OnLoad={this._onLoad.bind(this)}
			       />
                </View>
                
                <View style={styles.content} tabLabel='key2'>
				 <StatuesList
				   type={this.state.type}
				   isLogin={this.state.islogin}					
				   isLoading={this.state.isLoading}						
				   navigation={this.props.navigation} 
				   store={statuesService.statuesList}
				   OnRefresh={this._onRefresh.bind(this)}
				   OnLoad={this._onLoad.bind(this)}
			       />
                </View>

				<View style={styles.content} tabLabel='key3'>
				  <StatuesList
				    type={this.state.type}
					isLogin={this.state.islogin}					
				    isLoading={this.state.isLoading}					
				    navigation={this.props.navigation} 
				    store={statuesService.statuesList}
				    OnRefresh={this._onRefresh.bind(this)}
				    OnLoad={this._onLoad.bind(this)}
				  />
                </View>
            </ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	content: {
		flex:1
	}
});

export default Index;