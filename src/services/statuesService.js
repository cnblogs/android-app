import {AsyncStorage} from 'react-native'
import {observable} from 'mobx'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import axios from 'axios'

class ObservableStatuesStore {
    @observable statuesList=[]
    @observable statuesCommentList=[]
    @observable statues={}

    async getStatuesList(type,index,size){
        let access_token=''
        if(type!='all'){
            const data=await AsyncStorage.getItem('a_token');
             access_token=JSON.parse(data).access_token
        }else{
          access_token=await AppToken.Update_Client_Token();          
        }
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/@${type}?pageIndex=${index}&pageSize=${size}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.statuesList=response.data;
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
        const access_token=await AppToken.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/${statusId}/comments`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.statuesCommentList=response.data;
    }

    async loadStatuesList(type,index,size){
        let access_token=''
        if(type!='type'){
            const data=await AsyncStorage.getItem('a_token');
            access_token=JSON.parse(data).access_token
        }else{
           access_token=await AppToken.Update_Client_Token();                 
        }
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/statuses/@${type}?pageIndex=${index}&pageSize=${size}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           this.statuesList.push(...response.data)
    }

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

    async sendStauesComment(message,statusId){
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

const observableStatuesStore=new ObservableStatuesStore()
export default observableStatuesStore