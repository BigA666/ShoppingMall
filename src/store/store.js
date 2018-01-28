import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
    state: {
        data: [],
        sum: 0,
        allBool: false,
        lenght: 0,
        username: localStorage.getItem('username') 
    },
    mutations: {
        total (state) {
            let sum = 0
            state.data.map((val, key) => {
                if(val.bool){
                    sum += val.discount_price * val.num
                }
                
            })
            state.sum = sum.toFixed(2) // 这是一个 0.1 + 0.2 != 0.3 的bug
        },
        oneChecked (state) {
            let flag = true
            state.data.map((val, key) => {
                if(!val.bool){
                    flag = false
                }
            })
            state.allBool = flag
        }
    },
    actions: {

    },
    modules: {
        
    }
})

// 快照
store.subscribe((data) => {
    // console.log(data)
//   this /mobile/changeCart
})
export default store