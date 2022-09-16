import Router from 'vue-router';
import RegisterPage from '@/components/RegisterPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import DashboardPage from '@/components/DashboardPage.vue';
import HomePage from '@/components/HomePage.vue';
import VerifyOTPPage from '@/components/VerifyOTPPage.vue';
import SuccessPage from '@/components/SuccessPage.vue';
import ForgotPasswordPage from '@/components/ForgotPasswordPage.vue';
import ResetPasswordPage from '@/components/ResetPasswordPage.vue';
import UsersListPage from '@/components/UsersListPage.vue';
import AboutPage from '@/components/AboutPage.vue';
import ProfilePage from '@/components/ProfilePage.vue';
import MiddleWare from '@/components/MiddleWare.vue'
import PageNotFound from '@/components/PageNotFound';

import store from '@/store';

const meta = {
    authorize:['admin','standard']
}

const router = new Router({
    mode: 'history',
    routes:[
        {
            name:'basic',
            path:'/',
            component:HomePage
        },
        {
            name:'md',
            path:'/middleware',
            component:MiddleWare
        },
        {
            name: 'register',
            path:'/register',
            component: RegisterPage
        },
        {
            name:'profile',
            path:'/profile',
            component: ProfilePage
        },
        {
            name: 'login',
            path:'/login',
            component: LoginPage
        },
        {
            name: 'home',
            path:'/:name/dashboard',
            component: DashboardPage,
            meta
        },
        {
            name: 'about',
            path:'/:name/about',
            component: AboutPage,
            meta
        },
        {
            name: 'users',
            path:'/:name/users',
            component: UsersListPage,
            meta
        },
        {
            name: 'verifyOTP',
            path:'/:id/verifyOTP',
            component: VerifyOTPPage
        },
        {
            name: 'success',
            path:'/success',
            component: SuccessPage,
            props: (route)=>{
                return {message:route.params.message}
            }
        },
        {
            name: 'forgotPassword',
            path:'/forgotPassword',
            component: ForgotPasswordPage
        },
        {
            name: 'resetPassword',
            path:'/resetPassword/:id',
            component: ResetPasswordPage
        },
        {
            path:'*',
            redirect:'/error'
        },
        {
            name: 'page-not-found',
            path: '/error',
            component: PageNotFound
        }
    ]
});

router.beforeEach((to,from,next)=>{
    const authorize = to.meta.authorize

    if(authorize && !store.getters.isAuthenticated){
        console.log("this is the if of meta")
        return next({
            name: 'login'
        });
    }else{
        if(authorize && !authorize.includes(store.state.auth.role)){
            console.log("this is the else of meta")

            return next();
        }
    }
    next();
});

export default router;