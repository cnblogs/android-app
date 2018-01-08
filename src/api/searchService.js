import {AsyncStorage} from 'react-native'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import axios from 'axios'

/**
 * 找找看API
 * 
 * @class SeachService
 */
class SeachService{

    /**
     * 根据关键字搜索内容
     * 
     * @param {any} keyWords 
     * @returns 
     * @memberof SeachService
     */
    async seachByKeyWords(keyWords){
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await axios({
           method:'Get',
           url:`https://api.cnblogs.com/api/ZzkDocuments/all?keyWords=${keyWords}`,
           headers:{
             "Authorization":`Bearer ${access_token}`
            }
        })
       return response;
    } 
};
const seachService=new SeachService();
export default seachService;