<template>
    <div>
        <div>
            <a-button type="primary" icon="search" style="float:right">
                新建任务
            </a-button>
        </div>
        <div class="main">
            <a-descriptions title="系统基本信息" class="left" bordered layout="vertical">
                <a-descriptions-item label="UserName">
                    Zhou Maomao
                </a-descriptions-item>
                <a-descriptions-item label="Telephone">
                    1810000000
                </a-descriptions-item>
                <a-descriptions-item label="Live">
                    Hangzhou, Zhejiang
                </a-descriptions-item>
                <a-descriptions-item label="Remark">
                    empty
                </a-descriptions-item>
                <a-descriptions-item label="Address">
                    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </a-descriptions-item>
            </a-descriptions>
            <div class="right">
                <h3>当前实例运行的所有任务</h3>
                <a-list size="small" bordered :data-source="questions" v-if="!state">
                    <a-list-item slot="renderItem" slot-scope="question">
                        <router-link :to="`/vision-outline/`+question.id">
                            {{ question.title }}
                        </router-link>
                    </a-list-item>
                </a-list>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                state: null,
                questions: null,
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }
            };
        },
        mounted() {
            let formData = new FormData();
            let id = this.$route.query.id;
            formData.append('id', id);
            var _this = this;
            this.$http.post('/api/taskList', formData).then(function (response) {
                let data = response.data;
                _this.questions = data.questions;
                _this.state = data.questions.length == 0;
            });
        },
    };
</script>

<style type="text/css">
    .main {
        width: 100%
    }

    .left {
        width: 45%;
        float: left;
        margin-right: 5%
    }

    .right {
        width: 50%;
        float: right;
    }
</style>
