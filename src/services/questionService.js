import {AsyncStorage} from 'react-native'
import {observable} from 'mobx'
import Http from '../utils/Http'
import token from '../model/token'
import axios from 'axios'

class ObservableQuestionStore {
    @observable questionList=[]
    @observable statuesCommentList=[]
    @observable statues={}

    async getQuestionList(index,size,type){
        let access_token=''
        if(type=='@myquestion'){
            const data=await AsyncStorage.getItem('a_token');
             access_token=JSON.parse(data).access_token
        }else{
          access_token=await token.Update_Client_Token();          
        }
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/${type}?pageIndex=${index}&pageSize=${size}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.questionList=response.data;
    }

    async getStatuesById(statusId){
        const data=await AsyncStorage.getItem('a_token');
        const access_token=JSON.parse(data).access_token
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/${statusId}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.statues=response.data
    }

    async getCommentListById(statusId){
        const access_token=await token.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/${statusId}/comments`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.statuesCommentList=response.data;
    }

    async loadQuestionList(index,size,type){
        let access_token=''
        if(type!='@type'){
            const data=await AsyncStorage.getItem('a_token');
            access_token=JSON.parse(data).access_token
        }else{
           access_token=await token.Update_Client_Token();                 
        }
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/${type}?pageIndex=${index}&pageSize=${size}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.questionList.push(...response.data)
    }

    async publishQuestion(title,content,tags){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/questions`      
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data={
                "Title" :title,
                "Content" :content,
                "Tags":tags,
                "Flags":1,
              }
           await Http.PostAsJsonAsync(url,access_token,data)
         }
    }

    async sendAnswer(questionId,answer){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/questions/${questionId}/answers`      
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data={
                "Answer":answer,                
              }
           await Http.PostAsJsonAsync(url,access_token,data)
         }
    }

    async sendComment(questionId,answerId,content){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/questions/${questionId}/answers/${answerId}/comments`      
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data={
                "Content":content,
                "ParentCommentId":0  
            }
           await Http.PostAsJsonAsync(url,access_token,data)
         }
    }
}

const observableQuestionStore=new ObservableQuestionStore()
export default observableQuestionStore