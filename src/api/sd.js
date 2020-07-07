import base from './base.js'
import axios from '@/utils/http'


const Detail = {
    //排行榜
    Info (params) {
        return axios.get(`${base.mc}/CompanyInfo`,{
            params: params
        })
    },
    Finance (params) {
        return axios.get(`${base.mc}/financeIndex`,{
            params: params
        })
    },
}

export default Detail