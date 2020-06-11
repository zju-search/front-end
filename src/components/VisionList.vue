<template>
    <div>
        <a-empty v-if="state"/>
        <h3>当前用户发布的所有问卷</h3>
        <a-list size="small" bordered :data-source="questions" v-if="!state" :pagination="pagination">
            <a-list-item slot="renderItem" slot-scope="question">
                <router-link :to="`/vision-outline/`+question.id">
                    {{ question.title }}
                </router-link>
            </a-list-item>
        </a-list>
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
                    pageSize: 10,
                }
            };
        },
        mounted() {
            let formData = new FormData();
            let id = this.$route.query.id;
            formData.append('id', id);
            var _this = this;
            this.$http.post('/api/visionList', formData).then(function (response) {
                let data = response.data;
                _this.questions = data.questions;
                _this.state = data.questions.length == 0;
            });
        },
    };
</script>
