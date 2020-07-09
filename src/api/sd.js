import base from './base.js'
import axios from '@/utils/http'


const Detail = {
    //排行榜
    Info (params) {
        return axios.get(`${base.sd}/CompanyInfo`,{
            params: params
        })
    },
    Finance (params) {
        return axios.get(`${base.sd}/financeIndex`,{
            params: params
        })
    },
    BasicData (params) {
        return axios.post(`${base.sd}/getStockDetail`, params)
    }
}

export default Detail