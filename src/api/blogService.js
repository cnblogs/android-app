import {
    AsyncStorage
} from 'react-native'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';


/**
 * 博客API
 * @class BlogService
 */
class BlogService {

    static instance = null;
    static getInstance() {
        return !BlogService.instance
            ? new BlogService()
            : BlogService.instance;
    }
    
    /**
     * 分页获取博客列表内容
     * @param {any} category 
     * @param {any} pageIndex 
     * @param {any} pageSize 
     * @memberof BlogService
     */
    async getBlogsByCategoryAsync(category, pageIndex, pageSize) {
        const url = `https://api.cnblogs.com/api/blogposts/@${category}?pageIndex=${pageIndex}&pageSize=${pageSize}`
        const access_token = await AppToken.Update_Client_Token();
        return await Http.GetAsync(url, access_token);
    }
    
    /**
     * 分页获取用户博客
     * 
     * @param {any} blogApp 
     * @param {any} pageIndex 
     * @param {any} pageSize 
     * @memberof BlogService
     */
    async getMyblogs(blogApp,pageIndex,pageSize){
        const tokenStr=await AsyncStorage.getItem('a_token');
         let access_token=JSON.parse(tokenStr).access_token;
         let response=await axios({
            method:'Get',
            url:`https://api.cnblogs.com/api/blogs/${blogApp}/posts?pageIndex=${pageIndex}&pageSize=${pageSize}`    ,
            headers:{
              "Authorization":`Bearer ${access_token}`
                }
            })
         return response;
    }

    /**
     * 根据blogId获取博客内容，返回的内容是html格式
     * @param {any} blogId 
     * @memberof BlogService
     */
    async getBlogContent(blogId) {
        const url = `https://api.cnblogs.com/api/blogposts/${blogId}/body`
        const access_token = await AppToken.Client_Credentials_Token();
        return await Http.GetAsync(url, access_token);
    }

    /**
     * 分页获取博客评论列表
     * @param {any} blogApp 
     * @param {any} postId 
     * @param {any} index 
     * @param {any} size 
     * @memberof BlogService
     */
    async getBlogComments(blogApp, postId, index, size) {
        const url = `https://api.cnblogs.com/api/blogs/${blogApp}/posts/${postId}/comments?pageIndex=${index}&pageSize=${size}`
        const access_token = await AppToken.Client_Credentials_Token();
        return await Http.GetAsync(url, access_token);
    }

    /**
     * 发布评论
     * 
     * @param {any} blogApp 
     * @param {any} postId 
     * @param {any} body 
     * @memberof BlogService
     */
    async postBlogComment(blogApp, postId, body) {
        const tokenStr = await AsyncStorage.getItem('a_token');
        const url = `https://api.cnblogs.com/api/blogs/${blogApp}/posts/${postId}/comments`;
        let access_token = JSON.parse(tokenStr).access_token;
        let data = {
            "body": body,
        }
        await Http.PostAsJsonAsync(url, access_token, data)
    }
}

const _blogService =BlogService.getInstance();

export default _blogService;