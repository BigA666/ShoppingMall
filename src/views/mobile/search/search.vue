<template>
  <div class="mobile-div">
      <header>
        <div class="searchBox search-searchBox">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="请输入您要购买的商品" v-model.trim="searchInput">
        </div>
        <div class="searchBtn" @click="searchBtn">
            搜索
        </div>  
      </header>
      <section>
          <div class="record">
              <p>最近搜索</p>
              <ul v-if="searchHistoryList">
                  <li class="search-item" v-for="(val, key) in searchHistoryList" :key="key">
                      {{val}}
                  </li>
              </ul>
              <p class="noRecord" v-else>暂无搜索记录</p>
          </div>
      </section>
      
  </div>
</template>

<script>
import 'lodash'  // 功能库
export default {
    name: 'search',
    data () {
        return {
            searchInput: '',
            searchHistoryList: []
        }
    },
    created () {
        this.getHistory()
    },
    methods: {
        searchBtn () {
            if(this.searchInput === '') return;
            let ls = localStorage
            let shistory = ls.getItem('searchHistory')

            this.$http_token.post('/mobile/index/ajax_config').then((data) => {
                console.log(data)
            })

            if(shistory){
                let newHistory = JSON.parse(shistory)
                newHistory.unshift(this.searchInput)
                newHistory = _.uniq(newHistory) // 去重
                ls.setItem('searchHistory', JSON.stringify(newHistory))
                this.searchInput = ''
            }else{
                ls.setItem('searchHistory', JSON.stringify([this.searchInput]))
                this.searchInput = ''
            }
            this.getHistory()
        },
        getHistory () {
            let ls = localStorage 
            this.searchHistoryList = JSON.parse(ls.getItem('searchHistory'))
        }
    }
}
</script>

<style scoped>
.mobile-div header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.searchBtn {
    position: absolute;
    top: 0rem;
    right: 0.1rem;
    line-height: 0.5rem;
}
.record {
    width: 100%;
    height: 100%;
    padding: 0.1rem;
    box-sizing: border-box;
    background: white;
}
.search-item {
    padding: 0.05rem 0.1rem;
    border: 1px solid #ccc;
    margin: 0.1rem 0.1rem 0.1rem 0;
    border-radius: 0.03rem;
    display: inline-block;
}
.noRecode {
    clear: both;
}
</style>
