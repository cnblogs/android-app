import {observable} from 'mobx'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import {AsyncStorage} from 'react-native'

class ObservableBlogStore {
    @observable blogList=[]
    @observable pickedBlogList=[]
    @observable blogContent=''
    @observable blogComments=[]
    @observable isLoading=true

   async getBlogList(type,pageIndex,pageSize){
        const url=`https://api.cnblogs.com/api/blogposts/@${type}?pageIndex=${pageIndex}&pageSize=${pageSize}`
        const access_token=await AppToken.Client_Credentials_Token();
        console.log(access_token);
        let response=await Http.GetAsync(url,access_token);
        this.blogList=response.data
    }

    async loadBlogList(type,pageIndex,pageSize){
        const url=`https://api.cnblogs.com/api/blogposts/@${type}?pageIndex=${pageIndex}&pageSize=${pageSize}`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.blogList.push(...response.data)
    }

    async getBlogContent(blogId){
        const url=`https://api.cnblogs.com/api/blogposts/${blogId}/body`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.blogContent=response.data 
    }
    
    async getBlogComments(blogApp,postId,index,size){
        const url=`https://api.cnblogs.com/api/blogs/${blogApp}/posts/${postId}/comments?pageIndex=${index}&pageSize=${size}`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.blogComments=response.data 
    }

    async loadBlogComments(blogApp,postId,index,size){
        const url=`https://api.cnblogs.com/api/blogs/${blogApp}/posts/${postId}/comments?pageIndex=${index}&pageSize=${size}`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.blogComments.push(...response.data)
    }

    async postBlogComment(blogApp,postId,body){
        const tokenStr=await AsyncStorage.getItem('a_token');
        const url=`https://api.cnblogs.com/api/blogs/${blogApp}/posts/${postId}/comments`;
        let access_token=JSON.parse(tokenStr).access_token;
        let data={
           "body":body,
         }
        await Http.PostAsJsonAsync(url,access_token,data)
    }
}

const observableBlogStore = new ObservableBlogStore()
export default observableBlogStore