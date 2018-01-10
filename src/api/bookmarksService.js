import {AsyncStorage} from 'react-native'
import AppToken from '../config/AppToken';
import axios from 'axios'
import _http from '../utils/Http'

/**
 * 网摘api服务
 *
 * @class BookMarksService
 */
class BookMarksService {

    static instance = null;
    static getInstance() {
        return !BookMarksService.instance
            ? new BookMarksService()
            : BookMarksService.instance;
    } 
    /**
    * 分页获取网摘
    *
    * @param {any} pageIndex
    * @param {any} pageSize
    * @memberof BookMarksService
    */
    async getBookmarks(pageIndex, pageSize) {
        const url = `https://api.cnblogs.com/api/Bookmarks?pageIndex=${pageIndex}&pageSize=${pageSize}`;
        const tokenStr = await AsyncStorage.getItem('a_token');
        let access_token = JSON
            .parse(tokenStr)
            .access_token;
        return await _http.GetAsync(url, access_token);
    }

    /**
     * 检查网摘是否重复
     * 
     * @returns 
     * @memberof BookMarksService
     */
    async checkBookmarks(){
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


    /**
     * 收藏网摘
     * 
     * @param {any} data 
     * @returns 
     * @memberof BookMarksService
     */
    async addBookmarks(data){
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
        return response;
    }


    /**
     * 取消网摘
     * @param {any} id 
     * @memberof BookMarksService
     */
    async removeBookmark(id) {
        const tokenStr = await AsyncStorage.getItem('a_token');
        let access_token = JSON
            .parse(tokenStr)
            .access_token;
        const url=`https://api.cnblogs.com/api/bookmarks/${id}`;
        return await _http.DeleteAsync(url,access_token);
    }
}
const bookmarksService=BookMarksService.getInstance();
export default bookmarksService;