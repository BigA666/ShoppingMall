<template>
<div class="appMain">
   <div class="mobile-div">
      <header>
          <div class="title">
              <h2>登陆页面</h2>
          </div>
      </header>
      <section>
          <div class="form">
            <input type="text" placeholder="用户名" v-model.trim="username">
            <input type="text" placeholder="密码" v-model.trim="password">  
            <button @click='login'>登陆</button>
          </div>
          
      </section>
  </div> 
</div>
  
</template>

<script>
import {setCookie} from '@/utils/utils' 
export default {
    name: 'login',
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login () {
            if (!this.username || !this.password){
                alert('用户名或密码不能为空')
            } else{
                this.$http.post('/login', {
                    username: this.username,
                    password: this.password
                }).then((data) => {
                    alert(data.data.msg)
                    if(data.data.code === 1){
                        let localUser = this.username
                        localStorage.setItem('username', localUser)
                        this.$store.state.username = localStorage.getItem('username') // 重新再获取一遍
                        let from = this.$route.query.from || 'index'
                        setCookie('token', data.data.token)
                        this.$router.push({name: from})
                    }
                })
            }
        }
    }
}
</script>

<style>
.form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    background: white;
}
.form input {
    margin: 0.2rem 0;

}
</style>
