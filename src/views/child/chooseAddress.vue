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

    <div class="contents">
        <div class="item" v-for="(item,index) in AddressS" :key="index">
            <div @click="changeDefault(item._id)">
                <input type="radio" name="select" :checked="item.default" >
            </div>
            <div class="right">
                <div class="top">
                    <span>{{item.name}}</span>
                    <span>{{item.gender === "man"?"先生":"女生"}}</span>&nbsp;&nbsp;
                    <span>{{item.tel}}</span>
                </div>  
                <div class="bottom">
                    <span :style="[{background:item.default?'rgb(76, 217, 100)':'red'},{border:'1px solid rgb(76, 217, 100)'}]">{{item.labels}}</span>
                    <span>{{item.fullAddress}}</span>
                </div>
            </div>
        </div>
    </div>

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
import axios from '../../utils/http'
export default {
    data(){
        return{
            allAddress:[],
            AddressS:[],
            aa:'1',
            isAsyncOperationRunning:false,
            isUpdating: false
        }
    },
    created(){
        this.getNowAddress()
        console.log("创建期");

    },
    updated(){
        // 封装成私有的，让他只更新一次
        if (!this.isUpdating) {
            this.isUpdating = true;
            // 执行异步操作
            this.getNowAddress().then(() => {
                this.isUpdating = false;
            });
        }
    },
    destroyed(){
        console.log("销毁期");
        this.aa = "1"
    },
    beforeRouteLeave(to, from, next) {
        // 判断是否切换到子页面
        if (to.name === 'addAddress') {
        // 销毁父组件
        this.$destroy();
        }
    next();
  },
    watch:{
        aa(newVal){
            console.log(newVal);
            this.getNowAddress()
        }
    },
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
        },
        async getNowAddress(){
            if(this.$store.state.user.user){
                let user = localStorage.getItem("user")
                let res = await axios.get("/web/account/getAddress?username="+user)
                console.log(res);
                this.allAddress = res.msg
                this.AddressS = this.allAddress
            }
            
        },
        async changeDefault(id){
            console.log(id);
            if(this.$store.state.user.user){
                let user = localStorage.getItem("user")
                let result = await axios.post("/web/account/editDefalutAddress",{
                    _id:id,
                    username:user
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
.contents{
    width: 98%;
    height: 1rem;
    margin: 0 0.2rem;
    margin-top: 1.1rem;

    .item{
        display: flex;
        .right{
            .top{
                >span:first-child{
                    margin-right: 0.2rem;
                    font-size: .5rem;
                    color: #333;
                    margin-bottom: 0.1em;
                    font-weight: 700;
                }
                >span:nth-child(2){
                    font-size: 0.36rem;
                    color: #333;
                    font-weight: 400;                    
                }
                >span:nth-child(3){
                    font-size: 0.36rem;
                    color: #333;
                    font-weight: 400;
                }
            }
            .bottom{
                >span:first-child{
                    font-size: 0.36rem;
                    margin-right: 0.2rem;
                    margin-bottom: 0.1em;
                    border:1px solid red;
                    background-color: red;
                    border-radius: 4px;
                }
                >span:nth-child(2){
                    font-size: 0.36rem;
                }
            }

    }
    }


  }
}
.mint-msgbox,.mint-msgbox-wrapper{ z-index:7001 !important }
.v-modal{ z-index:7000 !important }
</style>