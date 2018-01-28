import Vue from 'vue'
import 'lodash'
import './message.css'
import mixin from '../mixin'
let message = {
    install (Vue){
        let that = this
        Object.defineProperty(Vue.prototype, '$message', {
            value: function(msg){
                that.init(msg, 'imessage')
            }
        })
    },
    ...mixin
    
}
export default message