import base from './base'
import axios from '@/utils/http'


const Filter = {
    //排行榜
    Rank(params) {
        return axios.get(`${base.fi}/stockRanking`,{
            params: params
        })
    },
    //条件
    Condition(params) {
        return axios.get(`${base.fi}/condition`,{
            params: params
        })
    },
    //筛选器
    Screen(params){
        return axios.get(`${base.fi}/screener`,{
            params: params
        })
    }
}

export default Filter
