<template>
    <a-form :form="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }" >
        <div>
            <a-statistic title="问卷标题" :value="112893" style="margin-right: 50px" />
            <a-statistic title="问卷开始时间" :value="11289" />
            <a-statistic title="问卷结束时间" :value="11289" />
            <a-statistic title="问卷发放总数" :value="112893"/>
            <a-statistic title="已填写用户数" :value="112893"/>
        </div>
        <a-row :gutter="16">
            <a-col :span="24" style="margin-top: 32px;">
                <a-statistic-countdown title="剩余填报时间" :value="deadline" format="D 天 H 时 m 分 s 秒" />
            </a-col>
        </a-row>
    </a-form>
</template>

<script>
    export default {
        data() {
            return {
                deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
            };
        },
        methods: {
            onFinish() {
                console.log('问卷截止!');
            },
        },
    };
</script>
