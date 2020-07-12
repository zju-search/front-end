import base from './base'
import axios from '@/utils/http'


const MarketCenter = {
    //排行榜
    getAllData (param) {
        return axios.post(`${base.mc}/getStocks`, param)
    },
}

export default MarketCenter