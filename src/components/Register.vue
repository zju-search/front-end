<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="用户名" has-feedback="">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入用户名' },{type:'string',min:6,message: '用户名至少为6位'}] }]"/>
        </a-form-item>
        <a-form-item label="邮箱" has-feedback="">
            <a-input v-decorator="['email', { rules: [{ required: true, message: '请输入用户邮箱'},{validator: this.checkEmail}] }]"/>
        </a-form-item>
        <a-form-item label="密码" has-feedback="">
            <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: '请输入用户密码' },{validator: handlePass},
            {type:'string',min:6,message:'密码至少为6位'}]}]" name="password"/>
        </a-form-item>
        <a-form-item label="验证密码" has-feedback>
            <a-input type="password" v-decorator="['confirm_password',{rules: [{validator: handleConfirmPass}]}]" name="confirm_password"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 5, offset: 2 }">
            <a-button type="primary" html-type="submit" @click="handleSubmit">注册</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    import {message} from 'ant-design-vue';

    export default {
        name: "Register",
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let formData = new FormData();
                        formData.append('name', values.name);
                        formData.append('email', values.email);
                        formData.append('password', values.password);
                        this.$http.post('/api/register', formData).then(function (response) {
                            let state = response.data;
                            if (state === true) {
                                message.success('注册成功');
                            } else {
                                message.error("注册失败");
                            }
                        });
                    }
                });
            },
            checkEmail(rule, value, callback) {
                const pwdRegex = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$')
                if (!pwdRegex.test(value)) {
                    callback(new Error('Email输入格式有误'))
                }
                callback()
            },
            handlePass(rule, value, callback) {
                this.password = value;
                callback();
            },
            handleConfirmPass(rule, value, callback) {
                if (this.password && this.password !== value) {
                    callback('两次密码输入不一致！');
                }
                callback();
            },
        },
    }
</script>

