import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import StockDetail from "../components/StockDetail";
import homepage from "../components/homepage";
import MarketStocks from "../components/MarketStocks";
import CompanyInfo from "../components/company_info.vue"
import FinanceIndex from "../components/finance_index.vue"
import Screener from "../components/filter.vue"
import Pledges from "../components/Pledges";
import Performance from "../components/Performance";
import Tenholder from "../components/tenHolder.vue"
import Holdernum from "../components/holderNum.vue"
import Newsin from "../components/news_in.vue"

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
                path: '/StockDetail/:symbol',
                name: '股票明细',
                component: StockDetail,
            },
            {
                path: "/StockDetail/:symbol/CWZB",
                name: "FinanceIndex",
                component: FinanceIndex
            },
            {
                path: "/StockDetail/:symbol/GSJJ",
                name: "CompanyInfo",
                component: CompanyInfo
            },
            {
                path: "/StockDetail/:symbol/GQZY",
                name: "Pledges",
                component: Pledges
            },
            {
                path: "/StockDetail/:symbol/YJYG",
                name: "Performance",
                component: Performance
            },
            {
                path: "/screener",
                name: "Screener",
                component: Screener
            },
            {
                path: "/StockDetail/:symbol/SDGD",
                name: "Tenholder",
                component: Tenholder
            },
            {
                path: "/StockDetail/:symbol/GDRS",
                name: "Holdernum",
                component: Holdernum
            },
            {
                path: "/SearchNews",
                name: "Newsin",
                component: Newsin
            }
        ]
    }
]

const router = new VueRouter({
  mode:'history',
  routes
});

export default router;
