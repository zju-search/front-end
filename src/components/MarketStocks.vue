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
                <div class="font"><b>股票一览</b></div>
                <a-table
                        :columns="columns"
                        :data-source="stocks"
                        :loading="loading"
                        size="middle"
                >
                </a-table>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    export default {
        name: "homepage",
        data(){
            return {
                data: [],
                markets: [],
                indices: [],
                stocks: [],
                loading: false,
                is_selection_visible: false,
                chosen_market: null,
            }
        },
        mounted() {
            this.stocks = this.$route.params.stocks;
            this.markets = this.$route.params.markets;
            console.log('1111');
        },
        computed:{
            columns() {
                const columns = [
                    {
                        title: '股票名称',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: '股票代码',
                        dataIndex: 'ts_code',
                        key: 'ts_code',
                        sorter: (a, b) => a.ts_code - b.ts_code,
                        sortDirections: ['ascend'],
                    },
                    {
                        title: '当前价',
                        dataIndex: 'current_price',
                        key: 'current_price',
                        defaultSortOrder: 'descend',
                        sorter: (a, b) => a.current_price - b.current_price,
                        sortDirections: ['descend', 'ascend'],
                    },
                    {
                        title: '昨日收盘价',
                        dataIndex: 'close',
                        key: 'close',
                        defaultSortOrder: 'descend',
                        sorter: (a, b) => a.close - b.close,
                        sortDirections: ['descend', 'ascend'],
                    },
                    {
                        title: '涨幅额',
                        dataIndex: 'change',
                        key: 'change',
                        sorter: (a, b) => a.change - b.change,
                        sortDirections: ['descend', 'ascend'],
                    },
                    {
                        title: '涨幅百分比',
                        dataIndex: 'pct_chg',
                        key: 'pct_chg',
                        sorter: (a, b) => a.pct_chg - b.pct_chg,
                        sortDirections: ['descend', 'ascend'],
                    },
                    {
                        title: '成交额',
                        dataIndex: 'amount',
                        key: 'amount',
                        sorter: (a, b) => a.amount - b.amount,
                        sortDirections: ['descend', 'ascend'],
                    },
                ];
                return columns;
            }
        },
        methods:{
            handleChoice(){
                this.is_selection_visible = true;
            },
            confirmSelection(){
                this.$http.get('/getStocksbyMarket', {params: this.market_index}).then(function (response) {
                    let data = response.data;
                    if(data.state == true){
                        this.$router.push({
                            path: 'MarketStocks' + this.market_index,
                            name: 'MarketStocks',
                            params:{
                                stocks: data.stocks,
                                markets: this.markets
                            }
                        });
                    }
                    else{
                        alert("数据加载错误！");
                    }
                })
            },
            handleSelectionChange(value){
                this.chosen_market = value.key;
            },
        }
    }
</script>

<style scoped>


</style>