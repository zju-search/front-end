<template>
    <div style="background-color: #F5F5F5; padding: 24px;">
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            :ghost="false"
            title = "数据字典"
            @back="() => $router.push('/trainTask')"
        >
            <template slot="footer">
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="企业"/>
                    <a-tab-pane key="2" tab="个人"/>
                </a-tabs>
            </template>
            <div class="content">
                <div :style="{display: 'flex'}" >
                    <a-button type="primary" @click="showAll" :size="size">
                        显示当前分支全部信息
                    </a-button>
                    <a-input-search
                            placeholder="搜索数据中文名"
                            enter-button="搜索"
                            size="large"
                            @search="onSearch"
                            :style="{marginLeft: '10px'}"
                            v-model="itemName"
                    />
                </div>
            </div>
        </a-page-header>
        <a-table :columns="columns" :data-source="presentData" :style="{padding: '15px', backgroundColor: '#ffffff'}">
            <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
    </div>
</template>

<script>
    export default {
        name: "dataDictionary",
        data() {
            return{
                itemName: '',
                size: 'large',
                columns: [
                    {
                        title: '数据项名',
                        dataIndex: 'itemName',
                        key: 'itemName',
                        scopedSlots: { customRender: 'itemName' },
                    },
                    {
                        title: '含义说明',
                        dataIndex: 'description',
                        key: 'description',
                    },
                    {
                        title: '中文名',
                        dataIndex: 'cnName',
                        key: 'cnName',
                        ellipsis: true,
                    },
                    {
                        title: '数据类型',
                        dataIndex: 'dataType',
                        key: 'dataType',
                        ellipsis: true,
                    },
                    {
                        title: '类别',
                        dataIndex: 'type',
                        key: 'type',
                        ellipsis: true,
                    },
                    {
                        title: '取值范围',
                        dataIndex: 'range',
                        key: 'range',
                        ellipsis: true,
                    },
                    {
                        title: '提供方',
                        dataIndex: 'source',
                        key: 'source',
                        ellipsis: true,
                    },
                ],
                enterpriseData: [
                    {
                        key: '1',
                        itemName: 'Age',
                        description: '企业雇主年龄',
                        cnName: '企业雇主年龄',
                        dataType: 'number',
                        type: '数值/类型',
                        range: '0-150',
                        source: '浙江省农信',
                    },
                    {
                        key: '2',
                        itemName: 'Name',
                        description: '企业名称',
                        cnName: '企业名称',
                        dataType: 'string',
                        type: '字符/类型',
                        range: '-',
                        source: '浙江省农信',
                    }
                ],
                individualData: [
                    {
                        key: '1',
                        itemName: 'Age',
                        description: '借贷人年龄',
                        cnName: '借贷人年龄',
                        dataType: 'number',
                        type: '数值/类型',
                        range: '0-150',
                        source: '浙江省政府',
                    },
                    {
                        key: '2',
                        itemName: 'Name',
                        description: '借贷人姓名',
                        cnName: '借贷人姓名',
                        dataType: 'string',
                        type: '字符/类型',
                        range: '-',
                        source: '浙江省政府',
                    }
                ],
                presentData: this.enterpriseData,
                currentTab: '1',
            }
        },
        methods:{
            callback(key){
                this.currentTab = key;
                if(key == '1'){
                    this.presentData = this.enterpriseData;
                }
                else{
                    this.presentData = this.individualData;
                }
            },
            showAll(){
                if(this.currentTab == '1'){
                    this.presentData = this.enterpriseData;
                }
                else{
                    this.presentData = this.individualData;
                }
            },
            onSearch(){
                let data = null;
                let newData = [];

                if(this.currentTab == '1'){
                    data = this.enterpriseData;
                }
                else{
                    data = this.individualData;
                }

                for (let i = 0; i < data.length; i++){
                    if(data[i].cnName.search(this.itemName) != -1){
                        newData.push(data[i]);
                    }
                }

                this.presentData = newData;
            }
        }
    }
</script>

<style scoped>
    #components-page-header-demo-responsive .content {
        display: flex;
    }
    #components-page-header-demo-responsive .ant-statistic-content {
        font-size: 20px;
        line-height: 28px;
    }
    @media (max-width: 576px) {
        #components-page-header-demo-responsive .content {
            display: block;
        }

        #components-page-header-demo-responsive .main {
            width: 50%;
            margin-bottom: 12px;
        }

        #components-page-header-demo-responsive .extra {
            width: 100%;
            margin-left: 0;
            text-align: left;
        }
    }
</style>