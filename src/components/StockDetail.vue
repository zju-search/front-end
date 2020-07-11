<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-layout-sider width="256" style="background: #fff">
            <a-menu
                    style="width: 256px"
                    mode="inline"
            >
                <a-menu-item key="1" @click="toIntroduction">
                    <a-icon type="plus-square" />
                    公司简介
                </a-menu-item>
                <a-menu-item key="2" @click="toFinancialData">
                    <a-icon type="database" theme="filled" />
                    财务主要指标
                </a-menu-item>
                <a-menu-item key="3" @click="toShareHolder">
                    <a-icon type="usergroup-add" />
                    十大股东
                </a-menu-item>
                <a-menu-item key="4" @click="toShareHolderNum()">
                    <a-icon type="user" />
                    股东人数
                </a-menu-item>
                <a-menu-item key="5" @click="toPledges()">
                    <a-icon type="money-collect" />
                    股权质押统计
                </a-menu-item>
                <a-menu-item key="6" @click="toPerformance()">
                    <a-icon type="build" />
                    业绩预告
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="highlight" /><span>龙虎榜</span></span>
                    <a-sub-menu key="sub1-1" title=" 日涨幅偏离值达到7%的前五只证券">
                        <menu-item v-for="item in chg_list" :key="item.ts_code">
                            {{item.ts_code}} —— {{item.name}}
                        </menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub1-2" title="日换手率达到20%的前五只证券">
                        <menu-item v-for="item in turnover_list" :key="item.ts_code">
                            {{item.ts_code}} —— {{item.name}}
                        </menu-item>
                    </a-sub-menu>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout-content
                :style="{ background: '#fff', padding: '24px', minHeight: '280px' }"
        >
            <div class="font">{{stock_details.name}} ({{stock_details.symbol}})</div>
            <div class="font" v-if="flag" :style="{float: 'left', marginRight: '10px', color: 'red'}">￥{{stock_details.current_price}}</div>
            <div class="font" v-else :style="{float: 'left', marginRight: '10px', color: 'green'}">￥{{stock_details.current_price}}</div>
            <div v-if=flag :style="{verticalAlign: 'bottom', marginTop: '20px', color:'red'}">+{{parseFloat(stock_details.change).toFixed(2)}} {{parseFloat(stock_details.pct_chg).toFixed(3)}}%</div>
            <div v-else :style="{verticalAlign: 'bottom', marginTop: '20px', color:'green'}">+{{parseFloat(stock_details.change).toFixed(2)}} {{parseFloat(stock_details.pct_chg).toFixed(3)}}%</div>
            <a-descriptions :column=4>
                <a-descriptions-item label="最高">
                    {{stock_details.high}}
                </a-descriptions-item>
                <a-descriptions-item label="今开">
                    {{stock_details.open}}
                </a-descriptions-item>
                <a-descriptions-item label="市盈率(静)">
                    {{parseFloat(stock_details.pe).toFixed(2)}}
                </a-descriptions-item>
                <a-descriptions-item label="成交量">
                    {{parseFloat(stock_details.vol / 10000).toFixed(2)}} 万手
                </a-descriptions-item>
                <a-descriptions-item label="最低">
                    {{stock_details.low}}
                </a-descriptions-item>
                <a-descriptions-item label="昨收">
                    {{stock_details.close}}
                </a-descriptions-item>
                <a-descriptions-item label="市盈率(TTM)">
                    {{parseFloat(stock_details.pe_ttm).toFixed(2)}}
                </a-descriptions-item>
                <a-descriptions-item label="成交额">
                    {{parseFloat(stock_details.amount / 100000).toFixed(2)}} 亿
                </a-descriptions-item>
                <a-descriptions-item label="总市值">
                    {{parseFloat(stock_details.total_mv / 100000).toFixed(2)}} 亿
                </a-descriptions-item>
                <a-descriptions-item label="股息(TTM)">
                    {{parseFloat(stock_details.dv_ttm).toFixed(2)}}
                </a-descriptions-item>
                <a-descriptions-item label="总股本">
                    {{parseFloat(stock_details.total_share).toFixed(2)}} 万股
                </a-descriptions-item>
                <a-descriptions-item label="换手率">
                    {{stock_details.turnover_rate}}
                </a-descriptions-item>
                <a-descriptions-item label="流通市值">
                    {{parseFloat(stock_details.circ_mv / 100000).toFixed(2)}} 亿
                </a-descriptions-item>
                <a-descriptions-item label="股息率(TTM)">
                    {{parseFloat(stock_details.dv_ratio).toFixed(2)}} %
                </a-descriptions-item>
                <a-descriptions-item label="流通股本">
                    {{parseFloat(stock_details.float_share).toFixed(2)}} 万股
                </a-descriptions-item>
            </a-descriptions>
            <br>
            <a-radio-group :value="picture" @change="handleChangePicture" default-value="realtime">
                <a-radio-button value="realtime">
                    实时行情
                </a-radio-button>
                <a-radio-button value="daily">
                    日k图
                </a-radio-button>
            </a-radio-group>
            <br>
            <div v-if="picture == 'realtime'" id="realtime"></div>
            <div v-else id="daily"></div>
        </a-layout-content>
        <a-layout-sider width="350" style="background: #fff">
            <a-card size="small" title="简介" :style="{margin: '10px'}">
                <p>{{this.introduction}}</p>
            </a-card>
            <a-card size="small" title="业务" :style="{margin: '10px'}">
                <p>{{this.main_business}}</p>
            </a-card>
        </a-layout-sider>
    </a-layout>
