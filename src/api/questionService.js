import {AsyncStorage} from 'react-native'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import axios from 'axios'

/**
 * 博问API
 * 
 * @class QuestionService
 */
class QuestionService {
    static instance = null;
    static getInstance() {
        return !QuestionService.instance
            ? new QuestionService()
            : QuestionService.instance;
    } 

    /**
     * 分页获取问题列表
     * 
     * @param {any} category 
     * @param {any} index 
     * @param {any} size 
     * @memberof QuestionService
     */
    async getQuestionsAsync(category,index,size){
        let access_token=''
        if(category=='myquestion'){
            const data=await AsyncStorage.getItem('a_token');
             access_token=JSON.parse(data).access_token
        }else{
          access_token=await AppToken.Update_Client_Token();          
        }
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/@${category}?pageIndex=${index}&pageSize=${size}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response;
    }

    /**
     *获取问题详情
     * 
     * @param {any} qid 
     * @returns 
     * @memberof QuestionService
     */
    async getQuestionDetailsAsync(qid){
      const access_token=await AppToken.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/${qid}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response;
    }

    /**
     * 问题答案列表
     * 
     * @param {any} qid 
     * @returns 
     * @memberof QuestionService
     */
    async getQuestionAnswerAsync(qid){
        const access_token=await AppToken.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/${qid}/answers`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response;
    }

    /**
     * 答案评论列表
     * 
     * @param {any} qid 
     * @returns 
     * @memberof QuestionService
     */
    async getAnswerCommentAsync(answerId){
        const access_token=await AppToken.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/questions/answers/${answerId}/comments`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response;
    }

    /**
     * 发布问题
     * 
     * @param {any} title 
     * @param {any} content 
     * @param {any} tags 
     * @memberof QuestionService
     */
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
          return await Http.PostAsJsonAsync(url,access_token,data)
         }
    }


   /**
    * 回答问题
    * 
    * @param {any} questionId 
    * @param {any} answer 
    * @memberof QuestionService
    */
   async publishAnswer(questionId,answer){
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
   
    /**
     * 发布评论
     * 
     * @param {any} questionId 
     * @param {any} answerId 
     * @param {any} content 
     * @memberof QuestionService
     */
    async publishComment(questionId,answerId,content){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/questions/${questionId}/answers/${answerId}/comments`      
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data={
                "Content":content,
                "ParentCommentId":0  
            }
           return  await Http.PostAsJsonAsync(url,access_token,data)
         }
    }
}

const questionService=QuestionService.getInstance();
export default questionService