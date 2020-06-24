<template>
    <a-card>
        <a-button type="primary" :style="{marginBottom:'16px'}">发起任务</a-button>
        <a-card>
            <a-descriptions title="| 任务编号 00001">
                <a-descriptions-item label="场景描述"><p :style="{marginLeft:'15px'}">个人社区信用贷款</p></a-descriptions-item>
                <a-descriptions-item label="模型类别"><p :style="{marginLeft:'15px'}">机器学习</p></a-descriptions-item>
                <br>
                <a-descriptions-item label="数据准备">
                    <a-button type="primary" :style="{marginLeft:'15px'}">字段筛选</a-button>
                    <a-button type="primary" :style="{marginLeft:'15px'}">新增数据集</a-button>
                </a-descriptions-item>
            </a-descriptions>
            <a-card size="small" title="字段">
                <td style="word-spacing: 15px">存款余额 偿还记录 常住人口 日均存款金额 是否购买基金</td>
            </a-card>
            <a-card size="small" title="数据集" style="margin-top: 15px">
                <a-table :data-source="dataset_data" :columns="dataset_columns">
                    <div slot="action" href="javascript:">
                        <a-button type="primary">样本时间</a-button>
                        <a-button type="primary" style="margin-left: 15px">筛选规则</a-button>
                    </div>
                </a-table>
            </a-card>
            <a-descriptions style="margin-top: 15px">
                <a-descriptions-item label="模型训练">
                    <a-button type="primary" :style="{marginLeft:'15px'}">新增训练</a-button>
                </a-descriptions-item>
            </a-descriptions>
            <a-table :data-source="model_data" :columns="model_columns">
                <div slot="action" href="javascript:">
                    <a-button type="primary">重新训练</a-button>
                    <a-button type="primary" style="margin-left: 15px">模型验证</a-button>
                    <a-button type="primary" style="margin-left: 15px">删除</a-button>
                </div>
            </a-table>
        </a-card>
    </a-card>
</template>

<script>
    const dataset_columns = [
        {
            title: '数据集编号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '筛选规则',
            dataIndex: 'rule',
            key: 'rule',
        },
        {
            title: 'X样本时间',
            dataIndex: 'x-sample',
            key: 'x-sample',
        },
        {
            title: 'y样本时间',
            dataIndex: 'y-sample',
            key: 'y-sample',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
        },
    ];
    const dataset_data = [
        {
            key: '1',
            index: '000001-1',
            rule: '年龄>20 and 年龄 < 20 and 用户等级=2',
            'x-sample': '2018 / 8',
            'y-sample': '2018 / 9',
        },
        {
            key: '2',
            index: '000001-2',
            rule: '年龄>20 and 年龄 < 20 and 用户等级=2',
            'x-sample': '2018 / 8',
            'y-sample': '2018 / 10',
        },
    ];
    const model_columns = [
        {
            title: '任务编号',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: '模型名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '参数',
            dataIndex: 'param',
            key: 'param',
        },
        {
            title: '数据集',
            dataIndex: 'dataset',
            key: 'dataset',
        },
        {
            title: '有效样本量',
            dataIndex: 'valid_sample',
            key: 'valid_sample',
        },
        {
            title: '模型效果',
            dataIndex: 'performance',
            key: 'performance',
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            scopedSlots: {customRender: 'action'},
        },
    ];
    const model_data = [
        {
            'key': '1',
            'index': '000001-1',
            'name': 'DNN',
            'param': 'N1:4N2:6',
            'dataset': '000001-1',
            'valid_sample': '200000',
            'performance': 'AUC：0.75    KS：0.45'
        },
    ];
    export default {
        name: "trainTask",
        data() {
            return {
                dataset_columns,
                dataset_data,
                model_columns,
                model_data
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                let index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1);
                }
            },
            addDomain(index) {
                this.dynamicValidateForm.domains.push({
                    value: '',
                    index: index,
                    text: '',
                    key: Date.now(),
                });
            },
            onChangeNumber(value) {
                console.log('changed', value);
            },
            changeActivekey(key) {
                console.log(key);
            },
        },
    };
</script>
<style>
    .dynamic-delete-button {
        cursor: pointer;
        position: relative;
        top: 4px;
        font-size: 24px;
        color: #999;
        transition: all 0.3s;
    }

    .dynamic-delete-button:hover {
        color: #777;
    }

    .dynamic-delete-button[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }
</style>
