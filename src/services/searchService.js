import {AsyncStorage} from 'react-native'
import {observable,computed} from 'mobx'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import axios from 'axios'

class ObserveableSeachResultStore{
    @observable results=[]

    async seachResult(keyWords){
        const access_token=await AppToken.Update_Client_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/ZzkDocuments/all?keyWords=${keyWords}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
               }
        })
        this.results=response.data;
    } 
};
const observeableSeachResultStore=new ObserveableSeachResultStore();
export default observeableSeachResultStore;