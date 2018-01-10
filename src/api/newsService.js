import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import {AsyncStorage} from 'react-native'

/**
 * 新闻API
 * 
 * @class NewsService
 */
class NewsService {

    static instance = null;
    static getInstance() {
        return !NewsService.instance
            ? new NewsService()
            : NewsService.instance;
    } 

   /**
    * 获取最新的新闻
    * @param {any} pageIndex 
    * @param {any} pageSize 
    * @memberof NewsService
    */
   async getNewsAsync(pageIndex,pageSize){
       
        let url=`https://api.cnblogs.com/api/NewsItems?pageIndex=${pageIndex}&pageSize=${pageSize}`        
        const access_token=await AppToken.Client_Credentials_Token();
        return await Http.GetAsync(url,access_token);
    }

    /**
     * 根据Id获取新闻内容
     * 
     * @param {any} id 
     * @memberof NewsService
     */
    async getNewsContent(id){
        const url=`https://api.cnblogs.com/api/newsitems/${id}/body`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        return response;
    }

    /**
     * 获取新闻评论
     * 
     * @param {any} id 
     * @param {any} pageIndex 
     * @param {any} pageSize 
     * @memberof NewsService
     */
    async getNewsComment(id,pageIndex,pageSize){
        const url=`https://api.cnblogs.com/api/news/${id}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.newsComments=response.data
    }

    /**
     * 发布评论
     * 
     * @param {any} newsId 
     * @param {any} body 
     * @memberof NewsService
     */
    async postNewsComment(newsId,body){
        const tokenStr=await AsyncStorage.getItem('a_token');
        const url=`https://api.cnblogs.com/api/news/${newsId}/comments`;
        let access_token=JSON.parse(tokenStr).access_token;
        let data={
           "Content":body,
         }
       return await Http.PostAsJsonAsync(url,access_token,data)
    }
}
const newsService =NewsService.getInstance();
export default newsService;