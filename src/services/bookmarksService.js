import {observable} from 'mobx'
import AppToken from '../config/AppToken';
import axios from 'axios'
import {AsyncStorage} from 'react-native'

class ObservableBookmarksStore {
  @observable bookmarksList=[]

   async getBookmarksList(pageIndex,pageSize){
        const tokenStr=await AsyncStorage.getItem('a_token');
         let access_token=JSON.parse(tokenStr).access_token;
         let response=await axios({
            method:'Get',
            url:`https://api.cnblogs.com/api/Bookmarks?pageIndex=${pageIndex}&pageSize=${pageSize}`    ,
            headers:{
              "Authorization":`Bearer ${access_token}`
                }
            })
         this.bookmarksList=response.data
    }

    async removeBookmark(id){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let access_token=JSON.parse(tokenStr).access_token;
        let response=await axios({
            method:'Delete',
            url:`https://api.cnblogs.com/api/bookmarks/${id}`,
            headers:{
              "Authorization":`Bearer ${access_token}`
                }
            })
        this.getBookmarksList()
    }

    async loadBookmarksList(pageIndex,pageSize){
        const tokenStr=await AsyncStorage.getItem('a_token');
        let access_token=JSON.parse(tokenStr).access_token;
        let response=await axios({
                method:'Get',
                url:`https://api.cnblogs.com/api/Bookmarks?pageIndex=${pageIndex}&pageSize=${pageSize}`    ,
                headers:{
                  "Authorization":`Bearer ${access_token}`
                    }
                })
             this.bookmarksList.push(...response.data)
         }
    }   

const observableBookmarksStore = new ObservableBookmarksStore()
export default observableBookmarksStore