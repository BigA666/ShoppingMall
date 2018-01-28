<template>
  <div class="mobile-div">
      <header>
          <div class="back">
              <i class="fa fa-home"></i>
          </div>
          <div class="title">
              我的717商城
          </div>
      </header>
      <section>
          <div class="userInfo">
              <img :src="'src/common/images/default_avatar.png'" alt="">
              <p>{{$store.state.username}}</p>
          </div>
          <div></div>
          <div class="OtheFunctions">
              <a>
                  <span>
                      <i class="fa fa-home"></i>我的社区
                  </span>
                  <i class="fa fa-angle-right"></i>
              </a>
              <a>
                  <span>
                      <i class="fa fa-home"></i>账户余额
                  </span>
                  <i class="fa fa-angle-right"></i>
              </a>
              <router-link to="address">
                  <span>
                      <i class="fa fa-home"></i>地址管理
                  </span>
                  <i class="fa fa-angle-right"></i>
              </router-link>
          </div>
      </section>
  </div>
</template>

<script>
export default {
    name: 'personal'
}
</script>

<style>
.userInfo {
    width: 100%;
    height: auto;
    background: url('../../../common/images/phpot.png');
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0.15rem 0;
}
.userInfo img {
    width: 0.7rem;
    height: auto;
    margin-bottom: 0.1rem;
}
.userInfo p {
    color: white;
}
.OtheFunctions {
    margin-bottom: 0.1rem;
    width: 100%;
}
.OtheFunctions a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    padding: 0.05rem 0.2rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    height: 0.5rem;
}
.OtheFunctions a i {
    margin-right: 0.05rem;
}
</style>
