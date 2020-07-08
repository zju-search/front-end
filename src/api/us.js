import base from './base'
import axios from '@/utils/http'

const User = {
    Login(params) {
        return axios.post(`${base.us}/Login`, {
            params: params
        })
    },
    Register(params) {
        return axios.post(`${base.us}/Register`, {
            params: params
        })
    },
    Modify(params) {
        return axios.post(`${base.us}/modifyPwd`, {
            params: params
        })
    },
    Captcha(params) {
        return axios.post(`${base.us}/getCaptcha`, {
            params: params
        })
    }
}

export default User