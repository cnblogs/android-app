import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
    View,
    AsyncStorage
} from 'react-native';
import { Container,Tabs,Tab,ScrollableTab,Header,Left,Body, Right, Button, Icon, Title} from 'native-base';
import QuestionList from './../../component/question/QuestionList';
import GlobalStyles  from '../../config/GlobalStyles'

/**
 * 博问
 * 
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types:[
				{
					key:1,
					labelName:'最新',
					type:'all'
				},{
					key:2,
					labelName:'高分',
					type:'highscore'
				},{
					key:3,
					labelName:'零回答',
					type:'noanswer'
				},{
					key:4,
					labelName:'我的',
					type:'myquestion'
				}
			],
		};
	}

	/**
	 * 跳转到发布博问
	 * 
	 * @memberof Main
	 */
	linkToPublish=()=>{
		this.props.navigation.navigate('PublishQuestion')
	}

	_renderTabOptions=(item)=>{
		return(
		  <Tab heading={item.labelName}
			key={item.key}
			activeTabStyle={GlobalStyles.primarColor}
			tabStyle={GlobalStyles.primarColor}>
			<QuestionList
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
				<Header androidStatusBarColor="#007FFF" style={{backgroundColor:'#007FFF',height:30,elevation: 0}}>
				  <Left style={{flex:1}}/>
				  <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
                    <Title>博问</Title>
                 </Body>
                 <Right style={{flex:1}}>
                  <Button transparent>
				  	<Icon name='search' style={{marginRight:15}}/>
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