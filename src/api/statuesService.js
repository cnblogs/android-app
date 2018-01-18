import {AsyncStorage} from 'react-native'
import Http from '../utils/Http'
import AppToken from '../config/AppToken'
import axios from 'axios'


/**
 * 闪存API
 * 
 * @class StatusService
 */
class StatusService {
    static instance = null;
    static getInstance() {
        return !StatusService.instance
            ? new StatusService()
            : StatusService.instance;
    } 

    /**
     * 分页获取闪存
     * 
     * @param {any} category 
     * @param {any} index 
     * @param {any} size 
     * @memberof StatusService
     */
    async getStatusAsync(category,index,size){
        let access_token=''
        if(category!='all'){
            const data=await AsyncStorage.getItem('a_token');
             access_token=JSON.parse(data).access_token
        }else{
          access_token=await AppToken.Client_Credentials_Token();          
        }
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/@${category}?pageIndex=${index}&pageSize=${size}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response;
    }

    /**
     * 根据Id获取闪存详情
     * 
     * @param {any} statusId 
     * @memberof StatusService
     */
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
           return response;
    }

    /**
     * 分页获取闪存评论
     * 
     * @param {any} statusId 
     * @memberof StatusService
     */
    async getCommentsById(statusId){
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/${statusId}/comments`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response;
    }


    /**
     * 发布闪存
     * 
     * @param {any} messages 
     * @param {any} IsPrivate 
     * @memberof StatusService
     */
    async publishStatues(messages,IsPrivate){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/statuses`;    
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data={
                "IsPrivate":IsPrivate,
                "Content":messages
              }
           await Http.PostAsJsonAsync(url,access_token,data)
         }
    }

    /**
     * 发布评论
     * 
     * @param {any} message 
     * @param {any} statusId 
     * @memberof StatusService
     */
    async publishComment(message,statusId){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let url=`https://api.cnblogs.com/api/statuses/${statusId}/comments`      
         if(tokenStr){
             let access_token=JSON.parse(tokenStr).access_token;
             let data={
                "ReplyTo": 0,
                "ParentCommentId": 0,
                "Content":message
              }
           await Http.PostAsJsonAsync(url,access_token,data)
         }
    }
}
const statusService=StatusService.getInstance();
export default statusService;