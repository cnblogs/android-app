import {AsyncStorage} from 'react-native'
import {observable} from 'mobx'
import Http from '../utils/Http'
import axios from 'axios'
import collectionService from '../services/collectionService'

class Collection {
    async Check(url){
        const data=await AsyncStorage.getItem('a_token');
        const access_token=JSON.parse(data).access_token
        let response=await axios({
           method:'HEAD',
           url:`https://api.cnblogs.com/api/Bookmarks?url=${url}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response.status;
    }

    async Save(data){
        const tokenstr=await AsyncStorage.getItem('a_token');
        const access_token=JSON.parse(tokenstr).access_token
        let response=await axios({
           method:'Post',
           url:'https://api.cnblogs.com/api/Bookmarks',
           data:JSON.stringify(data),
           headers:{
             "Authorization":`Bearer ${access_token}`,
             "Content-Type":"application/json"
            }
        })
           return response.status;
    }

    async Remove(url){
        const data=await AsyncStorage.getItem('a_token');
        const access_token=JSON.parse(data).access_token
        let response=await axios({
           method:'Delete',
           url:`https://api.cnblogs.com/api/Bookmarks/?url=${url}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
           })
           return response.status;
    }
}

const collection=new Collection();
export default collection