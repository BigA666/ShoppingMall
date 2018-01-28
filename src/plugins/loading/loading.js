import Vue from 'vue'
import 'lodash'
// import './loading.css'
import mixin from '../mixin'
let Loading = {
    install (Vue){
        let that = this
        Object.defineProperty(Vue.prototype, '$loading', {
            value: function(msg, target){
                let img = document.createElement(msg)
                img.setAttribute('src', 'src/common/images/timg.gif')
                that.init(img, 'iLoading', target)
            }
        })
    },
    ...mixin
    
}
export default Loading