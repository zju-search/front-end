<template>
    <a-layout>
        <a-modal v-model="user_login_visible" title="| 用户登录" @ok="confirmLogin" ok-text="登录" cancel-text="取消">
            <label>邮箱：</label>
            <a-input
                v-model="input_email"
                v-decorator="['email',{rules: [{type: 'email', message: 'The input is not valid E-mail!',}, {required: true, message: 'Please input your E-mail!'}]}]"
            />
            <label>密码：</label>
            <a-input type="password" v-model="input_password" v-decorator="['password', { rules: [{ required: true, message: '请输入用户密码' }]}]"/>
            <a @click="modifyPassword" :style="{float: 'right'}">忘记密码</a>
            <br /><br />
            <a @click="userRegister"><u>点击注册</u></a>
        </a-modal>
        <a-modal v-model="user_register_visible" title="| 用户注册" @ok="confirmRegister" ok-text="注册" cancel-text="取消" width="600px">
            <div>
                <a-form :form="form" :style="{paddingRight: '100px'}">
                    <a-form-item v-bind="formItemLayout" label="用户名称">
                        <a-input
                            v-decorator="['username',{rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]}]"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="登录密码" has-feedback>
                        <a-input
                            type="password"
                            v-decorator="[ 'password', {rules: [{required: true, message: 'Please input your password!',},{validator: validateToNextPassword}]}]"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="重复密码" has-feedback>
                        <a-input
                            type="password"
                            v-decorator="['confirm', {rules: [{required: true, message: 'Please confirm your password!',}, {validator: compareToFirstPassword}]}]"
                            @blur="handleConfirmBlur"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="单位邮箱">
                        <a-input
                            v-decorator="['email', {rules: [{type: 'email', message: 'The input is not valid E-mail!',},{required: true, message: 'Please input your E-mail!'}]}]"
                        />
                    </a-form-item>
                    <a-form-item
                        v-bind="formItemLayout"
                        label="邮箱验证码"
                    >
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-input
                                    v-decorator="['captcha',{ rules: [{ required: true, message: '输入验证码有误！' }]}]"
                                />
                            </a-col>
                            <a-col :span="12">
                                <a-button @click="getCaptcha">获取验证码</a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <a-modal v-model="user_modifyPwd_visible" title="| 忘记密码" @ok="confirmModify" ok-text="确定" cancel-text="取消" width="600px">
            <div>
                <a-form :form="form" :style="{paddingRight: '100px'}">
                    <a-form-item v-bind="formItemLayout" label="新密码" has-feedback>
                        <a-input
                            type="password"
                            v-decorator="['password',{rules: [{required: true, message: 'Please input your password!'},{validator: validateToNextPassword}]}]"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="重复密码" has-feedback>
                        <a-input
                            type="password"
                            v-decorator="['confirm',{rules: [{required: true,message: 'Please confirm your password!'},{validator: compareToFirstPassword}]}]"
                            @blur="handleConfirmBlur"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="单位邮箱">
                        <a-input
                            v-decorator="['email',{rules: [{type: 'email',message: 'The input is not valid E-mail!',},{required: true,message: 'Please input your E-mail!'}]}]"
                        />
                    </a-form-item>
                    <a-form-item
                            v-bind="formItemLayout"
                            label="邮箱验证码"
                    >
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-input
                                    v-decorator="['captcha',{ rules: [{ required: true, message: '输入验证码有误！'}]}]"
                                />
                            </a-col>
                            <a-col :span="12">
                                <a-button @click="getCaptcha">获取验证码</a-button>
                            </a-col>
                        </a-row>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>

        <a-menu mode="horizontal" :style="{backgroundColor: '#4682B4', color:'#ffffff'}">
            <a-menu-item>
                <a-icon type="mail"/>
                首页
            </a-menu-item>
            <a-menu-item>
                <a-icon type="appstore"/>
                筛选器
            </a-menu-item>
            <a-menu-item>
                <a-input-search placeholder="请输入股票代码" @search="startSearch" />
            </a-menu-item>
            <a-sub-menu v-if="isLogin" :style="{float:'right'}">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="team" />{{username}}</span>
                <a-menu-item key="info: modifyPwd" @click="modifyPassword">
                    修改密码
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item :style="{float:'right'}" v-if="isLogin" @click="quitLogin">
                <a-icon type="logout"/>
                退出
            </a-menu-item>
            <a-menu-item v-else :style="{float:'right'}" @click="userLogin">
                <a-icon type="team"/>
                登录
            </a-menu-item>
        </a-menu>
        <a-layout-content>
            <RouterView></RouterView>
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
            Powered By Ant Design ©2020
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import VueCookies from 'vue-cookies';
    import router from "../router";

    export default {
        name: 'Index',
        beforeCreate() {
            this.username = VueCookies.get('username');
            this.token = VueCookies.get("token");
            this.email = VueCookies.get("email");
        },
        data(){
            return {
                form: this.$form.createForm(this, { name: 'register' }),
                isLogin: false,
                username: VueCookies.get('username'),
                user_login_visible: false,
                user_register_visible: false,
                user_modifyPwd_visible: false,
                input_email: '',
                input_password: '',
                captcha: '',
                confirm: '',
                confirmDirty: false,
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 8 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 16 },
                    },
                },
                validate_status: "error"
            }
        },
        methods:{
            userLogin(){
                this.user_login_visible  = true;
            },
            userRegister(){
                this.user_register_visible  = true;
            },
            modifyPassword(){
                this.user_modifyPwd_visible = true;
            },
            confirmLogin(){
                let $this = this;
                let param = new URLSearchParams();
                param.append('email', this.input_email);
                param.append('password', this.input_password);
                let email = this.input_email;
                this.$api.User.Login(param).then(function (response) {
                    let data = response.data;
                    let state = data.state;
                    if (state == true) {
                        let username = data.username;
                        let token = data.token;
                        VueCookies.set('username', username, "1d");
                        VueCookies.set("token", token, "1d");
                        VueCookies.set("email", email, "1d");
                        $this.isLogin = true;
                        router.push("/");
                    }
                    else{
                        alert(data.message);
                    }
                });
                this.user_login_visible = false;

            },
            confirmRegister(){
                this.form.validateFields((err, values) => {
                    if (this.captcha == '' || values.captcha != this.captcha) {
                        console.log(this.captcha);
                        console.log(values.captcha);
                        this.$error({
                            title: '错误',
                            content: '请输入正确的验证码！',
                        });
                        return;
                    }
                    if (values.email == '' || values.password == '' || values.password != values.confirm) {
                        this.$error({
                            title: '错误',
                            content: '请输入邮箱和密码！',
                        })
                    }
                    else {
                        let $this = this;
                        let param = new URLSearchParams();
                        let username = values.username;
                        let email = values.email;
                        param.append('email', values.email);
                        param.append('password', values.password);
                        param.append('username', values.username);
                        this.$api.User.Register(param).then(function (response) {
                            let data = response.data;
                            let state = data.state;
                            if (state == true) {
                                let token = data.token;
                                VueCookies.set('username' , username, "1d");
                                VueCookies.set("token", token, "1d");
                                VueCookies.set("email", email, "1d");
                                $this.isLogin = true;
                                $this.user_register_visible = false;
                                $this.user_login_visible = false;
                                router.push("/");
                            }
                            else{
                                alert(data.message);
                            }
                        });
                    }
                });
            },

            //暂时支持
            confirmModify(){
                this.form.validateFields((err, values) => {
                    if (this.captcha == '' || values.captcha != this.captcha) {
                        this.$error({
                            title: '错误',
                            content: '请输入正确的验证码！',
                        });
                        return;
                    }
                    if (values.email == '' || values.password == '' || values.password != values.confirm) {
                        this.$error({
                            title: '错误',
                            content: '请输入邮箱和密码！',
                        })
                    }
                    else {
                        let $this = this;
                        let param = new URLSearchParams();
                        param.append('email', values.email);
                        param.append('password', values.password);
                        this.$api.User.Modify(param).then(function (response) {
                            let data = response.data;
                            let state = data.state;
                            if (state == true) {
                                $this.user_modifyPwd_visible = false;
                                $this.isLogin = false;
                                VueCookies.remove('email', 'username', 'token');
                                $this.$success({
                                    title: '成功',
                                    content: '修改密码成功！',
                                });
                                $this.user_login_visible = true;
                                router.push("/");
                            }
                            else{
                                alert(data.message);
                            }
                        });
                    }
                });
            },
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('password')) {
                    callback('Two passwords that you enter is inconsistent!');
                } else {
                    callback();
                }
            },
            validateToNextPassword(rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            },
            getCaptcha(){
                let $this = this;
                this.form.validateFields((err, values) => {
                    let param = new URLSearchParams();
                    param.append('email', values.email);
                    this.$api.User.Captcha(param).then(function (response) {
                        let data = response.data;
                        let state = data.state;
                        if (state == true) {
                            $this.captcha = data.captcha;
                        }
                    });
                });
            },
            quitLogin(){
                let $this = this;
                this.$confirm({
                    content: '您确定要退出当前登录吗？',
                    onOk() {
                        VueCookies.remove('email', 'username', 'token');
                        $this.isLogin = false;
                        router.push("/");
                    },
                    onCancel() {},
                });
            },
            startSearch(value){
                let token = VueCookies.get('token');
                let param = new URLSearchParams();
                param.append('token', token);
                param.append('ts_code', value)
                this.$api.Detail.BasicData(param).then(function (response) {
                    let data = response.data;
                    if(data.state == true){
                        this.$router.push({
                            path: '/StockDetail/' + data.stocks.symbol,
                            name: 'StockDetail',
                            params:{
                                data: data,
                            }
                        });
                    }
                    else{
                        alert("未找到该股票！");
                    }
                })
            }
        }
    };
</script>
