<template>
  <div class="mobile-div">
    <header>
      <div class="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="title">
        收货地址
      </div>
      <div class="next">
        <i class="fa fa-home"></i>
      </div>
    </header>
    <section>
      <shoppingAddress v-for="(val, key) in data" :key="key" :val="val"></shoppingAddress>
      <button class="btn" @click="add_address">+ 新增加地址</button>
    </section>
  </div>
</template>

<script>
import shoppingAddress from './shoppingAddress/shoppingAddress'
export default {
  name: 'address',
  components: {
    shoppingAddress
  },
  data () {
    return {
      data: ''
    }
  },
  methods: {
    add_address () {
      this.$router.push({name: 'consignee'})
    }
  },
  created () {
    this.$http.post('/mobile/allAddress', {
      username:this.$store.state.username
    }).then((data) => {
      this.data = data.data
    })
  }
}
</script>

<style scoped>
header {
  border-bottom: 1px solid #ccc;
}
.btn {
  background: #fc4141;
  color: white;
  width: 70%;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  display: block;
  border: none;
  border-radius: 0.25rem;
  margin: 0.2rem auto;
}
</style>
