// import base from './base'
import axios from '@/utils/http'


const MarketCenter = {
    //排行榜
    getAllData (param) {
        return axios.post('/postapi/getStocks', param)
    },
}

export default MarketCenter