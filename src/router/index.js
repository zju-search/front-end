import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from "../components/Index";
import Index from "../components/Index";
import Login from "../components/Login";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        children: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
            {
                path: '/hello',
                name: 'HelloWorld',
                component: HelloWorld
            }]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
