<template>
  <div class="mobile-div">
    <header>
      <div class="logo">
        <img src="../../../common/images/homelo.gif" alt="">
      </div>
      <div class="searchBox">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="请输入您要购买的商品" @focus='focusFn'>
      </div>
      <div class="shop">
        <img src="../../../common/images/shoping.png" alt="">
        我的商铺
      </div>
    </header>
    <section ref='sectionDiv' @scroll='scrollFn'>
      
      <div class="main" ref='main'>
        <!-- banner -->
        <div class="picTab swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for='(val, key) in imgArr' :key='key'>
              <img :src="val" alt="">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <!-- nav -->
        <ul class="navBox">
          <li>
            <span>
              <i class="fa fa-home"></i>
              牛奶乳品
            </span>
            <span>
              <i class="fa fa-home"></i>
              家乡味道
            </span>
            <span>
              <i class="fa fa-home"></i>
              休闲零食
            </span>
            <span>
              <i class="fa fa-home"></i>
              米面粮油
            </span>
          </li>
          <li>
            <span>
              <i class="fa fa-home"></i>
              调味调料
            </span>
            <span>
              <i class="fa fa-home"></i>
              酒水饮料
            </span>
            <span>
              <i class="fa fa-home"></i>
              生鲜果蔬
            </span>
            <span>
              <i class="fa fa-home"></i>
              进口食品
            </span>
          </li>
        </ul>
        <!-- advertise -->
        <div class="advertise">
          <span class="orange">
            商城动态
          </span>
          <span class="adverCont swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                7.17安全食品商城周年庆，暑期放价嗨不停！好吃、安全、放心的食品，陪你度假期！
              </div>
              <div class="swiper-slide">
                717商城社区服务功能正式上线！抢红包！晒家乡！好吃、好玩、好看尽在717商城社区！
              </div>
            </div>
          </span>
        </div>
        <div class="today">
          <span>
            <i class="fa fa-home"></i>
            天天特惠
            <small>每天有惊喜</small>
          </span>
          <span class="more">
            更多<i class="fa fa-angle-right"></i>
          </span>
        </div>
        <div class="box">
          <goods v-for='(val, key) in data' :key='key' :val='val'></goods>
        </div>
        <p class="lastP" >{{tip}}</p>
        <!-- <p class="lastP" v-show="isShow">我是有底线的</p> -->
      </div>
    </section>
  </div>
</template>

<script>
import goods from '@/components/goods/goods'
export default {
    name: 'index',
    data () {
      return {
        imgArr: [
          'src/common/images/banner1.png',
          'src/common/images/banner_activite.jpg',
          'src/common/images/home.png',
          'src/common/images/video.png',
          'src/common/images/video717.png'
        ],
        data: [],
        channel_id : 2,
        isRequest: true,
        isShow: false,
        tip: '我们正在拉数据...'
      }
    },
    methods: {
      scrollFn(){
        // console.log( {} == true)
        // console.log( [] == false) // true
        // 页面总高度 = section可视区域的高度 + 滚动的最大距离
        let mainHeight = this.$refs.main.offsetHeight // 页面总高度
        let sectionHeight = this.$refs.sectionDiv.offsetHeight // section可视区域的高度
        let scrollTop = this.$refs.sectionDiv.scrollTop // 滚动的距离
        let maxScrollTop = mainHeight - sectionHeight // 滚动的最大距离
        if(maxScrollTop - scrollTop < 50 && this.isRequest){
          // console.log('我们正在拉数据')
          this.isRequest = false 
          this.channel_id += 1
          this.$http.post('/mall/index/getGoodsChannel', {
            channel_id: this.channel_id
          }).then(({data}) => {
            this.isRequest = true
            if(data.data.data.length){
              setTimeout (() => {
                this.data = this.data.concat(data.data.data)
              }, 1000)
              
            }else{ // 没数据了
              this.isShow = true
              this.tip = '已加载全部数据'
              return;
            }
          })
        }
        // console.log(this.$refs.sectionDiv.scrollTop)
        // console.log(this.$refs.sectionDiv.offsetHeight)
        // console.log(this.$refs.main.offsetHeight)
      },
      focusFn(){
        this.$router.push({name: 'search'})
      }
    },
    components: {
      goods
    },
    mounted () {
      new Swiper('.picTab', {
        loop: true,
        // autoplay: 1000,
        pagination: '.swiper-pagination'
        // slidesPerView : 4, // 一页显示
      })
      this.$http.post('/mall/index/getGoodsChannel', {
        channel_id: this.channel_id
      }).then(({data}) => {
        this.data = data.data.data
      })

      new Swiper('.adverCont', {
        loop: true,
        autoplay: 2000,
        direction: 'vertical'
      })
      
    }
}
</script>

<style scoped>
.today {
  background: white;
  width: 100%;
  padding: 0.1rem;
  box-sizing: border-box;
  margin-top: 0.1rem;
  margin-bottom: 0.05rem;
  display: flex;
  justify-content: space-between;
}

.advertise {
  width: 100%;
  height: auto;
  padding: 0.05rem;
  box-sizing: border-box;
  display: flex;
  background: white;
}
.advertise span {
  flex: 1;
}
.advertise .orange {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.16rem;
  color: orange;
}
.advertise .adverCont {
  flex: 8;
  height: 0.5rem;
  margin-left: 0.05rem;
  border: 1px solid #ccc;
}
.advertise .adverCont .swiper-wrapper {
  width: 100%;
}
.advertise .adverCont .swiper-slide {
  padding: 0.1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.picTab {
  width: 100%;
  height: 1.3rem;
  margin-bottom: 0.1rem;
}
.pic .swiper-slide {
  height: 100%;
  display: block;
  
}
.picTab img {
  width: 100%;
  height: 100%;
  display: block;
}
.navBox {
  background: white;
  width: 100%;
}
.navBox li {
  width: 100%;
  display: flex;
}
.navBox li span {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.1rem;
  box-sizing: border-box;
}
.navBox li span i {
  margin-bottom: 0.1rem;
  font-size: 0.18rem;
}
.box {
  width: 100%;
  overflow: hidden; 
  /* !!!  撑开盒子 */
}
.main {
  margin-bottom: 0.4rem;
}
.lastP {
  
  background: #ccc;
  text-align: center;
  width: 100%;
  line-height: 0.4rem;
  font-size: 0.18rem;
  z-index: 999;
}
</style>
