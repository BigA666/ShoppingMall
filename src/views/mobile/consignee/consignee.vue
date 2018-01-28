<template>
  <div class="mobile-div">
       <header>
            <div class="back">
                <i class="fa fa-angle-left"></i>
            </div>
            <div class="title">
                收货人
            </div>
            <div class="next">
                <i class="fa fa-home"></i>
            </div>
        </header>
        <section>
            <div class="info">
                <input type="text" placeholder="收货人姓名" v-model.trim="name">
            </div>
            <div class="info">
                <input type="text" placeholder="手机号" v-model.trim="phoneNumber">
            </div>
            <div class="selectBox">
                <select name="" id="province" @change="provinceFn" v-model="province">
                    <option value="请选择省">请选择省</option>
                    <option :value="v.name" v-for="(v ,k) in data" :key="k">{{v.name}}</option>
                </select>
                <select name="" id="city" @change="cityFn" v-model="city">
                    <option value="请选择市">请选择市</option>
                    <option :value="v.name" v-for="v in cityArr" :key='v'>{{v.name}}</option>
                </select>
            </div>
            <div class="info">
                <select name="" id="area" v-model="area">
                  <option value="请选择地区">请选择地区</option>
                  <option :value="v" v-for="v in areaArr" :key='v'>{{v}}</option>

                </select>    
            </div>
            
            <div class="info">
                <input type="text" placeholder="详细地址" v-model.trim="address">
            </div>
            <div>
                <button class="btn" @click="prev">保存</button>
            </div>
        </section>
  </div>
</template>

<script>
export default {
    name: 'consignee',
    data () {
        return {
            name: '',
            phoneNumber: '',
            address: '',
            data: [],
            province: '请选择省',
            city: '请选择市',
            area: '请选择地区',
            cityArr: [],
            areaArr: []
        }
    },
    methods: {
        prev () {
            if(!this.name){
                alert('请填写收货人')
            }else if(!this.phoneNumber){
                alert('请填写手机号')
            }else if(!/^1(3|5|7|8)\d{9}$/.test(this.phoneNumber)){
                alert('手机号格式有误')
            }else if(this.area === '请选择地区'){
                alert('请填写地区')
            }else if(!this.address){
                alert('请填写详细地址')
            }else{
                this.$http.post('/mobile/shoppingAddress', {
                    username: this.$store.state.username,
                    data: {
                        name: this.name,
                        phoneNumber: this.phoneNumber,
                        provinceCity: {
                            province: this.province,
                            city: this.city,
                            area: this.area
                        },
                        address: this.address
                    }
                    
                }).then((data) => {
                    alert(data.data)
                    this.name = ''
                    this.phoneNumber = ''
                    this.province = '请填写省'
                    this.city = '请填写市'
                    this.area = '请填写区域'
                    this.address = ''
                })
            }
            
        },
        provinceFn () {
            this.city = '请选择市'
            this.area = '请选择地区'
            this.data.map((v, k) => {
                if(v.name === this.province){
                    this.cityArr = v.city
                }
            })

        },
        cityFn () {
            this.area = '请选择地区'
            this.cityArr.map((val, key) => {
                if(val.name === this.city){
                    this.areaArr = val.area
                }
            })
        }
    },
    created () {
        this.$http.post('/mobile/address').then(data => {
            this.data = data.data
        })
    }
}
</script>

<style scoped>
.info {
    margin: 0.2rem;
    background: white;
}
.info input {
    width: 100%;
    height: 0.4rem;
    border: none;
    outline: none;
    padding-left: 0.2rem;
    box-sizing: border-box;
}
.info select {
    width: 100%;
    height: 0.4rem;
    border: none;
    outline: none;
    padding-left: 0.2rem;
    box-sizing: border-box;
}
.selectBox {
    margin: 0.2rem;
    padding: 0.2rem 0;
    display: flex;
}
.selectBox select {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.1rem;
    box-sizing: border-box;
}
.selectBox select:first-child{
    margin-right: 0.2rem;
    height: 0.5rem;
    padding-left: 0.1rem;
    box-sizing: border-box;
}
.btn {
    width: 50%;
    height: 0.5rem;
    background: #fc4141;
    display: block;
    margin: 0.2rem auto;
    color: white;
    border: none;
    outline: none;
    border-radius: 0.25rem;
}
</style>
