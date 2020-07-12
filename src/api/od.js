import base from './base.js'
import axios from '@/utils/http'

const OtherDetail = {

    Pledge (params){
        return axios.post(`${base.od}/getPledgeData`, params)
    },
    Performance (params){
        return axios.post(`${base.od}/performanceBroad`, params)
    },
    List (params){
        return axios.post(`${base.od}/TigerDragon`, params)
    },
}

export default OtherDetail