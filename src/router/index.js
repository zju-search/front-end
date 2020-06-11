import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../components/Index";
import Login from "../components/Login";
import Write from "../components/Write";
import WriteList from "../components/RectifyList";
import VisionList from "../components/VisionList";
import Register from "../components/Register";
import VisionOutline from "../components/VisionOutline";
import VisionDetail from "../components/VisionDetail";
import QuestionType from "../components/QuestionType";
import Publish from "../components/Publish";

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
                path: '/write/:id/',
                name: 'write',
                component: Write
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/vision-outline/:id/',
                name: 'VisionOutline',
                component: VisionOutline
            },
            {
                path: '/vision-detail/:id/',
                name: 'VisionDeatil',
                component: VisionDetail
            },
            {
                path: '/RectifyList',
                name: 'RectifyList',
                component: WriteList
            },
            {
                path: '/VisionList',
                name: 'VisionList',
                component: VisionList
            },
            {
                path: '/QuestionType/:id/',
                name: 'QuestionType',
                component: QuestionType
            },
            {
                path: '/publish',
                name: 'Publish',
                component: Publish
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
