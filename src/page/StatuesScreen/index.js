import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
    View,
    AsyncStorage
} from 'react-native';
import { Container,Tabs,Tab,ScrollableTab,Header,Left,Body, Right, Button, Icon, Title} from 'native-base';
import StatuesList from '../../component/statues/StatuesList';
import GlobalStyles  from '../../config/GlobalStyles'

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types:[
				{
					key:1,
					labelName:'动态',
					type:'all'
				},{
					key:2,
					labelName:'关注',
					type:'following'
				},{
					key:3,
					labelName:'我的',
					type:'my'
				}
			],
		};
	}

	linkToPublish=()=>{
		this.props.navigation.navigate('PublishStatus')
	}

	_renderTabOptions=(item)=>{
		return(
		  <Tab heading={item.labelName}
			key={item.key}
			activeTabStyle={GlobalStyles.primarColor}
			tabStyle={GlobalStyles.primarColor}>
			<StatuesList
			   category={item.type}
			   navigation={this.props.navigation}
			   isLogin='true'
			 />
		  </Tab>)
	}

	render() {
		const {types}=this.state;
		return(
			<Container>
				<Header androidStatusBarColor="#007FFF" style={{backgroundColor:'#007FFF',height:35,elevation: 0,justifyContent:'center'}}>
				  <Left style={{flex:1}}/>
				  <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                    <Title>闪存</Title>
                 </Body>
                 <Right style={{flex:1}}>
                  <Button transparent>
                    <Icon name='create' onPress={this.linkToPublish}/>
                  </Button>
                </Right>
                </Header>
				<Tabs renderTabBar={()=> <ScrollableTab/>}
		              style={GlobalStyles.primarColor}>
		        {
			       types.map((type)=> this._renderTabOptions(type))
		         }
                </Tabs>
			</Container>
		);
	}
}
export default Main;