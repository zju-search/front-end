<template>
    <div>
        <div v-for="(question,index) in questions" :key="index">
            <div class="ant-statistic-title">问题{{index+1}}:{{question}}</div>
        </div>
        <div id="chart"></div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2';


    export default {
        data() {
            return {
                createTime: 1000,
                deadTime: 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
                fillNumber: 1000,
                number: "1000",
                questionTypes: [],
                questions: [],
                answers: [],
                title: "123213",
                type: "1",
            };
        },
        methods: {
            dataChart: function () {
                const data = [
                    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
                    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
                    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
                    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
                    { name: 'London', 月份: 'May', 月均降雨量: 47 },
                    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
                    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
                    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
                    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
                    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
                    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
                    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
                    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
                    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
                    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
                    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
                ];

                const chart = new Chart({
                    container: "chart",
                    autoFit: true,
                    height: 500,
                });

                chart.data(data);
                chart.scale('月均降雨量', {
                    nice: true,
                });
                chart.tooltip({
                    showMarkers: false,
                    shared: true,
                });

                // chart.interval().position('月份*月均降雨量').color('name').adjust([{type: 'dodge', marginRatio: 0,},]);
                chart.interval().position('月份*月均降雨量').color('name').adjust([{type: 'dodge', marginRatio: 0,},]);
                chart.interaction('active-region');
                chart.render();
            }
        },
        mounted() {
            this.dataChart();
            let formData = new FormData();
            let id = this.$route.query.id;
            formData.append('id', id);
            var _this = this;
            this.$http.post('/api/statisticQuestionInfo', formData).then(function (response) {
                let data = response.data;
                _this.deadTime = data.deadTime;
                _this.createTime = data.createTime;
                _this.fillNumber = data.fillNumber;
                if (data.number > 0) {
                    _this.number = data.number;
                } else {
                    _this.number = "无限制"
                }
                _this.questionTypes = data.questionTypes;
                _this.questions = data.questions;
                _this.answers = data.answers;
                _this.title = data.title;
                if (data.type === 0) {
                    _this.type = "只限注册用户";
                } else if (data.type === 1) {
                    _this.type = "累积达到一定数量截止";
                } else if (data.type == 2) {
                    _this.type = "每日只允许填写一定数量"
                } else {
                    _this.type = "无限制问卷类型";
                }
                // for(var index in _this.answers){
                //     this.dataChart(index);
                // }
            });
        },
    };
</script>
