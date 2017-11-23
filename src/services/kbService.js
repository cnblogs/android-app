import {observable} from 'mobx'
import Http from '../utils/Http'
import token from '../model/token'

class ObservableKnowledgeStore{
    @observable knowledgeList=[]
    @observable knowledgeContent=''

   async getKnowledgeList(index,size){
        let url=`https://api.cnblogs.com/api/KbArticles?pageIndex=${index}&pageSize=${size}`
        let access_token=await token.Client_Credentials_Token()
        let response=await Http.GetAsync(url,access_token);
        this.knowledgeList=response.data;
    }

    async loadKnowledgeList(index,size){
        let url=`https://api.cnblogs.com/api/KbArticles?pageIndex=${index}&pageSize=${size}`
        let access_token=await token.Client_Credentials_Token()
        let response=await Http.GetAsync(url,access_token);
        this.knowledgeList.push(...response.data)
    }

    async getKnowledgeContent(id){
        let url=`https://api.cnblogs.com/api/kbarticles/${id}/body`
        let access_token=await token.Client_Credentials_Token()
        let response=await Http.GetAsync(url,access_token);
        this.knowledgeContent=response.data;
    }
}

const observableKnowledgeStore=new ObservableKnowledgeStore()
export default observableKnowledgeStore