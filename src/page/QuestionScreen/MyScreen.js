import * as React from 'react';
import { Text, FlatList, View, StyleSheet, AsyncStorage } from 'react-native';
import axios from 'axios'
import Question from './../../component/question/Question'
import Loading from './../../component/comm/Loading'
import observableQuestionStore from '../../services/questionService';
import {observer} from 'mobx-react';
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'
import {Button} from 'react-native-elements'

@observer
class MyScreen extends React.Component{
    static navigationOptions={
        title:'我的'
    }
    constructor(){
        super()
        this.state={
            isLoading: true,
            index:1,
            refreshState: RefreshState.Idle,
            isLogin:false
        }
    }
    async componentWillMount(){
        const tokenStr=await AsyncStorage.getItem('a_token');
        if(tokenStr!=null){
           await observableQuestionStore.getQuestionList(1,10,'@myquestion')        
           this.setState({
            isLoading:false,
            isLogin:true,
        })
    }
    }

   _goToDetail(item) {
    const { navigate } = this.props.navigation;
    navigate("QuestionDetail",{
        data:item
    })
}

onHeaderRefresh =async() => {
    this.setState({refreshState: RefreshState.HeaderRefreshing})
    await observableQuestionStore.getQuestionList(1,10,'@myquestion')
    this.setState({
        refreshState: RefreshState.Idle
    })
}

onFooterRefresh = async() => {
    this.setState({refreshState: RefreshState.FooterRefreshing})
    setTimeout(async() => {
        await observableQuestionStore.loadQuestionList(this.state.index+1,10,'@myquestion')
        this.setState({
            refreshState: RefreshState.Idle,
            index:this.state.index+1
        })
    }, 1000)
}

keyExtractor = (item, index) => {
    return index
}

    _renderItem=({item})=>{
        return(
            <Question {...item} GoTo={this._goToDetail.bind(this)}/>
        )
    }
    _keyExtractor = (item,index) => item.key;
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
              data={observableQuestionStore.questionList}
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
        height:1
    }
})

export default MyScreen;