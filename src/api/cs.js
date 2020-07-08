import base from './base'
import axios from '@/utils/http'

const Market = {
    getMarketData(params) {
        return axios.get(`${base.mc}/getStocksbyMarket`,{
            params: params
        })
    }
}

export default Market