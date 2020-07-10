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
    export default {
        name: "StockDetail",
        data(){
            return{
                stock_details: null,
                introduction: "",
                main_business: "",
                ts_code: "",
                flag: true
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

            // this.stock_details = {'name': '热推的', 'symbol': 'SZ300001', 'current_price': 24.12,
            //     'close': 22.82, 'open': 23.29, 'high': 24.53, 'low': 23.20, 'change': 1.29, 'pct_chg': 0.052,
            //     'vol': 23.88, 'amount': 5.72, 'pe_ttm': 148.9, 'pe': 88.83, 'circ_mv': 226.15, 'total_mv': 240.51,
            //     'turnover_rate': 0.026, 'dv_ratio': 0.00008, 'dv_ttm': 0.02, 'total_share': 9.98, 'float_share': 9.4};
            // this.introduction = "青岛特锐德电气股份有限公司主营以" +
            //     "户外箱式电力设备为主、户内开关柜为辅的" +
            //     "成套变配电产品,致力于研发设计制造220kV及以下的变配" +
            //     "电一二次产品并提供相关技术服务。公司在电气设备智能制造业务" +
            //     "板块的主要产品有:220kV及以下模块化智能预制舱式变电站、移动式智能变电站、3" +
            //     "5kV智能箱式变电站、10kV智能欧式箱变、铁路(客专)电力远动箱变、智能环网柜、智能开闭站、智能充电箱变、" +
            //     "智能微网箱变、智能一体化光伏箱变、智能一体化风电箱变、GIS、H-GIS、变压器、开关柜、交直流电源屏、计量屏、一体化母线桥等。";
            // this.main_business = "研发、生产和销售以户外箱式电力设备为主、户内开关柜为辅的成套变配电产品";
            this.ts_code = this.stock_details.symbol;
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