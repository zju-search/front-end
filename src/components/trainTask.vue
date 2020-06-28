<template>
    <a-card>
        <!--1-2 发起任务的弹窗-->
        <a-modal v-model="launch_task_visible" title="| 发起任务" @ok="finishLaunchTask">
            <label>任务编号</label>
            <a-input v-model="launch_task.index"/>
            <label>场景描述</label>
            <a-textarea v-model="launch_task.description" :rows="4" placeholder="例如：样本的贷后表现"/>
            <label>模型类别</label>
            <a-select default-value="lucy" style="width: 100%" v-model="launch_task.category">
                <a-select-option value="机器学习-二分类">机器学习-二分类</a-select-option>
                <a-select-option value="机器学习-回归">机器学习-回归</a-select-option>
                <a-select-option value="规则-分类">规则-分类</a-select-option>
                <a-select-option value="规则-回归">规则-回归</a-select-option>
            </a-select>
        </a-modal>
        <!--2-2字段筛选的弹窗-->
        <a-modal v-model="key_select_visible" title="| 字段筛选" @ok="finishKeySelect">
            <a-select mode="tags" style="width: 100%" placeholder="字段筛选" v-model="key_select">
                <a-select-option value="存款余额">存款余额</a-select-option>
                <a-select-option value="偿还记录">偿还记录</a-select-option>
                <a-select-option value="常住人口">常住人口</a-select-option>
                <a-select-option value="日均存款余额">日均存款余额</a-select-option>
                <a-select-option value="是否购买基金">是否购买基金</a-select-option>
            </a-select>
        </a-modal>
        <!--3-2新增数据集的弹窗-->
        <a-modal v-model="add_dataset_visible" title="| 新增数据集" @ok="finishAddDataset">
            <a-form-model ref="dynamicValidateForm" :model="dataset_attribute">
                <a-form-model-item>
                    <label>数据集编号</label>
                    <a-input v-model="dataset_attribute.index"/>
                </a-form-model-item>
                <a-form-model-item>
                    <label style="margin-right: 15px">筛选规则</label>
                    <a-button type="dashed" @click="addDatasetAttribute">
                        <a-icon type="plus"/>
                    </a-button>
                </a-form-model-item>
                <a-form-model-item v-for="rule in dataset_attribute.rules"
                                   :key="rule.key">
                    <a-select v-model="rule.name" placeholder="名称" style="width: 25%; margin-right: 3%">
                        <a-select-option v-for="option in task.key_select" :key="option">
                            {{ option }}
                        </a-select-option>
                    </a-select>
                    <a-select style="width: 25%;margin-right: 3%" v-model="rule.symbol">
                        <a-select-option value="＞">＞</a-select-option>
                        <a-select-option value="＜">＜</a-select-option>
                        <a-select-option value="＝">＝</a-select-option>
                        <a-select-option value="≥">≥</a-select-option>
                        <a-select-option value="≤">≤</a-select-option>
                        <a-select-option value="≠">≠</a-select-option>
                    </a-select>
                    <a-input v-model="rule.value" placeholder="值" style="width: 30%;margin-right: 3%"/>
                    <a-icon v-if="dataset_attribute.rules.length >= 1"
                            class="dynamic-delete-button" type="minus-circle-o" @click="removeDatasetAttribute(rule)"
                    />
                </a-form-model-item>
                <a-form-model-item>
                    <label style="margin-right: 15px">X样本时间</label>
                    <a-range-picker v-model="dataset_attribute.x_sample_date"/>
                </a-form-model-item>
                <a-form-model-item>
                    <label style="margin-right: 15px">Y样本时间</label>
                    <a-range-picker v-model="dataset_attribute.y_sample_date"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!--3-2-1修改样本时间的弹窗-->
        <a-modal v-model="change_sample_time_visible" title="| 修改时间" @ok="finishChangeSampleTime">
            <a-form-model ref="dynamicValidateForm" :model="dataset_attribute">
                <a-form-model-item>
                    <label style="margin-right: 15px">X样本时间</label>
                    <a-range-picker v-model="dataset_attribute.x_sample_date"/>
                </a-form-model-item>
                <a-form-model-item>
                    <label style="margin-right: 15px">Y样本时间</label>
                    <a-range-picker v-model="dataset_attribute.y_sample_date"/>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!--3-2-2修改样本筛选条件的弹窗-->
        <a-modal v-model="change_sample_rule_visible" title="| 修改筛选条件" @ok="finishChangeSampleRule">
            <a-form-model ref="dynamicValidateForm" :model="dataset_attribute">
                <a-form-model-item>
                    <label style="margin-right: 15px">筛选规则</label>
                    <a-button type="dashed" @click="addDatasetAttribute">
                        <a-icon type="plus"/>
                    </a-button>
                </a-form-model-item>
                <a-form-model-item v-for="rule in dataset_attribute.rules"
                                   :key="rule.key">
                    <a-select v-model="rule.name" placeholder="名称" style="width: 25%; margin-right: 3%">
                        <a-select-option v-for="option in task.key_select" :key="option">
                            {{ option }}
                        </a-select-option>
                    </a-select>
                    <a-select style="width: 25%;margin-right: 3%" v-model="rule.symbol">
                        <a-select-option value="＞">＞</a-select-option>
                        <a-select-option value="＜">＜</a-select-option>
                        <a-select-option value="＝">＝</a-select-option>
                        <a-select-option value="≥">≥</a-select-option>
                        <a-select-option value="≤">≤</a-select-option>
                        <a-select-option value="≠">≠</a-select-option>
                    </a-select>
                    <a-input v-model="rule.value" placeholder="值" style="width: 30%;margin-right: 3%"/>
                    <a-icon v-if="dataset_attribute.rules.length >= 1"
                            class="dynamic-delete-button" type="minus-circle-o" @click="removeDatasetAttribute(rule)"
                    />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!--5-2新增训练的弹窗-->
        <a-modal v-model="add_train_visible" title="| 新增训练" @ok="finishAddTrain">
            <a-form-model ref="dynamicValidateForm" :model="add_train">
                <a-form-model-item>
                    <label>任务编号 {{task.launch_task.index}}-{{task.add_train.length+1}}</label>
                </a-form-model-item>
                <a-form-model-item>
                    <label>模型名称</label>
                    <a-select default-value="DNN" style="margin-left: 10px;width: 50%" v-model="add_train.model">
                        <a-select-option value="DNN">
                            DNN
                        </a-select-option>
                        <a-select-option value="score">
                            打分卡
                        </a-select-option>
                        <a-select-option value="RNN">
                            时序神经网络
                        </a-select-option>
                        <a-select-option value="XGBoost">
                            XGBoost
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item v-if="add_train.model == 'DNN'">
                    <label>中间隐层的维度</label>
                    <a-input v-model="add_train.param1" style="margin-left: 10px;width: 50%"/>
                </a-form-model-item>
                <a-form-model-item v-if="add_train.model == 'RNN'">
                    <label>中间层的数量</label>
                    <a-input v-model="add_train.param1" style="margin-left: 10px;width: 50%"/>
                </a-form-model-item>
                <a-form-model-item>
                    <label>训练数据集</label>
                    <a-radio-group v-model="add_train.train_dataset" style="margin-left: 20px;width: 50%">
                        <a-radio :value="dataset.index" v-for="dataset in task.dataset_attribute" :key="dataset.index">
                            {{dataset.index}}
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <!--7-2模型验证的弹窗-->
        <a-modal v-model="show_model_verify" title="| 模型验证" @ok="finishVerifyTrain">
            <template slot="footer">
                <a-button type="primary" @click="showAddModelVerify">新增验证</a-button>
                <a-button type="primary" @click="finishVerifyTrain">取消</a-button>
            </template>
            <a-table :data-source="task.train_verify[current_dataset]" :columns="model_verify_columns"
                     :rowKey='record=>record.dataset'>
                <div slot="performance">
                    <label>AUC：0.75 KS：0.45</label>
                </div>
            </a-table>
        </a-modal>
        <!--7-3 新增模型验证的弹窗-->
        <a-modal v-model="show_add_model_verify" :title='`| 新增验证-` + task.add_train[current_train].index'
                 @ok="finishAddVerifyTrain" v-if="task.add_train.length > 0">
            <a-form-model-item>
                <label>验证集:</label>
                <a-radio-group v-model="add_model_verify_validate_dataset" style="margin-left: 20px;width: 50%">
                    <a-radio :value="dataset.index" v-for="dataset in task.dataset_attribute" :key="dataset.index">
                        {{dataset.index}}
                    </a-radio>
                </a-radio-group>
            </a-form-model-item>
        </a-modal>
        <a-button type="primary" :style="{marginBottom:'16px'}" @click="showLaunchTask">发起任务</a-button>
        <a-card>
            <a-descriptions :title="`| 任务描述  ${task.launch_task.index}`">
                <a-descriptions-item label="场景描述"><p :style="{marginLeft:'15px'}">{{task.launch_task.description}}</p>
                </a-descriptions-item>
                <a-descriptions-item label="模型类别"><p :style="{marginLeft:'15px'}">{{task.launch_task.category}}</p>
                </a-descriptions-item>
                <br>
                <a-descriptions-item label="数据准备">
                    <a-button type="primary" :style="{marginLeft:'15px'}" @click="showKeySelectTask">字段筛选</a-button>
                    <a-button type="primary" :style="{marginLeft:'15px'}" @click="showAddDataset">新增数据集</a-button>
                </a-descriptions-item>
            </a-descriptions>
            <a-card size="small" title="字段">
                <a-empty v-if="task.key_select.length == 0"/>
                <a v-for="key in task.key_select" v-bind:key="key"> {{key}} </a>
            </a-card>
            <a-card size="small" title="数据集" style="margin-top: 15px">
                <a-table :data-source="task.dataset_attribute" :columns="dataset_columns"
                         :rowKey='record=>record.index'>
                    <div slot="action" slot-scope="record">
                        <a-button type="primary" @click="showChangeSampleTime(record)">样本时间</a-button>
                        <a-button type="primary" style="margin-left: 15px" @click="showChangeSampleRule(record)">筛选规则
                        </a-button>
                        <a-button type="primary" style="margin-left: 15px" @click="removeDataset(record)">删除
                        </a-button>
                    </div>
                </a-table>
            </a-card>
            <a-descriptions style="margin-top: 15px">
                <a-descriptions-item label="模型训练">
                    <a-button type="primary" :style="{marginLeft:'15px'}" @click="showAddTrain">新增训练</a-button>
                </a-descriptions-item>
            </a-descriptions>
            <a-table :data-source="task.add_train" :columns="model_columns">
                <div slot="performance" v-if="task.add_train.performance == null">
                    训练中
                    <a-spin/>
                </div>
                <div slot="action" href="javascript:" slot-scope="record">
                    <a-button type="primary" @click="restartTrainModel(record)">重新训练</a-button>
                    <a-button type="primary" style="margin-left: 15px" @click="showModelVerify(record)">模型验证</a-button>
                    <a-button type="primary" style="margin-left: 15px" @click="DeleteTrainModel(record)">删除</a-button>
                </div>
            </a-table>
        </a-card>
    </a-card>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "trainTask",
        data() {
            return {
                'dataset_columns': [
                    {
                        title: '数据集编号',
                        dataIndex: 'index',
                        key: 'index',
                    },
                    {
                        title: '筛选规则',
                        dataIndex: 'rules',
                        key: 'rules',
                    },
                    {
                        title: 'X样本时间',
                        dataIndex: 'x_sample_date',
                        key: 'x_sample_date',
                    },
                    {
                        title: 'y样本时间',
                        dataIndex: 'y_sample_date',
                        key: 'y_sample_date',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        scopedSlots: {customRender: 'action'},
                    },
                ],
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
                'model_verify_columns': [
                    {
                        title: '验证集',
                        dataIndex: 'dataset',
                        key: 'dataset',
                    },
                    {
                        title: '模型效果',
                        dataIndex: 'performance',
                        key: 'performance',
                        scopedSlots: {customRender: 'performance'},
                    },],
                'launch_task': {'index': '', 'description': '', 'category': ''},
                'key_select': [],
                'add_dataset': [],
                'dataset_attribute': {index: '', rules: [], x_sample_date: [], y_sample_date: []},
                'add_train': {
                    'index': '',
                    'model': '',
                    'dataset': '',
                    'param1': '',
                    'param2': '',
                    'param3': '',
                    train_dataset: ''
                },
                'task': {
                    'launch_task': {'index': '', 'description': '', 'category': ''},
                    'key_select': [],
                    'dataset_attribute': [],
                    'add_train': [],
                    'train_verify': []
                },
                'dataset_data': [],
                'model_data': [],
                'launch_task_visible': false,
                'key_select_visible': false,
                'add_dataset_visible': false,
                'show_model_verify': false,
                'show_add_model_verify': false,
                'change_sample_time_visible': false,
                'change_sample_rule_visible': false,
                'add_train_visible': false,
                'current_dataset': 0,
                'current_train': 0,
                'save_dataset_attribute': [],
                'add_model_verify_validate_dataset': '',
            };
        },
        methods: {
            showLaunchTask() {
                this.launch_task_visible = true;
            },
            showKeySelectTask() {
                this.key_select_visible = true;
            },
            showAddDataset() {
                this.add_dataset_visible = true;
            },
            showChangeSampleTime(item) {
                let index = this.task.dataset_attribute.indexOf(item);
                this.current_dataset = index;
                this.change_sample_time_visible = true;
                this.dataset_attribute = this.save_dataset_attribute[index];
            },
            showChangeSampleRule(item) {
                let index = this.task.dataset_attribute.indexOf(item);
                this.current_dataset = index;
                this.change_sample_rule_visible = true;
                this.dataset_attribute = this.save_dataset_attribute[index];
            },
            showAddTrain() {
                this.add_train_visible = true;
            },
            showModelVerify(item) {
                let index = this.task.add_train.indexOf(item);
                this.show_model_verify = true;
                this.current_train = index;
            },
            showAddModelVerify() {
                this.show_add_model_verify = true;
            },
            finishLaunchTask() {
                this.launch_task_visible = false;
                this.task.launch_task = this.launch_task;
                this.launch_task = {'index': '', 'description': '', 'category': ''};
            },
            finishKeySelect() {
                this.key_select_visible = false;
                this.task.key_select = this.key_select;
                this.key_select = [];
            },
            finishAddDataset() {
                this.add_dataset_visible = false;
                this.save_dataset_attribute.push(Object.assign({}, this.dataset_attribute));
                let rules = this.dataset_attribute.rules;
                let new_rules = [];
                for (let i = 0; i < rules.length; i++) {
                    new_rules.push(rules[i].name + rules[i].symbol + rules[i].value);
                }
                this.dataset_attribute.x_sample_date = moment(this.dataset_attribute.x_sample_date[0]).format("YYYY-DD-MM") + ' to '
                    + moment(this.dataset_attribute.x_sample_date[1]).format("YYYY-DD-MM");
                this.dataset_attribute.y_sample_date = moment(this.dataset_attribute.y_sample_date[0]).format("YYYY-DD-MM") + ' to '
                    + moment(this.dataset_attribute.y_sample_date[1]).format("YYYY-DD-MM");
                this.dataset_attribute.rules = new_rules.join(' and ');
                this.task.dataset_attribute.push(Object.assign({}, this.dataset_attribute));
                this.dataset_attribute = {rules: [], x_sample_date: [], y_sample_date: []};
            },
            finishChangeSampleTime() {
                this.change_sample_time_visible = false;
                this.task.dataset_attribute[this.current_dataset].x_sample_date = moment(this.dataset_attribute.x_sample_date[0]).format("YYYY-DD-MM") + ' to '
                    + moment(this.dataset_attribute.x_sample_date[1]).format("YYYY-DD-MM");
                this.task.dataset_attribute[this.current_dataset].y_sample_date = moment(this.dataset_attribute.y_sample_date[0]).format("YYYY-DD-MM") + ' to '
                    + moment(this.dataset_attribute.y_sample_date[1]).format("YYYY-DD-MM");
                this.dataset_attribute = {rules: [], x_sample_date: [], y_sample_date: []};
            },
            finishChangeSampleRule() {
                this.change_sample_rule_visible = false;
                let rules = this.dataset_attribute.rules;
                let new_rules = [];
                for (let i = 0; i < rules.length; i++) {
                    new_rules.push(rules[i].name + rules[i].symbol + rules[i].value);
                }
                this.task.dataset_attribute[this.current_dataset].rules = new_rules.join(' and ');
                this.dataset_attribute = {rules: [], x_sample_date: [], y_sample_date: []};
            },
            finishAddTrain() {
                this.add_train_visible = false;
                this.task.add_train.push(Object.assign({}, this.add_train));
                this.task.train_verify.push([]);
                this.add_train = {'index': '', 'description': '', 'category': ''};
            },
            finishVerifyTrain() {
                this.show_model_verify = false;
            },
            finishAddVerifyTrain() {
                this.show_add_model_verify = false;
                this.task.train_verify[this.current_dataset].push({'dataset': this.add_model_verify_validate_dataset});
            },
            addDatasetAttribute() {
                this.dataset_attribute.rules.push({
                    name: '', symbol: '', value: '', key: Date.now(),
                });
            },
            removeDatasetAttribute(item) {
                let index = this.dataset_attribute.rules.indexOf(item);
                this.dataset_attribute.rules.splice(index, 1);
            },
            removeDataset(item) {
                let index = this.task.dataset_attribute.indexOf(item);
                this.task.dataset_attribute.splice(index, 1);
                this.save_dataset_attribute.splice(index, 1);
            },
            restartTrainModel(item) {
                this.$message.info('重新开始训练模型:' + item.index.toString());
            },
            DeleteTrainModel(record) {
                let index = this.task.dataset_attribute.indexOf(record);
                this.task.add_train.splice(index, 1);
            },
        }
    };
</script>
<style>

</style>
