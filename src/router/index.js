import vue from 'vue'
import routes from './routes'
import vueRouter from 'vue-router'
import {getCookie} from '../utils/utils'
vue.use(vueRouter)

let router = new vueRouter({
    routes
})
router.beforeEach((to, from, next) => { // 全局钩子 导航守卫
    if(to.name != 'login'){
        if(getCookie('token')){
            next()
        }else{
            next({name: 'login', query: {
                from: to.name
            }})
        } 
    }else{
        next()
    }
    
    // if(to.matched.some( record => record.meta.requireAuth)){
    //     
    // }else{
    //     next()
    // }
})
export default router