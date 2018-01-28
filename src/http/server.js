let fs = require('fs') 
let queryApi = require('./queryApi')
let express = require('express')
let bodyparser = require('body-parser')
let jwt = require('jsonwebtoken')


let userInfo_list = require('./data/userInfo_list.json')
let app = express()

app.use(bodyparser.json())
app.all('*', function(req, res, next){ 
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS'); // 响应类型
    res.header("Access-Control-Allow-Headers", "X-Requested-With");// 响应头设置
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // !!! 允许设置响应头的部分

    next() // 不写则无法停止
})
app.post('/login', function(req, res) {
    let flag = true
    userInfo_list.map(v => {
        if(v.username == req.body.username){
            let flag = false
            if(v.password == req.body.password){
                let token = jwt.sign(req.body, '1508', {expiresIn: 60 * 30})
                res.end(JSON.stringify({
                    code: 1,
                    msg: '登陆成功',
                    token: token
                }))
            }else{
                res.end(JSON.stringify({
                    code: 2,
                    msg: '密码输入错误'
                }))
            }
        }
    })
    if(flag){
        res.end(JSON.stringify({
            code: 3,
            msg: '此用户不存在'
        }))
    }
})


// 首页商品渲染
app.post('/mall/index/getGoodsChannel', function(req, res){
    queryApi('/mall/index/getGoodsChannel', req.body, 'POST').then((data) => {
        res.end(data)
    })
    
})
app.post('/mobile/index/ajax_config', function(req, res){
    // console.log(req.headers.Authorization)// undefined
    // console.log(req.headers.authorization)
    console.log(req.headers)
})

// 初始化购物车数据
app.post('/mobile/cart_list', (req, res) => {
    let cart_list = require('./data/'+req.body.username+'/cart_list.json') 
    res.end(JSON.stringify(cart_list))
})

// 添加商品到购物车
app.post('/mobile/addCart', (req, res) => {
    let cart_list = require('./data/'+req.body.username+'/cart_list.json') 
    let flag = true // id不相等
    cart_list = cart_list.map((val, key) => {
        if(val.goods_id == req.body.data.goods_id){
            flag = false
            val.num += 1
        }
        return val; // !!！只有这样才可以改变map ,map不改变原数组， 返回新数组，一定要有 return
    })

    if(flag){
        cart_list.unshift(req.body.data)
    }
    fs.writeFileSync('./data/'+req.body.username+'/cart_list.json', JSON.stringify(cart_list), {encoding: 'utf-8'})
    res.end(JSON.stringify(cart_list))
})

// store 提交购物车数据
app.post('/mobile/changeCart', (req, res) => {
    fs.writeFileSync('./data/'+req.body.username+'/cart_list.json', JSON.stringify(req.body.data), {encoding: 'utf-8'})
    res.end('changeCartSucess')
})
// 省市区
app.post('/mobile/address', (req, res) => {
    let address = require('./data/address.json')
    res.end(JSON.stringify(address))
})
// 收货地址
app.post('/mobile/shoppingAddress', (req, res) => {
    let shoppingAddress = require('./data/'+req.body.username+'/address.json')
    shoppingAddress.push(req.body.data)
    fs.writeFileSync('./data/'+req.body.username+'/address.json', JSON.stringify(shoppingAddress), {encoding: 'utf-8'})
    res.end('保存成功')
})
app.post('/mobile/allAddress', (req, res) => {
    let shoppingAddress = require('./data/'+req.body.username+'/address.json')
    res.end(JSON.stringify(shoppingAddress))   
})
app.listen(3000, function(){
    console.log(3000)
})