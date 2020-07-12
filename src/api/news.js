//import base from './base'
import axios from '@/utils/http'


const News = {
    Newsin (param) {
        return axios.post(`http://39.99.218.252:7000/ESearch/news`, param)
    },
}

export default News