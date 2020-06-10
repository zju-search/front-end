<template>
    <div>
        <div style="width: 100%; column-count: 2;column-gap: 3px;">
            <a-statistic title="问卷标题" :value="title"/>
            <a-statistic title="已填写用户数" :value="fillNumber"/>
        </div>
        <div style="width: 100%; column-count: 2;column-gap: 3px;">
            <a-statistic title="问卷开始时间" :value="createTime"/>
            <a-statistic title="问卷结束时间" :value="deadTime"/>
        </div>
        <div style="width: 100%; column-count: 2;column-gap: 3px;">
            <a-statistic title="问卷发放总数" :value="number"/>
            <a-statistic title="问卷类型" :value="type"/>
        </div>
        <div>
            <div class="ant-statistic-title">填写地域分布</div>
            <div style="min-height: 500px; justify-content: center;position: relative" id="map"/>
        </div>
        <router-link :to="`vision-detail`">
            <a-button type="primary" style="margin-top: 15px">
                查看问题统计
                <a-icon type="right"/>
            </a-button>
        </router-link>
    </div>
</template>

<script>
    import {Scene, HeatmapLayer} from '@antv/l7';
    import {Mapbox} from '@antv/l7-maps';

    window.onLoad = function () {
        const scene = new Scene({
            id: 'map',
            map: new Mapbox({
                style: 'dark',
                pitch: 0,
                center: [127.5671666579043, 7.445038892195569],
                zoom: 2.632456779444394
            })
        });

        scene.on('loaded', () => {
            fetch(
                'https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json'
            )
                .then(res => res.json())
                .then(data => {
                    const layer = new HeatmapLayer({})
                        .source(data)
                        .shape('heatmap')
                        .size('mag', [0, 1.0]) // weight映射通道
                        .style({
                            intensity: 2,
                            radius: 20,
                            opacity: 1.0,
                            rampColors: {
                                colors: [
                                    '#FF4818',
                                    '#F7B74A',
                                    '#FFF598',
                                    '#91EABC',
                                    '#2EA9A1',
                                    '#206C7C'
                                ].reverse(),
                                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
                            }
                        });
                    scene.addLayer(layer);
                });
        });
    };

    const url = 'https://webapi.amap.com/maps?v=1.4.15&key=15cd8a57710d40c9b7c0e3cc120f1200&callback=onLoad';
    const jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);

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
        mounted() {
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
                _this.n = _this.questions.length;
            });
        },
    };
</script>
