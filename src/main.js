import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Ads from 'vue-google-adsense'
import axios from 'axios'

Vue.use(require('./mock'));
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(require('vue-cookies'));
Vue.use(require('vue-script2'));
Vue.use(Antd);
Vue.use(Ads.Adsense);
Vue.use(Ads.InArticleAdsense);
Vue.use(Ads.InFeedAdsense);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
