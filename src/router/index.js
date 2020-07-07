import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import StockDetail from "../components/StockDetail";
import homepage from "../components/homepage";
import MarketStocks from "../components/MarketStocks";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/',
                name: '行情中心',
                component: homepage,
            },
            {
                path: '/MarketStocks/:market_index',
                name: '细分行业股票',
                component: MarketStocks
            },
            {
                path: '/StockDetail/:ts_code',
                name: '股票明细',
                component: StockDetail
            },
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
