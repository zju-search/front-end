import base from './base.js'
import axios from '@/utils/http'


const Detail = {
    Info (params) {
        return axios.post(`${base.sd}/CompanyInfo`, params)
    },
    Finance (params) {
        return axios.post(`${base.sd}/financeIndex`, params)
    },
    Tenholder (params) {
        return axios.post(`http://39.99.218.252:7000/navigate-to-page//tenShareHolder`, params)
    },
    Holdernum(params){
        return axios.post(`http://39.99.218.252:7000/navigate-to-page//shareHolderNum`, params)
    },
    BasicData (params) {
        return axios.post(`${base.sd}/getStockDetail`, params)
    },
}

export default Detail