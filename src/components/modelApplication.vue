<template>
    <a-card :title='`| 任务编号 ` + task_index'>
        <a-modal v-model="show_screen_application" title="| 界面应用" @ok="finishScreenApplication">
            <template slot="footer">
                <a-button type="primary" @click="modelApplication" v-if="model_outcome == ''">应用</a-button>
                <a-button type="primary" @click="IDReset" v-if="model_outcome != ''">ID重置</a-button>
                <a-button type="primary" @click="finishScreenApplication">取消</a-button>
            </template>
            <label>请输入样本ID</label>
            <a-input v-model="model_ID"/>
            <label>模型结果:</label>
            <a-spin v-if="model_outcome == ''"></a-spin>
            <label v-if="model_outcome != ''">{{model_outcome}}</label>
        </a-modal>
        <a-card>
            <h3>模型应用</h3>
            <a-table :data-source="model_dataset" :columns="model_columns">
                <div slot="performance">
                    AUC：0.75 KS：0.45
                </div>
                <div slot="action" href="javascript:" slot-scope="record">
                    <a-button type="primary" @click="showAPIDoc(record)">接口文档</a-button>
                    <a-button type="primary" @click="showScreenApplication(record)" style="margin-left: 3%">应用文档
                    </a-button>
                </div>
            </a-table>
        </a-card>
        <a-card>
            <h3>应用记录</h3>
            <div id="record"></div>
            <a-table :data-source="model_apply_dataset" :columns="model_apply_columns">
                <div slot="performance">
                    AUC：0.75 KS：0.45
                </div>
                <div slot="action" href="javascript:" slot-scope="record">
                    <a-button type="primary" @click="seenAPIDoc(record)">接口文档</a-button>
                </div>
            </a-table>
        </a-card>
    </a-card>
</template>
<script>
    import DataSet from '@antv/data-set';
    import {Chart} from '@antv/g2';

    export default {
        name: "modelApplication",
        data() {
            return {
                'model_columns': [
                    {
                        title: '任务编号',
                        dataIndex: 'index',
                        key: 'index',
                    },
                    {
                        title: '模型名称',
                        dataIndex: 'model',
                        key: 'model',
                    },
                    {
                        title: '参数',
                        dataIndex: 'param',
                        key: 'param',
                    },
                    {
                        title: '训练数据集',
                        dataIndex: 'train_dataset',
                        key: 'dataset',
                    },
                    {
                        title: '模型效果',
                        dataIndex: 'performance',
                        key: 'performance',
                        scopedSlots: {customRender: 'performance'},
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: {customRender: 'action'},
                    },
                ],
                'model_apply_columns': [
                    {
                        title: '记录ID',
                        dataIndex: 'index',
                        key: 'index',
                    },
                    {
                        title: '时间',
                        dataIndex: 'model',
                        key: 'model',
                    },
                    {
                        title: '请求因子量',
                        dataIndex: 'param',
                        key: 'param',
                    },
                    {
                        title: '获取因子量',
                        dataIndex: 'train_dataset',
                        key: 'dataset',
                    },
                    {
                        title: '输出结果',
                        dataIndex: 'performance',
                        key: 'performance',
                        scopedSlots: {customRender: 'performance'},
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: {customRender: 'action'},
                    },
                ],
                'model_dataset': [
                    {'index': '00001-1', 'model': 'DNN', 'param': 'N1:4', 'dataset': '00001-1'}
                ],
                'model_apply_dataset': [],
                'task_index': '',
                'screen_application': '',
                'model_outcome': '',
                'model_ID': '',
                'show_screen_application': false,
            };
        },
        mounted() {
            let id = this.$route.params.id;
            this.task_index = id;
            const data = [
                {year: '6.13', value: 10},
                {year: '6.14', value: 20},
                {year: '6.15', value: 50},
                {year: '6.16', value: 40},
                {year: '6.17', value: 50},
                {year: '6.18', value: 20},
                {year: '6.19', value: 25},
            ];
            const ds = new DataSet();
            const dv = ds.createView().source(data);
            dv.transform({
                type: 'map',
                callback: row => {
                    row.year = parseInt(row.year, 10);
                    return row;
                }
            }).transform({
                type: 'regression',
                method: 'polynomial',
                fields: ['year', 'value'],
                bandwidth: 0.1,
                as: ['Year', 'Value']
            });

            const chart = new Chart({
                container: 'record',
                autoFit: true,
                height: 300,
                padding: [20, 40],
            });

            chart.scale({
                Year: {
                    range: [0, 1],
                },
                value: {
                    alias: '调用次数',
                    sync: true,
                    nice: true
                },
                Value: {
                    sync: true,
                    nice: true
                },
            });
            chart.axis('year', {
                tickLine: null
            });
            const view1 = chart.createView();
            view1.data(data);
            view1
                .interval()
                .position('year*value')
                .style({
                    fillOpacity: 1,
                });
            const view2 = chart.createView();
            view2.axis(false);
            view2.data(dv.rows);
            view2.line().position('Year*Value').style({
                stroke: '#969696',
                lineDash: [3, 3]
            }).tooltip(false);
            chart.render();
        },
        methods: {
            showAPIDoc(item) {
                console.log(item);
            },
            showScreenApplication(item) {
                console.log(item);
                this.show_screen_application = true;
            },
            IDReset() {
                this.model_ID = "";
                this.model_outcome = "";
            },
            modelApplication() {
                this.model_outcome = 5;
            },
            finishScreenApplication() {
                this.show_screen_application = false;
            },

        },
    };
</script>
