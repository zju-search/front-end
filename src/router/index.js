import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CompanyInfo from "@/components/company_info.vue"
import FinanceIndex from "@/components/finance_index.vue"
import Screener from "@/components/filter.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/company/:symbol/GSJJ",
    name: "CompanyInfo",
    component: CompanyInfo
  },
  
  
  {
    path: "/company/:symbol/CWZB",
    name: "FinanceIndex",
    component: FinanceIndex
  },
  {
    path: "/screener",
    name: "Screener",
    component: Screener
  },
  /*
  {
    path: "/company/:symbol",
    name: "Company",
    component: Company
  },
  
  */
];

const router = new VueRouter({
  mode:'history',
  routes
});

export default router;
