export function getCookie(name){
    let cookie = document.cookie;
    // console.log(cookie)
    //aa=123; bb=456
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if(arr = cookie.match(reg)){
        return unescape(arr[2]) // unescape() 函数可对通过 escape() 编码的字符串进行解码。
    }else{
        return null
    }
}
export function setCookie(key, value){
    if (!key || !value) return
    document.cookie = key + '=' + value
}
