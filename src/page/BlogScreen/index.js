import React, { Component } from 'react';
import {StatusBar} from 'react-native'
import { Container,Tabs,Tab,ScrollableTab} from 'native-base';
import BlogList from '../../component/Blog/BlogList';
import GlobalStyles from '../../config/GlobalStyles'

export default class Main extends Component {
   constructor(props) {
	 super(props);
	 this.state={
		 types:[
			 {
				 key:1,
				 labelName:'首页',
				 type:'sitehome'
			 },{
				 key:2,
				 labelName:'推荐',
				 type:'picked'
			 }
		],
	 }
	}

	   /**
    * 转到详情页
    * 
    * @memberof 
    */
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


		/**
		 * tab导航栏
		 * 
		 * @memberof Main
		 */
		_renderTabOptions=(item)=>{
	  return(
		<Tab heading={item.labelName}
		  key={item.key}
		  activeTabStyle={GlobalStyles.primarColor}
		  tabStyle={GlobalStyles.primarColor}>
		  <BlogList
		     category={item.type}
				 linkToDetails={this.linkToDetails}
		   />
	    </Tab>)
  }

  render() {
	const {types}=this.state;
    return (
      <Container>
		  <StatusBar  
            animated={true} 
            hidden={false}   
            backgroundColor={'#2196F3'}
            translucent={false}  
            barStyle={'dark-content'}
            />
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