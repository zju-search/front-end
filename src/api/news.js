//import base from './base'
import axios from '@/utils/http'


const News = {
    Newsin (param) {
        return axios.post(`http://39.101.216.58:3000/mock/18/api/news`, param)
    },
}

export default News