import base from './base'
import axios from '@/utils/http'


const MarketCenter = {
    //排行榜
    getAllData (params) {
        return axios.get(`${base.mc}/getStocks`,{
            params: params
        })
    },
}

export default MarketCenter