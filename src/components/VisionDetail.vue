<template>
    <div>
        <div class="ant-statistic-title">选项统计情况</div>
        <div id="radio"></div>
        <div class="ant-statistic-title">文本字数统计情况</div>
        <div id="text"></div>
        <div class="ant-statistic-title">数字类型统计情况</div>
        <div id="number"></div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2';
    import { DataView } from '@antv/data-set';

    export default {
        name:"VisionDetail",
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
            radioChart: function (d) {
                console.log(d);
                const data = d;
                const chart = new Chart({
                    container: "radio",
                    autoFit: true,
                    height: 500,
                });
                chart.data(data);
                chart.scale('value', {
                    nice: true,
                });
                chart.tooltip({
                    showMarkers: false,
                    shared: true,
                });

                chart.interval().position('index*value').color('name').adjust([{type: 'dodge', marginRatio: 0,},]);
                chart.interaction('active-region');
                chart.render();
            },
            textChart: function (d) {
                const data = d
                const chart = new Chart({
                    container: 'text',
                    autoFit: true,
                    height: 500,
                    padding: 50,
                });

                chart.data(data);
                chart.scale('value', {
                    nice: true,
                });
                chart.coordinate('polar', {
                    innerRadius: 0.4,
                });
                chart.axis(false);
                chart.legend(false);
                chart.tooltip({
                    showContent: false, showCrosshairs: true, crosshairs: {
                        line: {
                            style: {lineDash: [2],}
                        },
                        text: {
                            position: 'end', offset: 5, autoRotate: true,
                            style: {fontSize: 14,}
                        },
                        textBackground: null
                    },
                });
                chart.interval().position('name*value').color('name').size(100);
                chart.render();
            },
            statisticChart: function (d) {
                console.log(d);
                const data = d;
                const dv = new DataView().source(data);
                dv.transform({
                    type: 'map',
                    callback: obj => {
                        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
                        return obj;
                    }
                });
                const chart = new Chart({
                    container: 'number',
                    autoFit: true,
                    height: 500
                });
                chart.data(dv.rows);
                chart.scale('range', {
                    nice: true,
                });
                chart.tooltip({
                    showTitle: false,
                    showMarkers: false,
                    itemTpl: '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">'
                        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
                        + '{name}<br/>'
                        + '<span style="padding-left: 16px">最大值：{high}</span><br/>'
                        + '<span style="padding-left: 16px">上四分位数：{q3}</span><br/>'
                        + '<span style="padding-left: 16px">中位数：{median}</span><br/>'
                        + '<span style="padding-left: 16px">下四分位数：{q1}</span><br/>'
                        + '<span style="padding-left: 16px">最小值：{low}</span><br/>'
                        + '</li>'
                });
                chart
                    .schema()
                    .position('x*range')
                    .shape('box')
                    .tooltip('x*low*q1*median*q3*high', (x, low, q1, median, q3, high) => {
                        return {
                            name: x,
                            low,
                            q1,
                            median,
                            q3,
                            high
                        };
                    })
                    .style({
                        stroke: '#545454',
                        fill: '#1890FF',
                        fillOpacity: 0.3
                    });

                chart.interaction('active-region');
                chart.render();
            }
        },
        mounted() {
            let formData = new FormData();
            let id = this.$route.query.id;
            formData.append('id', id);
            var _this = this;
            this.$http.post('/api/statisticQuestion', formData).then(function (response) {
                let data = response.data;
                _this.radioChart(data.radios);
                _this.textChart(data.text);
                _this.statisticChart(data.statistic);
            });
        },
    };
</script>
