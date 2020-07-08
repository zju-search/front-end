// import base from './base'
import axios from '@/utils/http'

const Market = {
    getMarketData(params) {
        return axios.post('/postapi/getStocksbyMarket', params)
    }
}

export default Market