<template>
  <footer>
    <router-link to='index'>
        <i class="fa fa-home"></i>
        首页
    </router-link>   
    <router-link to='category'>
        <i class="fa fa-home"></i>
        分类
    </router-link>
    <router-link to='shopping'>
        <b class="num">{{$store.state.data.length}}</b>
        <i class="fa fa-home"></i>
        购物车
    </router-link>
    <router-link to='personal'>
        <i class="fa fa-home"></i>
        我的
    </router-link>     
  </footer>
</template>

<script>
export default {
    name: 'footer',
    created () {
        this.$http.post('/mobile/cart_list', {
            username: this.$store.state.username
        }).then((data) => {
            this.$store.state.data = data.data
            this.$store.commit('total')
        })
    }
}
</script>

<style>
a {
    position: relative;
}
.num {
    position: absolute;
    display: inline-block;
    background: red;
    color: white;
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
    font-weight: normal;
    line-height: 0.15rem;
    text-align: center;
    top: -0.05rem;
    right: 0.2rem;
}
</style>
