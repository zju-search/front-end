<template>
    <div class="content">
        <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }"  class="loginContent" @submit="handleSubmit">
            <a-form-item label="邮箱" :style="{marginLeft: '20%'}">
                <a-input v-decorator="['email', { rules: [{ required: true, message: '请输入用户邮箱' }] }]"/>
            </a-form-item>
            <a-form-item label="密码" :style="{marginLeft: '20%'}">
                <a-input type="password" v-decorator="['password', { rules: [{ required: true, message: '请输入用户密码' }] }]"/>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 5, offset: 2 }" :style="{marginLeft: '20%'}">
                <a-button type="primary" html-type="submit">
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    // import VueCookies from 'vue-cookies';
    import router from "../router";

    export default {
        name: "Login",
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                email: 'pat@163.com',
                password: '123456'
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if(values.email == this.email && values.password == this.password){
                            router.push("/trainTask");
                        }
                        // let formData = new FormData();
                        // formData.append('email', values.email);
                        // formData.append('password', values.password);
                        // this.$http.post('/api/login', formData).then(function (response) {
                        //     let data = response.data;
                        //     let state = data.state;
                        //     if (state == true) {
                        //         let name = data.name;
                        //         let token = data.token;
                        //         let email = data.email;
                        //         VueCookies.set('name' , name, "1d");
                        //         VueCookies.set("token", token, "1d");
                        //         VueCookies.set("email", email, "1d");
                        //         router.push("/");
                        //     }
                        // });
                    }
                });
            },
        },
    };
</script>
<style scoped>

.content {
    max-width: 40%;
    margin-left: 30%;
    text-align: center;
    vertical-align: middle;
}

.loginContent{
    background-color: #ffffff;
    margin: auto;
    padding: 10px 0;
}

</style>