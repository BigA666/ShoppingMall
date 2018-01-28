import mobile from '../views/mobile/mobile.vue'
import index from '../views/mobile/index/index.vue'
import category from '../views/mobile/category/category.vue'
import shopping from '../views/mobile/shopping/shopping.vue'
import search from '../views/mobile/search/search.vue'
import personal from '../views/mobile/personal/personal.vue'
import address from '../views/mobile/address/address.vue'
import consignee from '../views/mobile/consignee/consignee.vue'

import login from '../views/login/login.vue'

let routes = [
    {
        path: '/mobile',
        name: 'mobile',
        component: mobile,
        children: [
            {
                path: 'index',
                name: 'index',
                component: index
            },
            {
                path: 'category',
                name: 'category',
                component: category
            },
            {
                path: 'shopping',
                name: 'shopping',
                component: shopping
                // meta: {
                //     requireAuth: true
                // }
            },
            {
                path: 'search',
                name: 'search',
                component: search
            },
            {
                path: 'personal',
                name: 'personal',
                component: personal
                // meta: {
                //     requireAuth: true
                // }
            },
            {
                path: 'address',
                name: 'address',
                component: address
            },
            {
                path: 'consignee',
                name: 'consignee',
                component: consignee
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/',
        redirect: '/mobile/index'
    }
]
export default routes