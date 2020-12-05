import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import SignIn from '../views/Login.vue'
import SignUp from "@/views/SignUp";
import UserProfile from "@/views/UserProfile";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        name: 'Sign-in',
        component: SignIn
    },
    {
        path: '/signup',
        name: 'Sign-up',
        component: SignUp
    },
    {
        path: '/profile',
        name: 'Profile',
        component: UserProfile,
        props: {
            user: Object
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
