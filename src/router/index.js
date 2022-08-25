import Router from 'vue-router';
import RegisterPage from '@/components/RegisterPage.vue';
import LoginPage from '@/components/LoginPage.vue';
import HomePage from '@/components/HomePage.vue';

// import store from '@/store';

// const meta = {
//     authorize:['admin','standard']
// }

const router = new Router({
    mode: 'history',
    routes:[
        {
            name: 'register',
            path:'/register',
            component: RegisterPage
        },
        {
            name: 'login',
            path:'/login',
            component: LoginPage
        },
        {
            name: 'home',
            path:'/home',
            component: HomePage
        },
        // {
        //     name: 'page-not-found',
        //     path: '*',
        //     component: PageNotFound
        // }
    ]
});

// router.beforeEach((to,from,next)=>{
//     const authorize = to.meta.authorize

//     if(authorize && !store.getters.isAuthenticated){
//         return next({
//             name: 'login'
//         });
//     }else{
//         if(authorize && !authorize.includes(store.state.auth.role)){
//             return next({
//                 path:'/'
//             });
//         }
//     }
//     next();
// });

export default router;