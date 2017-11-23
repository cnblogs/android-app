import * as React from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import token from './../../model/token'
import axios from 'axios'
import Question from './../../component/question/Question'
import Loading from './../../component/comm/Loading'
import observableQuestionStore from '../../services/questionService';
import {observer} from 'mobx-react';
import RefreshListView, {RefreshState} from '../../component/comm/RefreshListView'


@observer
class HighScoreScreen extends React.Component{
    static navigationOptions={
        title:'高分题'
    }
    constructor(){
        super()
        this.state={
            isLoading:true,
            questions:[]
        }
    }

    async componentWillMount(){
        await observableQuestionStore.getQuestionList(1,10,'@highscore')
        this.setState({
            isLoading:false,
            questions:observableQuestionStore.questionList
        })
    }

  

     _goToDetail(item) {
        const { navigate } = this.props.navigation;
        navigate("QuestionDetail",{
            data:item
        })
    }
    onHeaderRefresh =async() => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        await observableQuestionStore.getQuestionList(1,10,'@highscore')
        this.setState({
            questions: observableQuestionStore.questionList,
            refreshState: RefreshState.Idle
        })
    }
    
    onFooterRefresh = async() => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        setTimeout(async() => {
            await observableQuestionStore.loadQuestionList(this.state.index+1,10,'@highscore')
            this.setState({
                questions: observableQuestionStore.questionList,
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


    render(){
        if(this.state.isLoading){
            return(
                <Loading />
            )
        }
        return(
            <View>
            <RefreshListView
              data={this.state.questions}
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

export default HighScoreScreen;