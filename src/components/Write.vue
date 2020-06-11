<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <div v-for="(question) in questions" :key="question.title">
            <div>{{questions.indexOf(question) + 1}}:{{question.title}}</div>
            <div>
                <!--                TYPE=0 代表单选题-->
                <a-radio-group v-if="question.type == 0">
                    <p v-for="(choice) in question.choices" :key="question.choices.indexOf(choice)">
                        <a-radio :style="radioStyle" :value="choice">
                            {{choice}}
                        </a-radio>
                    </p>
                </a-radio-group>
                <!--                TYPE = 1代表多选题-->
                <a-checkbox-group v-if="question.type == 1" :options="question.choices" style="width: 100%"/>
                <!--                TYPE = 2代表文本-->
                <a-textarea placeholder="请输入您的回答" allow-clear v-if="question.type == 2" style="width: 100%"/>
                <!--                TYPE = 3代表数字-->
                <a-input-number v-if="question.type == 3" style="width: 50%"/>
                <!--                TYPE = 4代表评价-->
                <a-rate :default-value="2.5" allow-half v-if="question.type == 4" style="width: 100%"/>
            </div>
            <br>
        </div>
        <a-form-item :wrapper-col="{ span: 5, offset: 2 }">
            <a-button type="primary" html-type="submit">
                登录
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script>

    export default {
        name: "Write",
        data() {
            return {
                formLayout: 'vertical',
                form: this.$form.createForm(this, {name: 'coordinated'}),
                id: "template",
                title: "template",
                email: "template",
                createTime: "template",
                deadTime: "template",
                questions: [],
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
            };
        },
        mounted: function () {
            let formData = new FormData();
            let id = this.$route.query.id;
            formData.append('id', id);
            var _this = this;
            this.$http.post('/api/getQuestion', formData).then(function (response) {
                let data = response.data;
                _this.id = data.id;
                _this.email = data.email;
                _this.createTime = data.createTime;
                _this.deadTime = data.deadTime;
                _this.questions = data.questions;
            });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
            },
            onChange(e) {
                console.log(`checked = ${e.target.value}`);
            },
            loadData(selectedOptions) {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.loading = true;
                setTimeout(() => {
                    targetOption.loading = false;
                    targetOption.children = [
                        {
                            label: `${targetOption.label} Dynamic 1`,
                            value: 'dynamic1',
                        },
                        {
                            label: `${targetOption.label} Dynamic 2`,
                            value: 'dynamic2',
                        },
                    ];
                    this.options = [...this.options];
                }, 1000);
            },
        },
    };
</script>
