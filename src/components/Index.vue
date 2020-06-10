<template>
    <a-layout id="components-layout-demo-responsive">
        <a-layout-sider breakpoint="lg" collapsed-width="0" @collapse="onCollapse" @breakpoint="onBreakpoint">
            <div><img class="logo" src="../assets/logo.jpeg"/><b><span
                    style="color: whitesmoke;font-size: 15px ">溯源问卷网</span></b>
            </div>
            <a-menu theme="dark" mode="inline">
                <a-menu-item key="1" v-if="this.token == null">
                    <router-link :to="`login`">
                        <a-icon type="user"/>
                        <span class="nav-text">登录</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="1" v-if="this.token != null">
                    <a-icon type="user"/>
                    <span class="nav-text">{{this.name}}</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link :to="`register`">
                        <a-icon type="video-camera"/>
                        <span class="nav-text">注册</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link :to="`publish`">
                        <a-icon type="upload"/>
                        <span class="nav-text">发布问卷</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="4">
                    <router-link :to="`watch`">
                        <a-icon type="user"/>
                        <span class="nav-text">查看问卷</span>
                    </router-link>
                </a-menu-item>
                <a-menu-item key="5">
                    <router-link :to="`vision`">
                        <a-icon type="area-chart" />
                        <span class="nav-text">问卷统计</span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header></a-layout-header>
            <a-layout-content :style="{ margin: '12px 24px 0' }">
                <div :style="{padding: '24px', background: '#fff', minHeight: '360px' }">
                    <RouterView :style="{textAlign:'left'}"></RouterView>
                </div>
            </a-layout-content>
            <a-layout-footer style="textAlign: center">
                Powered By Ant Design ©2020 Created by Zouziyu
            </a-layout-footer>
        </a-layout>
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
        methods: {
            onCollapse(collapsed, type) {
                console.log(collapsed, type);
            },
            onBreakpoint(broken) {
                console.log(broken);
            },
        },
    };
</script>

<style>
    #components-layout-demo-responsive .logo {
        height: 45px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
</style>
