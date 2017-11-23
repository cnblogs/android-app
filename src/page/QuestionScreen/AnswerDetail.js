import React from 'react'
import {FlatList,View,Text,StyleSheet} from 'react-native'
import Comment from '../../component/question/Comment'
import QuestionInput from '../../component/question/questionInput'

class AnswerDetail extends React.Component{
    static navigationOptions= {
        headerTitle: '评论',
        headerStyle:{
            marginTop:20
        }
    }
    constructor(props){
        super(props);
        this.state={
            Comments:this.props.navigation.state.params.comments
        }
    }
    _renderItem(comment) {    
        console.log(this.props.navigation.state.params.AnswerID)   
        return (<Comment data={comment}/>)
    }
    render(){
        return(
            <View style={{flex:1}}>
               <View style={{flex:1}}>
                 <FlatList 
                  ItemSeparatorComponent={()=><View style={styles.sepa}></View>}                    
                  data={this.state.Comments}
                  renderItem={({item})=>this._renderItem(item)} />
                </View>
                 <View>
                    <QuestionInput qid={this.props.navigation.state.params.Qid} aid={this.props.navigation.state.params.AnswerID} />
                 </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    sepa:{
        borderTopWidth:1,
        borderStyle:'solid',
        borderColor:'#E9E9EF'
    }
})

export default AnswerDetail;