</template>

<script>
    import {Chart} from "@antv/g2";
    import DataSet from '@antv/data-set';

    export default {
        name: "StockDetail",
        data(){
            return{
                stock_details: null,
                introduction: "",
                main_business: "",
                ts_code: "",
                flag: true,
                data_today: null,
                data_history: null,
                picture: "realtime",
                chg_list: [
                    {name: '特锐德', ts_code: '300001.SZ'},
                    {name: '中国平安', ts_code: '600001.SH'}
                    ],
                turnover_list: [],
            }
        },
        mounted() {
            let data = null;
            if (typeof this.$route.query.data == "string") {
                data = JSON.parse(localStorage.getItem('data'));
            }
            else {
                data = this.$route.query.data;
                localStorage.setItem('data', JSON.stringify(data));
            }

            this.stock_details =data.stocks;
            this.introduction = data.introduction;
            this.main_business = data.main_business;

            if(this.stock_details.change >= 0){
                this.flag = true;
            }
            else{
                this.flag = false;
            }
            this.ts_code = this.stock_details.symbol;

            this.getDataToday();
            this.getHistoryData();
            this.getTigerDragon();
        },
        updated() {
            const data1 = this.data_today;
            const max = this.calculateMax();
            const min = this.calculateMin();
            const realtime_chart = new Chart({
                container: 'realtime',
                // autoFit: true,
                width: 700,
                height: 500,
            });
            realtime_chart.data(data1);
            realtime_chart.scale({
                time: {
                    range: [0, 1],
                },
                price: {
                    min: min-1,
                    max: max+1,
                    nice: true,
                },
            });
            realtime_chart.tooltip({
                showCrosshairs: true, // 展示 Tooltip 辅助线
                shared: true,
            });
            realtime_chart.line().position('time*price');
            realtime_chart.point().position('time*price');
            realtime_chart.render();

            const ds = new DataSet();
            const dv = ds.createView();
            dv.source(this.data_history)
                .transform({
                    type: 'map',
                    callback: obj => {
                        obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
                        obj.range = [obj.start, obj.end, obj.max, obj.min];
                        return obj;
                    }
                });
            const chart = new Chart({
                container: 'daily',
                width: 700,
                height: 500,
                padding: [10, 40, 40, 40]
            });

            chart.data(dv.rows);

            chart.scale({
                time: {
                    type: 'timeCat',
                    range: [0, 1],
                    tickCount: 4,
                },
                trend: {
                    values: ['上涨', '下跌']
                },
                volumn: { alias: '成交量' },
                start: { alias: '开盘价' },
                end: { alias: '收盘价' },
                max: { alias: '最高价' },
                min: { alias: '最低价' },
                range: {
                    alias: '股票价格',
                    nice: true,
                }
            });
            chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl: '<li class="g2-tooltip-list-item" data-index={index}>'
                    + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
                    + '{name}{value}</li>'
            });

            const kView = chart.createView({
                region: {
                    start: { x: 0, y: 0 },
                    end: { x: 1, y: 0.7 },
                }
            });
            kView.data(dv.rows);
            kView.schema()
                .position('time*range')
                .color('trend', val => {
                    if (val === '上涨') {
                        return '#f04864';
                    }

                    if (val === '下跌') {
                        return '#2fc25b';
                    }
                })
                .shape('candle')
                .tooltip('time*start*end*max*min', (time, start, end, max, min) => {
                    return {
                        name: time,
                        value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
                            + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
                            + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
                            + '<span style="padding-left: 16px">最低价：' + min + '</span>'
                    };
                });

            const barView = chart.createView({
                region: {
                    start: { x: 0, y: 0.7 },
                    end: { x: 1, y: 1 },
                }
            });
            barView.data(dv.rows);
            barView.scale('vol', {
                tickCount: 2,
            })
            barView.axis('time', {
                tickLine: null,
                label: null
            });
            barView.axis('vol', {
                label: {
                    formatter: val => {
                        return +val / 1000 + 'k';
                    }
                }
            });
            barView.interval()
                .position('time*vol')
                .color('trend', val => {
                    if (val === '上涨') {
                        return '#f04864';
                    }

                    if (val === '下跌') {
                        return '#2fc25b';
                    }
                })
                .tooltip('time*vol', (time, volumn) => {
                    return {
                        name: time,
                        value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
                    };
                });
            chart.render();
        },
        methods:{
            toIntroduction(){
                this.$router.push({
                    path: `/StockDetail/${this.ts_code}/GSJJ`,
                    query:{
                        name: this.stock_details.name,
                        symbol: this.ts_code,
                        companyLink: window.location.href
                    }
                });
            },
            toFinancialData(){
                this.$router.push({
                    path: `/StockDetail/${this.ts_code}/CWZB`,
                    query:{
                        name: this.stock_details.name,
                        symbol: this.ts_code,
                        companyLink: window.location.href
                    }
                });
            },
            toShareHolder(){
                this.$router.push({
                    path: `/StockDetail/${this.ts_code}/CWZB`,
                    query:{
                        name: this.stock_details.name,
                        symbol: this.ts_code,
                        companyLink: window.location.href
                    }
                });
            },
            toShareHolderNum(){
                this.$router.push({
                    path: `/StockDetail/${this.ts_code}/CWZB`,
                    query:{
                        name: this.stock_details.name,
                        symbol: this.ts_code,
                        companyLink: window.location.href
                    }
                });
            },
            toPledges(){
                this.$router.push({
                    path: `/StockDetail/${this.ts_code}/GQZY`,
                    query:{
                        name: this.stock_details.name,
                        symbol: this.ts_code,
                        companyLink: window.location.href
                    }
                });
            },
            toPerformance(){
                this.$router.push({
                    path: `/StockDetail/${this.ts_code}/YJYG`,
                    query:{
                        name: this.stock_details.name,
                        symbol: this.ts_code,
                        companyLink: window.location.href
                    }
                });
            },
            getDataToday(){
                let $this = this;
                let param = new URLSearchParams();
                param.append('symbol', this.ts_code);
                this.$api.OtherDetail.CurrentData(param).then(function (response) {
                    let data = response.data;
                    $this.data_today = data.data;
                });
            },
            getHistoryData(){
                let $this = this;
                let param = new URLSearchParams();
                param.append('symbol', this.ts_code);
                this.$api.OtherDetail.HistoryData(param).then(function (response) {
                    let data = response.data;
                    $this.data_history = data.data;
                });
            },
            handleChangePicture(e){
                this.picture = e.target.value;
            },
            calculateMax(){
                let max = this.data_today[0].price;
                for( let element = 1; element < this.data_today.length; element ++){
                    if(max < this.data_today[element].price){
                        max = this.data_today[element].price;
                    }
                }
                return max;
            },
            calculateMin(){
                let min = this.data_today[0].price;
                for( let element = 1; element < this.data_today.length; element ++){
                    if(min > this.data_today[element].price){
                        min = this.data_today[element].price;
                    }
                }
                return min;
            },
            getTigerDragon(){
                // let $this = this;
                // let param = new URLSearchParams();
                // this.$api.OtherDetail.List(param).then(function (response) {
                //     let data = response.data;
                //     $this.chg_list = data.chg_list;
                //     $this.turnover_list = data.turnover_list;
                // });
            }
        }
    }
</script>

<style scoped>
#components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
}

    .font{
        font-size: xx-large;
        vertical-align: bottom;
    }

</style>