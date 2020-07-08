<template>
    <a-layout id="components-layout-demo-top-side">
        <a-layout-header class="header">
            <div class="logo" />
            <a-menu theme="dark" mode="horizontal" :default-selected-keys="['2']" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">
                    nav 1
                </a-menu-item>
                <a-menu-item key="2">
                    nav 2
                </a-menu-item>
                <a-menu-item key="3">
                    nav 3
                </a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content style="padding: 0 50px">
            <a-breadcrumb style="margin: 16px 0">
            </a-breadcrumb>
            <a-layout style="padding: 24px 0; background: #fff">

                <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
                    Content
                </a-layout-content>
                <a-layout-sider width="350" style="background: #fff">
                    <div><b>股票排行榜</b></div>
                    <div class="rankSelect">
                        <a-select label-in-value show-search option-filter-prop="children" style="width: 220px"
                            :filter-option="filterOption" @change="optionChange"
                            :default-value="{ key: 'pe_ttm' }">
                            <a-select-option v-for="item in rankOption" :key="item.value" :value="item.value">
                                {{item.label}}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div class="table-operate">
                        <a-button-group>
                            <a-button v-if="reverse==false" disabled type="link">
                                正序
                            </a-button>
                            <a-button v-if="reverse==true" type="link" @click="orderHandle">
                                正序
                            </a-button>
                            <a-button v-if="reverse==false" type="link" @click="reverseHandle">
                                倒序
                            </a-button>
                            <a-button v-if="reverse==true" disabled type="link">
                                倒序
                            </a-button>
                        </a-button-group>
                    </div>
                    <div class="ranktables">

                    </div>
                </a-layout-sider>
            </a-layout>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Ant Design ©2018 Created by Ant UED
        </a-layout-footer>
    </a-layout>
</template>

<script>
    const rankOption = [{
            label: '市盈率',
            value: 'pe_ttm',
        },
        {
            label: '每股收益',
            value: 'eps',
        },
        {
            label: '每股净资产',
            value: 'bps',
        },
        {
            label: '净资产收益率',
            value: 'roe',
        },
        {
            label: '净利润同比增长',
            value: 'netprofit_yoy',
        },
        {
            label: '市盈率LYR',
            value: 'pe',
        },
        {
            label: '净利润',
            value: 'profit_to_gr',
        },
        {
            label: '股息收益率',
            value: 'dv_radio',
        },
        {
            label: '市销率',
            value: 'ps',
        },
        {
            label: '总市值',
            value: 'total_mv',
        },
        {
            label: '营业收入同比增长',
            value: 'or_yoy',
        },
        {
            label: '营业收入',
            value: 'profit_to_op',
        },
        {
            label: '市净率MRQ',
            value: 'pb',
        },
        {
            label: '总资产报酬率',
            value: 'roa',
        },
        {
            label: '流通市值',
            value: 'circ_mv',
        },
    ];

    export default {
        data() {
            return {
                reverse: false,
                rankValue: {dataIndex:'pe_ttm', title:'市盈率'},
                rankOption,
                columns: [{
                        title: '股票',
                        dataIndex: 'name',
                        width: '30%',
                        align: 'center'
                    },
                    {
                        title: '当前价',
                        dataIndex: 'close',
                        width: '35%',
                        align: 'center'
                    },
                    /*
                    {
                        title: this.rankValue.title,
                        dataIndex: this.rankValue.dataIndex,
                        width: '35%',
                        align: 'center'
                    },
                    */
                ],
                data: [],
            }
        },
        mounted(){
            console.log(this.rankValue)
        },
        methods: {
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
            optionChange(value) {
                console.log('selected ', value)
            },
            orderHandle() {
                this.reverse = false
            },
            reverseHandle() {
                this.reverse = true
                console.log(this.columns)
            }
        }
    }
</script>

<style>
    #components-layout-demo-top-side .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 28px 16px 0;
        float: left;
    }

    .rankSelect {
        padding-top: 5px;
        padding-left: 15px;
    }
</style>