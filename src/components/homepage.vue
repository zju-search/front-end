<template>
    <a-layout id="components-layout-demo-top-side-2">
        <a-modal v-model="is_selection_visible" title="| 选择行业" @ok="confirmSelection" ok-text="确定" cancel-text="取消">
            <a-select :default-value="markets[0]" @change="handleSelectionChange" label-in-value style="width: 120px">
                <a-select-option v-for="(market, index) in markets" :key="index">
                    {{ market }}
                </a-select-option>
            </a-select>
        </a-modal>
        <a-layout-sider width="256px"  style="background: #fff">
            <a-menu
                    style="width: 256px"
                    :default-selected-keys="['1']"
                    mode="vertical"
            >
                <a-menu-item key="1">
                    <a-icon type="plus-square" />
                    沪深一览
                </a-menu-item>
                <a-menu-item key="2" @click="handleChoice">
                    <a-icon type="database" theme="filled" />
                    基础分类
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-content
                    :style="{ background: '#fff', padding: '24px', margin: '24px 16px 0', minHeight: '280px' }"
            >
                <div class="font"><b>市场一览</b></div>
                <div :style="{color: '#4682B4'}"><b>沪深300</b></div>
<!--                <div :style="{color: '#DC143C', float: 'left', marginRight: '10px'}"><b>{{indices.slice(-1)}}</b></div>-->
<!--&lt;!&ndash;                <div :style="{color: '#DC143C', float: 'left'}">324</div>&ndash;&gt;-->
<!--                <div id="container" :style="{border: '1px solid #D3D3D3', margin: '30px 0', minHeight: '200px'}"></div>-->
                <div class="font"><b>股票一览</b></div>
                <a-table
                        :columns="columns"
                        :data-source="stocks"
                        :pagination="pagination"
                        :loading="loading"
                        size="middle"
                >
                </a-table>
            </a-layout-content>
        </a-layout>
    </a-layout>

</template>

<script>
    import { Chart } from '@antv/g2';
    const columns = [
        {
            title: '股票名称',
            dataIndex: 'name',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: '股票代码',
            dataIndex: 'tsCode',
        },
        {
            title: '当前价',
            dataIndex: 'currentPrice',
        },
        {
            title: '昨日收盘价',
            dataIndex: 'close',
        },
        {
            title: '涨幅额',
            dataIndex: 'change',
        },
        {
            title: '涨幅百分比',
            dataIndex: 'pctChg',
        },
        {
            title: '成交额',
            dataIndex: 'amount',
        },
    ];
    export default {
        name: "homepage",
        data(){
            return {
                data: [],
                markets: [],
                indices: [],
                stocks: [],
                columns,
                pagination: {pageSize: 149,},
                loading: false,
                is_selection_visible: false,
                market_index: null,
            }
        },
        mounted() {
            this.getStocks();

            const data = this.indices;

            const chart = new Chart({
                container: 'container',
                autoFit: true,
                height: 200,
                padding: [40, 40, 40, 40],
            });

            chart.data(data);
            chart.scale({
                year: {
                    range: [0, 1],
                },
                value: {
                    min: 0,
                    nice: true,
                },
            });

            chart.tooltip({
                showCrosshairs: true, // 展示 Tooltip 辅助线
                shared: true,
            });

            chart.line().position('dtime*value').label('value');
            chart.point().position('dtime*value');

            chart.render();
        },
        methods:{
            getStocks(){
                let $this = this;
                let param = new URLSearchParams();
                this.$api.MarketCenter.getAllData(param).then(function (response) {
                    let data = response.data;
                    console.log(data);
                    if(data.state == true){
                        $this.indices = data.indices;
                        $this.stocks = data.stocks;
                        $this.markets = data.markets;
                    }
                    else{
                        alert("数据加载错误！");
                    }
                })
            },
            handleChoice(){
                this.is_selection_visible = true;
            },
            confirmSelection(){
                let $this = this;
                let param = new URLSearchParams();
                param.append('market_index', this.market_index);
                this.$api.Market.getMarketData(param).then(function (response) {
                    let data = response.data;
                    if(data.state == true){
                        $this.$router.push({
                            path: '/MarketStocks/' + $this.market_index,
                            query:{
                                stocks: data.stocks,
                                markets: $this.markets
                            }
                        });
                    }
                    else{
                        alert("数据加载错误！");
                    }
                })
            },
            handleSelectionChange(value){
                this.market_index = value.key;
            },
        }
    }
</script>

<style scoped>


</style>