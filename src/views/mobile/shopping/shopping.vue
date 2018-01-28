<template>
  <div class="mobile-div">
      <header>
          <div class="title">购物车</div>
          <div class="next">编辑</div>
      </header>
      <section>
          <div class="main"> 
            <!-- 商品 -->
            <cart-item v-for="(val, key) in $store.state.data" :key="key" :val="val"></cart-item>
            <div class="total">
                <div>
                    <span class="circle" :class='{"bg": $store.state.allBool}' @click='judge'></span>全选
                </div>
                <span>
                    合计：<span>¥{{$store.state.sum}}</span>
                </span>
                <span class="btn">结算</span>
            </div>
          </div>
          
      </section>
  </div>
</template>

<script>
import cartItem from './cartItem/cartItem'
export default {
    name: 'shopping',
    created () {
        this.$http.post('/mobile/cart_list', {
            username: this.$store.state.username
        }).then((data) => {
            this.$store.state.data = data.data
            this.$store.commit('total')
        })
        
    },
    components: {
        cartItem
    },
    methods: {
        judge () {
            this.$store.state.allBool = !this.$store.state.allBool
            this.$store.state.data.map(v => {
                v.bool = this.$store.state.allBool
            })
            this.$store.commit('total')
        }
    }
}
</script>

<style scoped>
  header {
      border-bottom: 1px solid #ccc;
  }
  .main {
      margin-bottom: 0.8rem;
  }
</style>
