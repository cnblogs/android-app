import React from 'react'
import {View,Text,ScrollView,StyleSheet,StatusBar,Dimensions} from 'react-native'
import BlogList from '../../component/Blog/blogs';
import { observer } from 'mobx-react/native';
import blogService from '../../services/blogService';
import SplashScreen from "rn-splash-screen";

@observer
export default class SiteHome extends React.Component{
    constructor(){
        super()
        this.state={
            index: 1,
        }
    }

    async componentWillMount(){
        await blogService.getBlogList('sitehome',1,10)
    }

    

    // async componentDidMount(){       
    //     SplashScreen.hide();
    // }

   async _onRefresh(){
        await blogService.getBlogList(this.props.type,1,10);    
    }

    async _onLoad(){
        await blogService.loadBlogList(this.props.type,this.state.index+1,10);
        this.setState({
            index:this.state.index+1
        })
    }

 _renderItem(){
        return <BlogList 
                 type={this.state.type}
                 navigation={this.props.navigation} 
                 store={blogService.blogList}
                 OnRefresh={this._onRefresh.bind(this)}
                 OnLoad={this._onLoad.bind(this)}
                 />
    }

    render(){
        return(
            <View style={{flex:1}}>
                {this._renderItem()}
            </View>
        )
    }
}
  
