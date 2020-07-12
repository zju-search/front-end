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
        return axios.post(`${base.sd}/tenShareHolder`, params)
    },
    Holdernum(params){
        return axios.post(`${base.sd}/shareHolderNum`, params)
    },
    BasicData (params) {
        return axios.post(`${base.sd}/getStockDetail`, params)
    },
    CurrentData (params){
        return axios.post(`${base.sd}/getDataToday`, params)
    },
    HistoryData (params){
        return axios.post(`${base.sd}/getHistoryData`, params)
    },
}

export default Detail