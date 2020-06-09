<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="用户名">
            <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入用户名' }] }]"/>
        </a-form-item>
        <a-form-item label="邮箱">
            <a-input v-decorator="['email', { rules: [{ required: true, message: '请输入邮箱' }] }]"/>
        </a-form-item>
        <a-form-item label="密码">
            <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 5, offset: 2 }">
            <a-button type="primary" html-type="submit">
                注册
            </a-button>
        </a-form-item>
    </a-form>
</template>


<script>
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
                            let data = response.data;
                            if (data.name.length>=6&&data.password>=6) {
                                let name = data.name;
                                let password = data.password;
                                let email = data.email;

                            }
                        });
                    }
                });
            },
        },
    };
</script>
