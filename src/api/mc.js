import base from './base'
import axios from '@/utils/http'


const MarketCenter = {
    getAllData (param) {
        return axios.post(`${base.mc}/getStocks`, param)
    },
}

export default MarketCenter