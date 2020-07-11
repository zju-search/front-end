import base from './base'
import axios from '@/utils/http'


const Filter = {
    //排行榜
    Rank(params) {
        return axios.post(`${base.fi}/stockRanking`,params)
    },
    //条件
    Condition(params) {
        return axios.post(`${base.fi}/condition`,params)
    },
    //筛选器
    Screen(params){
        return axios.post(`${base.fi}/screener`,params)
    }
}

export default Filter
