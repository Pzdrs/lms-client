import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import UserProfile from "@/views/UserProfile";
import Welcome from "@/views/Welcome";
import PageNotFound from "@/views/PageNotFound";
import Login from "@/views/Login";
import SignUp from "@/views/SignUp";
import Books from "@/views/Books";
import History from "@/views/History";
import Users from "@/views/Users";
import MyBooks from "@/views/MyBooks";
import store from "@/store";
import ForgotPassword from "@/views/ForgotPassword";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
        meta: {
            redirectIfLoggedIn: true
        }
    },
    {
        path: '/dashboard',
        alias: '/dash',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            navbar: true,
            requiresAuth: true
        }
    },
    {
        path: '/books',
        name: 'Books',
        component: Books,
        meta: {
            navbar: true,
            requiresAuth: true
        }
    },
    {
        path: '/my-books',
        name: 'My Books',
        component: MyBooks,
        meta: {
            navbar: true,
            requiresAuth: true
        }
    },
    {
        path: '/history',
        name: 'History',
        component: History,
        meta: {
            navbar: true,
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path: '/users',
        name: 'Users',
        component: Users,
        meta: {
            navbar: true,
            requiresAdmin: true,
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: UserProfile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            redirectIfLoggedIn: true
        }
    },
    {
        path: '/forgot-password',
        name: 'Forgotten password',
        component: ForgotPassword,
        meta: {
            redirectIfLoggedIn: true
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta: {
            redirectIfLoggedIn: true
        }
    },
    {
        path: '*',
        component: PageNotFound,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "is-active",
    linkExactActiveClass: "is-active-exact",
});

router.beforeEach(async (to, from, next) => {
    // Set page title
    document.title = `${to.name || 'Welcome'} | Library Management System`;
    if (!tokenPresent()) {
        await store.dispatch('Auth/refreshToken')
            .catch(() => {
                if (to.meta && to.meta.requiresAuth) {
                    console.error('Your access token could not be refreshed, please log in.');
                    router.push('/login');
                }
            });
    }
    // I dont want logged in people to be able to certain pages like /login or /, so when they search for the lms.domain its going to redirect them to the dashboard
    if (to.meta && to.meta.redirectIfLoggedIn && tokenPresent()) next('/dashboard');
    // Secures admin only pages
    if ((to.meta && to.meta.requiresAdmin) && !store.getters["Auth/getUser"].isAdmin) next(from.path)
    next();
});

function tokenPresent() {
    return store.getters["Auth/getAccessToken"];
}

export default router;
