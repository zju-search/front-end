<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="邮箱">
            <a-input v-decorator="['email', { rules: [{ required: true, message: '请输入用户邮箱' }] }]"/>
        </a-form-item>
        <a-form-item label="密码">
            <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: '请输入用户密码' }] }]"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 5, offset: 2 }">
            <a-button type="primary" html-type="submit">
                登录
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    export default {
        name: "Login",
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
                        formData.append('email', values.email);
                        formData.append('password', values.password);
                        this.$http.post('/api/login', formData).then(function (response) {
                            let data = response.data;
                            let state = data.state;
                            if (state == true) {
                                let name = data.name;
                                let token = data.token;
                                document.cookie
                                this.$cookies.set("email", "123213", 1);
                                this.$cookies.set("name", name, 1);
                                this.$cookies.set("token", token, 1);
                                this.$router.push({name: '/'});
                            }
                        });
                    }
                });
            },
        },
    };
</script>
