import {observable} from 'mobx'
import Http from '../utils/Http'
import AppToken from '../config/AppToken';
import {AsyncStorage} from 'react-native'

class ObservableNewsStore {
    @observable newsList=[]
    @observable newsContent=''
    @observable newsComments=[]


   async getNewsList(type,pageIndex,pageSize){
       
        let url=`https://api.cnblogs.com/api/NewsItems?pageIndex=${pageIndex}&pageSize=${pageSize}`        
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.newsList=response.data
    }

    async loadNewsList(pageIndex,pageSize){
        let url=`https://api.cnblogs.com/api/NewsItems?pageIndex=${pageIndex}&pageSize=${pageSize}`        
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.newsList.push(...response.data)
    }

    async getNewsContent(id){
        const url=`https://api.cnblogs.com/api/newsitems/${id}/body`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.newsContent=response.data
    }
    async getNewsComment(id,pageIndex,pageSize){
        const url=`https://api.cnblogs.com/api/news/${id}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.newsComments=response.data
    }

    async loadNewsComment(id,pageIndex,pageSize){
        const url=`https://api.cnblogs.com/api/news/${id}/comments?pageIndex=${pageIndex}&pageSize=${pageSize}`
        const access_token=await AppToken.Client_Credentials_Token();
        let response=await Http.GetAsync(url,access_token);
        this.newsComments.push(...response.data)
    }

    async postNewsComment(newsId,body){
        const tokenStr=await AsyncStorage.getItem('a_token');
        const url=`https://api.cnblogs.com/api/news/${newsId}/comments`;
        let access_token=JSON.parse(tokenStr).access_token;
        let data={
           "Content":body,
         }
        await Http.PostAsJsonAsync(url,access_token,data)
    }
}

const observableNewsStore = new ObservableNewsStore()
export default observableNewsStore