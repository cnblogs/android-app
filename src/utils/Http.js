import axios,{AxiosResponse} from 'axios'

class Http{
    static async GetAsync(url,access_token){
        let response=await axios({
                method:'get',
                url:url,
                headers:{
                    "Authorization":`Bearer ${access_token}`
                }
            });
            return response;      
    }
    static async PostAsJsonAsync(url,access_token,data){
        let response=await axios({
            method:'post',
            url:url,
            data:JSON.stringify(data),
            headers:{
                "Authorization":`Bearer ${access_token}`,
                "Content-Type":"application/json"
            }
        });
        return response;
    }  

    static async PostAsFormAsync(url,data){
        let response=await axios({
            method:'post',
            url:url,
            data:data,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            }
        });
        return response;
    }
}

export default Http;