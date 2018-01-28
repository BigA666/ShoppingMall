export default {
    init (msg, cls, target) {
        let obdyEl
        let that = this
        if(target){
            obdyEl = document.getElementById(target)
            obdyEl.style.position = 'relative'
        }else{
            obdyEl = document.body;
        }
        if(obdyEl.querySelector('.'+ cls)){
            return
        }
        let el = this.createElement('div', {class: cls}, [msg])
        obdyEl.appendChild(el)
        el.addEventListener('webkitAnimationEnd', function(){ // 监听动画结束事件
            that.removeEl(obdyEl, el)
        })
    },
    createElement (type, props = {}, children) {
        if(!_.isString(type)){
            console.log('first argument must be string')
            return;
        }
        let el = document.createElement(type)
        if(!_.isObject(props)){
            console.error('second argument must be a object')
            return;
        }
        for(let i in props){
            el.setAttribute(i, props[i])
        }
        if(!_.isArray(children)){
            console.error('last argument must be a array')
            return;
        }
        if(children && children.length > 0){
            children.forEach(item => {
                if(_.isElement(item) ){
                    el.appendChild(item)
                }else if (_.isString(item)) {
                    el.innerText = item
                }else{
                    console.warn('children must be a string or dom')
                }
                
            })
        }
        return el
    },
    removeEl (obdyEl, el) {
        obdyEl.removeChild(el)
        obdyEl.style.position = 'static'
    }
}