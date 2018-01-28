<template>
  <div class="cartItem">
    <div class="judge">
        <span class="circle" :class='{"bg": val.bool}' @click='judge'></span>
    </div>
    <img :src="'http://www.lb717.com'+val.imgSrc" class="itemImg">
    <div class="itemMain">
        <p class="goods_name">{{val.goods_name}}</p>
        <div class="priceDiv">
            <div>
                <span>x{{val.num}}</span>
                <span class="price">{{val.discount_price}}</span>
            </div>
            <div class="add">
                <span @click='add("-")'> - </span>
                <span>{{val.num}}</span>
                <span @click='add("+")'> + </span>
            </div>
        </div>
       
    </div>
  </div>
</template>

<script>
export default {
    name: 'cartItem',
    props: ['val'],
    methods: {
        judge () {
            this.val.bool = !this.val.bool
            this.$store.commit('total')
            this.$store.commit('oneChecked')
        },
        add (con) {
            if (con == '+'){
                this.val.num += 1
            } else {
                this.val.num -= 1
            }
            // 存于数据库
            this.$http.post('/mobile/changeCart', {
                data: this.$store.state.data,
                username: this.$store.state.username
            }).then(data => {
                console.log(data)
            })
            // 重新计算总价
            this.$store.commit('total')
        }
    }
}
</script>

<style>
.cartItem {
    width: 100%;
    height: auto;
    padding: 0.1rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: white;
    margin-bottom: 0.1rem;
}
.cartItem img{
    width: 0.8rem;
    height: 0.8rem;
}
.judge {
    flex: 1;
}
.itemImg {
    flex: 3;
    margin-right: 0.2rem;
}
.itemMain {
    flex: 5;
    height: 100%;
}    
.itemMain .goods_name {
    /* 单行文本溢出隐藏要有固定的宽度才行，width：100% 这个也不行
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
.priceDiv {
    width: 100%;
    display: flex;
}
.priceDiv div:first-child {
    display: flex;
    flex-direction: column;
}
.priceDiv div:last-child {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
.priceDiv div:first-child span {
    margin-top: 0.1rem;
    margin-right: 0.2rem;
}
.add span{
    display: inline-block; 
    width: 0.2rem; 
    height: 0.2rem;
    border: 1px solid #ccc;
    text-align: center; 
    line-height: 0.2rem;
}
.price {
    color: red;
}       
</style>
