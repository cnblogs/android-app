import * as React from 'react'
import { Text, View, StyleSheet,FlatList, AsyncStorage} from 'react-native'
import Say from './../../component/statues/Say';
import axios from 'axios'
import Loading from './../../component/comm/Loading'
import observableStatuesStore from '../../services/statuesService';
import { Button } from 'react-native-elements'
import token from './../../model/token'
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'


class ReplyMeScreen extends React.Component{
    static navigationOptions={
        title:'回复我',
    }
    constructor(){
        super();
        this.state={
            isLoading:true,
            isLogin:false,
            index:1,
            says:[]
        }
    }

    async componentWillMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
        if(tokenStr!=null){
            await observableStatuesStore.getStatuesList(1,10,'@comment')        
            this.setState({
                isLogin:true,
                says:observableStatuesStore.statuesList
            })
        } 
    }

    _getReplyUser(content){
        let regx=/<a.*?>(.*?)<\/a>/ig;
        let replyUser=regx.exec(content);
        if(replyUser!=null){
            return replyUser[1];
        }
        return '';
    }
    
    _goToDetail(item) {
        const { navigate } = this.props.navigation;
        navigate("StatusDetail",{
            data:item
        })
    } 
     onHeaderRefresh = async() => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        await observableStatuesStore.getStatuesList(1,10,'@comment')
        this.setState(
            {
             says:observableStatuesStore.statuesList,                
             refreshState: RefreshState.Idle
            })
    }

    onFooterRefresh = async() => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        setTimeout(async() => {
            await observableStatuesStore.loadStatuesList(this.state.index+1,10,'@comment')
            this.setState({
                refreshState: RefreshState.Idle,
                index:this.state.index+1,
                says:observableStatuesStore.statuesList
            })
        }, 1000)
    }

    keyExtractor = (item, index) => {
        return index
    }

     _renderItem=({item})=>{
        return(
            <Say {...item} GoTo={this._goToDetail.bind(this)}/>
        )
    }
    render(){
        if(!this.state.isLogin){
            return (<View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Button 
                title='立即登录' 
                buttonStyle={{height:30}}
                backgroundColor="#2096F3" 
                onPress={()=>this.props.navigation.navigate('Login')}/>
            </View>)
        }
        return(
            <View>
              <RefreshListView
               data={this.state.says}
               keyExtractor={this.keyExtractor}
               renderItem={this._renderItem}
               refreshState={this.state.refreshState}
               onHeaderRefresh={this.onHeaderRefresh}
               onFooterRefresh={this.onFooterRefresh}
               ItemSeparatorComponent={() =><View style ={styles.sepa} ></View>}
               footerRefreshingText='玩命加载中 >.<'
               footerFailureText='我擦嘞，居然失败了 =.=!'
               footerNoMoreDataText='-我是有底线的-'/>
          </View>
        )
    }
}
const styles=StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderTopColor:'#D9D9D9',
        borderStyle:'solid',
    }
})
export default ReplyMeScreen;