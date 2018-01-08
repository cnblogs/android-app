import Http from '../utils/Http'
import AppToken from '../config/AppToken';

/**
 * 知识库API
 *
 * @class KbService
 */
class KbService {
    
    /**
 * 分页获取知识库
 *
 * @param {any} index
 * @param {any} size
 * @memberof KbService
 */
    async getKbsAsync(index, size) {
        let url = `https://api.cnblogs.com/api/KbArticles?pageIndex=${index}&pageSize=${size}`
        let access_token = await AppToken.Client_Credentials_Token()
        return await Http.GetAsync(url, access_token);
    }

    /**
 * 根据Id获取知识库内容
 *
 * @param {any} id
 * @memberof KbService
 */
    async getKbContent(id) {
        let url = `https://api.cnblogs.com/api/kbarticles/${id}/body`
        let access_token = await AppToken.Client_Credentials_Token()
        let response = await Http.GetAsync(url, access_token);
        return response;
    }
}
const kbService = new KbService();
export default kbService;