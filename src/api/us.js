import base from './base'
import axios from '@/utils/http'

const User = {
    Login(params) {
        return axios.post(`${base.us}/Login`, params)
    },
    Register(params) {
        return axios.post(`${base.us}/Register`, params)
    },
    Modify(params) {
        return axios.post(`${base.us}/modifyPwd`, params)
    },
    Captcha(params) {
        return axios.post(`${base.us}/getCaptcha`, params)
    }
}

export default User