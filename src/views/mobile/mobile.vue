<template>
    <div class="mobile appMain">
        <!-- 注意顺序 include='index'     :include='/index/'-->
        <transition name="route">  
            <keep-alive :include='/index/'>
                
                <router-view></router-view>
            
            </keep-alive>
         </transition>
        <my-footer></my-footer>
    </div>
</template>

<script>
import myFooter from '../../components/footer/footer'
export default {
    name: 'mobile',
    components: {
        myFooter
    }
}
</script>

<style>
.route-enter-active, .route-leave-active {
    transition: transform 0.5s linear;
}
.route-enter {
    transform: translate3d(100%, 0, 0)
}
.route-enter-to {
    transform: translate3d(0, 0, 0)
}
.route-leave{
    transform: translate3d(0, 0, 0)
}
 .route-leave-to {
     transform: translate3d(-100%, 0, 0)
 }
</style>
