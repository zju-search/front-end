<template>
    <a-layout>
        <a-menu mode="horizontal">
            <a-menu-item>
                <a-icon type="mail"/>
                首页
            </a-menu-item>
            <a-menu-item>
                <a-icon type="appstore"/>
                训练任务
            </a-menu-item>
            <a-menu-item>
                <a-icon type="setting"/>
                模型应用
            </a-menu-item>
            <a-menu-item>
                <a-icon type="project"/>
                数据字典
            </a-menu-item>
            <a-menu-item :style="{float:'right'}">
                <a-icon type="logout"/>
                退出
            </a-menu-item>
            <a-menu-item :style="{float:'right'}">
                <a-icon type="team"/>
                西部信托有限公司
            </a-menu-item>
        </a-menu>
        <a-layout-content :style="{ margin: '20px 20px'}">
            <RouterView></RouterView>
        </a-layout-content>
        <a-layout-footer style="textAlign: center">
            Powered By Ant Design ©2020
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import VueCookies from 'vue-cookies';

    export default {
        name: 'Index',
        beforeCreate() {
            this.name = VueCookies.get('name');
            this.token = VueCookies.get("token");
            this.email = VueCookies.get("email");
        },
    };
</script>
