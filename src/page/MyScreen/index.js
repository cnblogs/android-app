import  * as React from 'react';
import {AsyncStorage,View} from 'react-native';
import UCenter from '../../component/user/User'
import Http from '../../utils/Http'
import { Container, Header, Content, List,Title, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';


class Main extends React.Component{
    constructor(){
        super();
        this.state={
            isLogin:false,
            user:{}
        }
    }
    async componentWillMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url='https://api.cnblogs.com/api/users'       
        if(tokenStr){
            let access_token=JSON.parse(tokenStr).access_token;
            let userinfo=await this._request(url,access_token);
            this.setState({
                isLogin:true,
                user:userinfo
            })
        }
    }
   async _request(url,access_token){
        let response=await Http.GetAsync(url,access_token);
        return response.data;
    }

    linkToMyBlog=()=>{
      this.props.navigation.navigate('MyBlog',{
        BlogApp:this.state.user.BlogApp
      })
    }

    linkToMyBookMark=()=>{
      this.props.navigation.navigate('MyBookmark')
    }
    linkToSettings=()=>{
      this.props.navigation.navigate('Setting')
    }
    render(){
        return(
        <Container>
        <Header androidStatusBarColor="#007FFF" style={{backgroundColor:'#007FFF',height:49,justifyContent:'center'}}>
				  <Left>
                    <Title>个人</Title> 
                  </Left>
				  <Body />
                 <Right/>
            </Header>
        <Content>
          <UCenter
             navigation={this.props.navigation} 
             isLogin={this.state.isLogin} 
             user={this.state.user}
             />
          <List style={{marginTop:10,backgroundColor:'white'}}>
            <ListItem icon onPress={this.linkToMyBlog}>
              <Left>
                <Icon name="logo-rss" style={{color:'#1E90FF'}}/>
              </Left>
              <Body>
                <Text>我的博客</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem icon onPress={this.linkToMyBookMark}>
              <Left>
                <Icon name="md-star" style={{color:'#FFCC00'}}/>
              </Left>
              <Body>
                <Text>我的收藏</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem icon onPress={this.linkToSettings}>
              <Left>
                <Icon name="settings" style={{color:'#708090'}}/>
              </Left>
              <Body>
                <Text>设置</Text>
              </Body>
              <Right />
            </ListItem>
          </List>
        </Content>
      </Container>

        )
    }
}

export default Main;