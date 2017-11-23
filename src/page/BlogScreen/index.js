import React from 'react'
import {View,Text,ScrollView,StyleSheet,StatusBar} from 'react-native'
import BlogHeader from '../../component/Blog/blogHeader'
import BlogList from '../../component/Blog/blogs';
import { observer } from 'mobx-react/native';
import blogService from '../../services/blogService';
import SplashScreen from "rn-splash-screen";

@observer
export default class Index extends React.Component{
    constructor(){
        super()
        this.state={
            type:'sitehome',
            index:1,
        }
    }

    async componentWillMount(){
        await blogService.getBlogList(this.state.type,1,10)
    }

    async componentDidMount(){       
        SplashScreen.hide();
    }

    async _swithType(type){
        await blogService.getBlogList(type,1,10)     
        this.setState({
            type:type,
        })
    }
   async _onRefresh(){
        await blogService.getBlogList(this.state.type,1,10);    
    }

    async _onLoad(){
        await blogService.loadBlogList(this.state.type,this.state.index+1,10);
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
              <StatusBar  
               animated={true} 
               hidden={false}   
               backgroundColor={'#2196F3'}
               translucent={true}  
               barStyle={'light-content'}
              >  
           </StatusBar>
              <View style={{flex:1,marginTop:10}}>
                <View>
                    <BlogHeader Switch={this._swithType.bind(this)}/>
                </View>
                    {this._renderItem()}
                </View>
            </View>
        )
    }
}
