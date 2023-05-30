<template>
<div class="addAddress">
    <mt-header :title="'添加收货地址'" fixed :style="{fontWeight:700}">
        <div @click="back" slot="left">
            <mt-button icon="back" ></mt-button>
        </div>
        <div icon="more" class="more" slot="right">
            <router-link to="/login" class="white">登录</router-link>&nbsp; |
            <router-link to="/reg" class="white">注册</router-link>
        </div>
    </mt-header>

    
</div>
</template>

<script>
export default {

    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="scss">
.addAddress{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:9999999;
    background-color: #fff;
}
</style>