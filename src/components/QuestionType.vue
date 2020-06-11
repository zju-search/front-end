<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <h4>设置问卷类型</h4>
        <a-select label-in-value style="width: 50%" @change="handleChange" id="type">
            <a-select-option value=0>只限注册用户</a-select-option>
            <a-select-option value=1>累积达到一定数量截止</a-select-option>
            <a-select-option value=2>每日只允许填写一定数量</a-select-option>
            <a-select-option value=3>无限制问卷类型</a-select-option>
        </a-select>
        <h4 style="margin-top: 15px">设置问卷数量</h4>
        <a-input-number :min="1" :max="10000" :default-value="10" @change="onChange" style="width: 50%" id="number"/>
        <br>
        <a-button type="primary" html-type="submit" style="margin-top: 15px">
            提交表单
        </a-button>
    </a-form>
</template>
<script>
    export default {
        name: "QuestionType",
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
                        formData.append('type', values.email);
                        formData.append('id', values.password);
                        this.$http.post('/api/saveQuestionType', formData).then(function (response) {
                            let data = response.data;
                            console.log(data);
                        });
                    }
                });
            },
            handleChange(value) {
                console.log(value);
            },
            onChange(value) {
                console.log('changed', value);
            },
        },
    };
</script>
