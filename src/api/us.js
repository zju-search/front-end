// import base from './base'
import axios from '@/utils/http'

const User = {
    Login(params) {
        return axios.post('/postapi/Login', params)
    },
    Register(params) {
        return axios.post('/postapi/Register', params)
    },
    Modify(params) {
        return axios.post('/postapi/modifyPwd', params)
    },
    Captcha(params) {
        return axios.post('/postapi/getCaptcha', params)
    }
}

export default User