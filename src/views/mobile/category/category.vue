<template>
  <div class="mobile-div">
      <header>
          <div class="searchBox">
              <i class="fa fa-search"></i>
              <input type="text" placeholder="请输入你要购买的商品">
          </div>
      </header>
      <section>
          <ul class="menu">
              <li @click='loading'>家乡味道</li>
              <li>进口食品</li>
              <li>牛奶乳品</li>
              <li>休闲零食</li>
              <li>生鲜果蔬</li>
              <li>米面粮油</li>
              <li>调味调料</li>
              <li>酒水饮料</li>
          </ul>
          <div class="content" id="content"></div>
      </section>
  </div>
</template>

<script>
export default {
    name: 'category',
    methods: {
        loading () {
            this.$loading('img', 'content')
        }
    }
}
</script>

<style scoped>
header {
    border-bottom: 1px solid #ccc;
}
section {
    display: flex;
    
}
.menu {
    flex: 1;
    height: 100%;
    background: white;
}
.content {
    flex: 2;
    height: 100%;
    background: white;
}
</style>
