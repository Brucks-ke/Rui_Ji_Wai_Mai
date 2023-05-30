<template>
<div class="chooseAddress">
    <mt-header :title="'选择地址'" fixed :style="{fontWeight:700}">
        <div @click="back" slot="left">
            <mt-button icon="back" ></mt-button>
        </div>
        <div icon="more" class="more" slot="right">
            <router-link to="/login" class="white">登录</router-link>&nbsp; |
            <router-link to="/reg" class="white">注册</router-link>
        </div>
    </mt-header>

    <div class="add" @click="add">
        <img src="../../assets/add.png" alt="">
        新增收货地址
    </div>
    <!-- 为下个子路由开始准备路由窗口 -->
    <transition name="slide" mode="out-in">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
export default {

    methods:{
        back(){
            this.$router.back()
        },//添加收货地址之前确认是否登录 vuex
        add(){
            // 模块化访问 $store.state.模块.名字 //访问用户状态
            let switchs = this.$store.state.user.user
            if(switchs){
                this.$router.push('/confirmOrder/chooseAddress/addAddress')
            }else{
                this.$messagebox.alert('请先登录后再操作').then(action=>{
                    this.$router.push('/login')
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.chooseAddress{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:6000;
    background-color: #fff;
    .slide-enter,.slide-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
    .slide-enter-active,.slide-leave-active {
        transition: all 0.5s;
    }
    .add{
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0.4rem;
        display: flex;
        align-items:center;
        justify-content: center;
        color:#3190e8;
        img{
            width: 0.5rem;
            margin-right: 0.1rem;
        }
    }
}
.mint-msgbox,.mint-msgbox-wrapper{ z-index:7001 !important }
.v-modal{ z-index:7000 !important }
</style>