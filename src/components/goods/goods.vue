<template>
   
    <dl class="box-dl">
        <dt>
            <img :src="'http://www.lb717.com' + val.obj_data">
        </dt>
        <dd>
            <p>{{val.goods_name}}</p>
            <p>
                <span>￥{{val.discount_price}}</span>
                <img :src="'src/common/images/homeland3.png'" alt="" @click="addCart">
            </p>
        </dd>
    </dl>

</template>

<script>
import {getCookie} from '@/utils/utils.js'
export default {
    name: 'goods',
    props: ['val'],
    methods: {
        addCart (){
            let token = getCookie('token')
            if(token){
                this.$message('添加成功')
                this.$http.post('/mobile/addCart', {
                    data: {
                        goods_id: this.val.goods_id,
                        goods_name: this.val.goods_name,
                        discount_price: this.val.discount_price,
                        imgSrc: this.val.obj_data,
                        bool: false,
                        num: 1 
                    },
                    username: this.$store.state.username
                    
                }).then(data => {
                    this.$store.state.data = data.data
                })
            }else{
                this.$router.push({name: 'login', query: {from: 'index'}})
                return;
            }
            
        }
    }
}
</script>

<style scoped>

.box-dl {
    width: 50%;
    height: auto;
    padding: 0.05rem;
    box-sizing: border-box;
    height: auto;
    float: left;
    background: white;
}

.box-dl dd p {
    display: flex;
    margin: 0.1rem 0;
}
.box-dl dd p:first-child {
    height: 0.5rem;
}
.box-dl dd p:last-child {
    justify-content: space-around;
}
.box-dl dd p span {
    flex: 6;
    color: red;
}
.box-dl dd p img {
    flex: 1;
    height: 0.2rem;
    width: auto;
}
.box-dl dt img {
    width: 100%;
    height: 1.2rem;
}
</style>
