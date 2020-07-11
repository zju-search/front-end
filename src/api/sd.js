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
    Tenholder (params) {
        return axios.post('http://39.101.216.58:3000/mock/18/api/tenShareHolder', params)
    },
    Holdernum(params){
        return axios.post('http://39.101.216.58:3000/mock/18/api/shareHolderNum', params)
    },
    BasicData (params) {
        return axios.post(`${base.sd}/getStockDetail`, params)
    }
}

export default Detail