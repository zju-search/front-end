<template>
    <a-layout>
        <a-modal v-model="user_login_visible" title="| 用户登录" @ok="confirmLogin" ok-text="登录" cancel-text="取消">
            <label>邮箱：</label>
            <a-input
                v-model="input_email"
                v-decorator="[
                   'email',
                    {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    },
                ]"
            />
            <label>密码：</label>
            <a-input type="password" v-model="input_password" v-decorator="['password', { rules: [{ required: true, message: '请输入用户密码' }] }]"/>
            <a @click="modifyPassword" :style="{float: 'right'}">忘记密码</a>
            <br /><br />
            <a @click="userRegister"><u>点击注册</u></a>
        </a-modal>
        <a-modal v-model="user_register_visible" title="| 用户注册" @ok="confirmRegister" ok-text="注册" cancel-text="取消" width="600px">
            <div>
                <a-form :form="form" :style="{paddingRight: '100px'}">
                    <a-form-item v-bind="formItemLayout" label="单位名称">
                        <a-input
                            v-decorator="[
                            'company',
                            {
                                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            },
                            ]"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="登录密码" has-feedback>
                        <a-input
                            type="password"
                            v-decorator="[
                                'password',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            validator: validateToNextPassword,
                                        },
                                    ],
                                },
                            ]"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="重复密码" has-feedback>
                        <a-input
                            type="password"
                            v-decorator="[
                                'confirm',
                                {
                                    rules: [
                                        {
                                          required: true,
                                          message: 'Please confirm your password!',
                                        },
                                        {
                                          validator: compareToFirstPassword,
                                        },
                                    ],
                                },
                            ]"
                            @blur="handleConfirmBlur"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="单位邮箱">
                        <a-input
                            v-decorator="[
                               'email',
                                {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                },
                            ]"
                        />
                    </a-form-item>
                    <a-form-item
                        v-bind="formItemLayout"
                        label="邮箱验证码"
                    >
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-input
                                    v-decorator="[
                                        'captcha',
                                        { rules: [{ required: true, message: '输入验证码有误！' }] },
                                    ]"
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
                                v-decorator="[
                                'password',
                                {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            validator: validateToNextPassword,
                                        },
                                    ],
                                },
                            ]"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="重复密码" has-feedback>
                        <a-input
                                type="password"
                                v-decorator="[
                                'confirm',
                                {
                                    rules: [
                                        {
                                          required: true,
                                          message: 'Please confirm your password!',
                                        },
                                        {
                                          validator: compareToFirstPassword,
                                        },
                                    ],
                                },
                            ]"
                                @blur="handleConfirmBlur"
                        />
                    </a-form-item>
                    <a-form-item v-bind="formItemLayout" label="单位邮箱">
                        <a-input
                                v-decorator="[
                               'email',
                                {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                },
                            ]"
                        />
                    </a-form-item>
                    <a-form-item
                            v-bind="formItemLayout"
                            label="邮箱验证码"
                    >
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-input
                                        v-decorator="[
                                        'captcha',
                                        { rules: [{ required: true, message: '输入验证码有误！' }] },
                                    ]"
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

        <a-menu mode="horizontal">
            <a-menu-item>
                <a-icon type="mail"/>
                首页
            </a-menu-item>
            <a-menu-item>
                <a-icon type="appstore"/>
                训练任务
            </a-menu-item>
            <a-menu-item>
                <a-icon type="setting"/>
                模型应用
            </a-menu-item>
            <a-menu-item>
                <a-icon type="project"/>
                数据字典
            </a-menu-item>
            <a-sub-menu v-if="isLogin" :style="{float:'right'}">
                <span slot="title" class="submenu-title-wrapper">
                    <a-icon type="team" />{{name}}</span>
                <a-menu-item key="info: modifyPwd" @click="modifyPassword">
                    修改密码
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item :style="{float:'right'}" v-if="isLogin">
                <a-icon type="logout"/>
                退出
            </a-menu-item>
            <a-menu-item v-else :style="{float:'right'}" @click="userLogin">
                <a-icon type="team"/>
                登录
            </a-menu-item>
        </a-menu>
        <a-layout-content :style="{ margin: '20px 20px'}">
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
            this.name = VueCookies.get('name');
            this.token = VueCookies.get("token");
            this.email = VueCookies.get("email");
        },
        data(){
            return {
                form: this.$form.createForm(this, { name: 'register' }),
                isLogin: false,
                name: VueCookies.get('name'),
                user_login_visible: false,
                user_register_visible: false,
                user_modifyPwd_visible: false,
                input_email: '',
                input_password: '',
                email: 'pat@163.com',
                password: '123456',
                company: '西部投资',
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
                if(this.input_email == this.email && this.input_password == this.password){
                    console.log(this.company);
                    VueCookies.set('name' , this.company, "1d");
                    this.user_login_visible = false;
                    this.isLogin = true;
                    router.push("/trainTask");
                }
            },
            confirmRegister(){
                this.form.validateFields((err, values) => {
                    if (this.captcha == '' || values.captcha !== this.captcha) {
                        this.$error({
                            title: '错误',
                            content: '请输入正确的验证码！',
                        });
                        return;
                    }
                    if (values.email !== '' || values.password == '' || values.password !== values.confirm) {
                        this.$error({
                            title: '错误',
                            content: '请输入邮箱和密码！',
                        })
                    }
                    else {
                        this.user_register_visible = false;
                        this.user_login_visible = false;
                        this.isLogin = true;
                        VueCookies.set('name', values.company, "1d");
                        router.push("/trainTask");
                    }
                });
            },

            //暂时支持
            confirmModify(){
                this.form.validateFields((err, values) => {
                    if (this.captcha == '' || values.captcha !== this.captcha) {
                        this.$error({
                            title: '错误',
                            content: '请输入正确的验证码！',
                        });
                        return;
                    }
                    if (values.email == '' || values.password == '' || values.password !== values.confirm) {
                        this.$error({
                            title: '错误',
                            content: '请输入邮箱和密码！',
                        })
                    }
                    else {
                        this.user_modifyPwd_visible = false;
                        this.password = values.password;
                        this.$success({
                            title: '成功',
                            content: '修改密码成功！',
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
                this.captcha = 'abcd';
                // 没有后端的情况下以下代码用来测试
                const h = this.$createElement;
                this.$info({
                    title: '验证码',
                    content: h('div', {}, [
                        h('p', '验证码为: abcd'),
                    ]),
                    onOk() {},
                });
            }
        }
    };
</script>
