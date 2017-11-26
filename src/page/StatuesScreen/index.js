import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
    View,
  StatusBar
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
			index:1
		};
	}
	
	_navigationToPublish(){
		this.props.navigation.navigate("PublishStatus")
	}

	async updateNewsList(obj){
		if(obj.i==0){
			await statuesService.getStatuesList('all',1,10)
			this.setState({
				type:'all'
			})
			return;
		}
		if(obj.i==1){
			await statuesService.getStatuesList('following',1,10)
			this.setState({
				type:'following'
			})
			return;
		}
		if(obj.i==2){
			await statuesService.getStatuesList('my',1,10)
			this.setState({
				type:'my'
			})
			return;
		}
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
					this.updateNewsList(obj);
				 }}
				>

				<View style={styles.content} tabLabel='key1'>
				  <StatuesList
				    type={this.state.type}
				    navigation={this.props.navigation} 
				    store={statuesService.statuesList}
				    OnRefresh={this._onRefresh.bind(this)}
				    OnLoad={this._onLoad.bind(this)}
			       />
                </View>
                
                <View style={styles.content} tabLabel='key2'>
				 <StatuesList
				   type={this.state.type}
				   navigation={this.props.navigation} 
				   store={statuesService.statuesList}
				   OnRefresh={this._onRefresh.bind(this)}
				   OnLoad={this._onLoad.bind(this)}
			       />
                </View>

				<View style={styles.content} tabLabel='key2'>
				  <StatuesList
				   type={this.state.type}
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
	
	}
});

export default Index;