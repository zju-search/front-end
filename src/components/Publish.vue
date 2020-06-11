<template>
    <a-form-model
            ref="dynamicValidateForm"
            :model="dynamicValidateForm"
            v-bind="formItemLayoutWithOutLabel"
    >
        <a-form-model-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                v-bind="formItemLayout"
                :label="domain.index === 1 ? '单选' : (domain.index === 2 ? '多选' : (domain.index === 3 ? '数字' :
                (domain.index === 4? '文本' : (domain.index === 5 ? '评分' : '级联'))))"
                :prop="'domains.' + index + '.value'"
                :rules="{
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
      }"
        >
            <a-input
                    v-model="domain.text"
                    placeholder="请输入题目描述"
                    style="width: 60%"
            />
            <span v-if="domain.index === 1">
                <div>
                    <label>A  </label>
                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项A"/>
                </div>
                <div>
                    <label>B  </label>
                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项B"/>
                </div>
                <div>
                    <label>C  </label>
                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项C"/>
                </div>
                <label>D  </label>
                <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项D"/>
            </span>
            <span v-if="domain.index === 2">
                <div>
                    <label>A  </label>
                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项A"/>
                </div>
                <div>
                    <label>B  </label>
                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项B"/>
                </div>
                <div>
                    <label>C  </label>
                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项C"/>
                </div>
                <label>D  </label>
                <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项D"/>
            </span>
            <a-input
                    v-if="domain.index === 4"
                    v-model="domain.value"
                    placeholder="请输入文本"
                    style="width: 60%"
            />
            <a-input-number
                    v-if="domain.index === 3 "
                    v-model="domain.value"
                    placeholder="请输入数字"
                    @change="onChangeNumber"
                    :style="{ width: '60%', marginTop: '10px' }"
            />
            <span>
                <div>
                    <a-rate v-if="domain.index === 5" :default-value="2.5" allow-half v-model="domain.value" :tooltips="desc" />
                    <span class="ant-rate-text">{{ desc[value - 1] }}</span>
                </div>
            </span>
            <div>
                <a-collapse v-if="domain.index === 6" v-model = "domain.value" @change="changeActivekey">
                    <a-collapse-panel key="1" header="A">
                        <a-input :style="{ width: '60%', marginBottom: '10px' }" placeholder="请输入选项A"/>
                        <a-collapse default-active-key="4">
                            <a-collapse-panel key="4" header="级联选项">
                                <div>
                                    <div>
                                        <label>问题描述  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入问题描述"/>
                                    </div>
                                    <div>
                                        <label>A  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项A"/>
                                    </div>
                                    <div>
                                        <label>B  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项B"/>
                                    </div>
                                    <div>
                                        <label>C  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项C"/>
                                    </div>
                                    <label>D  </label>
                                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项D"/>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-collapse-panel>
                    <a-collapse-panel key="1" header="B">
                        <a-input :style="{ width: '60%', marginBottom: '10px' }" placeholder="请输入选项B"/>
                        <a-collapse default-active-key="4">
                            <a-collapse-panel key="4" header="级联选项">
                                <div>
                                    <div>
                                        <label>问题描述  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入问题描述"/>
                                    </div>
                                    <div>
                                        <label>A  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项A"/>
                                    </div>
                                    <div>
                                        <label>B  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项B"/>
                                    </div>
                                    <div>
                                        <label>C  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项C"/>
                                    </div>
                                    <label>D  </label>
                                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项D"/>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-collapse-panel>
                    <a-collapse-panel key="1" header="C">
                        <a-input :style="{ width: '60%', marginBottom: '10px' }" placeholder="请输入选项C"/>
                        <a-collapse default-active-key="4">
                            <a-collapse-panel key="4" header="级联选项">
                                <div>
                                    <div>
                                        <label>问题描述  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入问题描述"/>
                                    </div>
                                    <div>
                                        <label>A  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项A"/>
                                    </div>
                                    <div>
                                        <label>B  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项B"/>
                                    </div>
                                    <div>
                                        <label>C  </label>
                                        <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项C"/>
                                    </div>
                                    <label>D  </label>
                                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项D"/>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-collapse-panel>
                    <a-collapse-panel key="1" header="D">
                        <a-input :style="{ width: '60%', marginBottom: '10px' }" placeholder="请输入选项D"/>
                        <a-collapse default-active-key="4">
                            <a-collapse-panel key="4" header="级联选项">
                                <p>
                                <div>
                                    <label>A  </label>
                                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项A"/>
                                </div>
                                <div>
                                    <label>B  </label>
                                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项B"/>
                                </div>
                                <div>
                                    <label>C  </label>
                                    <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项C"/>
                                </div>
                                <label>D  </label>
                                <a-input :style="{ width: '60%', marginTop: '10px' }" placeholder="请输入选项D"/>
                                </p>
                            </a-collapse-panel>
                        </a-collapse>
                    </a-collapse-panel>
                </a-collapse>
            </div>
            <a-icon
                    v-if="dynamicValidateForm.domains.length > 1"
                    class="dynamic-delete-button"
                    type="minus-circle-o"
                    :disabled="dynamicValidateForm.domains.length === 1"
                    @click="removeDomain(domain)"
            />
        </a-form-model-item>
        <a-form-model-item v-bind="formItemLayoutWithOutLabel">
            <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick">
                    <a-menu-item key="1" @click="addDomain(1)">
                        <a-icon type="default"/>
                        添加单选题
                    </a-menu-item>
                    <a-menu-item key="2" @click="addDomain(2)">
                        <a-icon type="default"/>
                        添加多选题
                    </a-menu-item>
                    <a-menu-item key="3" @click="addDomain(3)">
                        <a-icon type="default"/>
                        添加数字
                    </a-menu-item>
                    <a-menu-item key="4" @click="addDomain(4)">
                        <a-icon type="default"/>
                        添加文本
                    </a-menu-item>
                    <a-menu-item key="5" @click="addDomain(5)">
                        <a-icon type="default"/>
                        添加评分
                    </a-menu-item>
                    <a-menu-item key="6" @click="addDomain(6)">
                        <a-icon type="default"/>
                        添加级联
                    </a-menu-item>
                </a-menu>
                <a-button type="dashed" style="width: 60%">
                    <a-icon type="plus"/>
                    添加问卷项目
                </a-button>
            </a-dropdown>
        </a-form-model-item>
        <a-form-model-item v-bind="formItemLayoutWithOutLabel">
            <a-button type="primary" html-type="submit" @click="submitForm('dynamicValidateForm')">
                提交问卷
            </a-button>
            <a-button style="margin-left: 10px" @click="resetForm('dynamicValidateForm')">
                重置问卷
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    export default {
        data() {
            return {
                formItemLayout: {
                    labelCol: {
                        xs: {span: 24},
                        sm: {span: 4},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 20},
                    },
                },
                formItemLayoutWithOutLabel: {
                    wrapperCol: {
                        xs: {span: 24, offset: 0},
                        sm: {span: 20, offset: 4},
                    },
                },
                dynamicValidateForm: {
                    domains: [],
                },
                desc: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
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
