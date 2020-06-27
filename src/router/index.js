import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import Login from "../components/Login";
import modelApplication from "../components/modelApplication";
import WriteList from "../components/RectifyList";
import QuestionType from "../components/QuestionType";
import trainTask from "../components/trainTask";
import TaskList from "../components/TaskList";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/modelApplication/:id/',
                name: 'modelApplication',
                component: modelApplication
            },
            {
                path: '/RectifyList',
                name: 'RectifyList',
                component: WriteList
            },
            {
                path: '/TaskList',
                name: 'TaskList',
                component: TaskList
            },
            {
                path: '/QuestionType/:id/',
                name: 'QuestionType',
                component: QuestionType
            },
            {
                path: '/trainTask',
                name: 'trainTask',
                component: trainTask
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
