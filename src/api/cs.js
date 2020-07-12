import base from './base'
import axios from '@/utils/http'

const Market = {
    getMarketData(params) {
        return axios.post(`${base.cs}/getStocksbyMarket`, params)
    }
}

export default Market