import base from './base.js'
import axios from '@/utils/http'


const Detail = {
    //排行榜
    Info (params) {
        return axios.post(`${base.sd}/CompanyInfo`, params)
    },
    Finance (params) {
        return axios.post(`${base.sd}/financeIndex`, params)
  
    },
    BasicData (params) {
        return axios.post(`${base.sd}/getStockDetail`, params)
    }
}

export default Detail