<template>
    <div class="confirm">
        <mt-header :title="'确认订单'" fixed :style="{fontWeight:700}">
            <div @click="$router.back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
            <div icon="more" class="more" slot="right" v-if="!user1">
                <router-link to="/login" class="white">登录</router-link>&nbsp; |
                <router-link to="/login" class="white">注册</router-link>
            </div>
            <div icon="more" class="more" slot="right" v-else>
                <router-link to="/login" class="white">{{user1}}</router-link>
            </div>
        </mt-header>
        <div class="content">
                <div class="addressBox" @click="$router.push('/confirmOrder/chooseAddress')">
                    <div class="le">
                        <img src="../assets/position.png" alt="">
                        <span v-text="defaultAddress?`${defaultAddress.name} 先生 ${defaultAddress.sendAddress} ${defaultAddress.fullAddress}`:'请选择收货地址'"></span>
                    </div>
                    <div class="ri">
                        <img src="../assets/next-互动.png" alt="">
                    </div>

                </div>
            <div class="arrive_time">
                <div class="l">
                    送达时间
                </div>
                <div class="r">
                    <div>尽快送达|预计15:08</div>
                    <div>蜂鸟专送</div>
                    
                </div>
            </div>
            <div class="pay_time">
                <div>
                    <span>支付方式</span>
                    <span>在线支付 <img src="../assets/next-互动.png" alt=""></span>
                </div>
                <div class="infomation">
                    <span>红包</span>
                    <span>暂时正在饿了么APP中支持</span>
                </div>
            </div>
            <div class="show">
                <img :src="uploadURL + $store.state.info.shopInfo.pic">&nbsp;
                {{shopInfo.name}}
            </div>
            <div class="info">
                <div v-for="(item,index) in $store.state.info.selectedData" :key="index">
                    <div class="left">
                        <span>{{item.name}}</span>
                    </div>
                    <div class="right">
                        <span :style="{color:'red'}">{{item.count|formatNum}}</span>
                        <span>{{item.price|formatCash}}</span>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <span>餐盒</span>
                    </div>
                    <div class="right">
                        <span :style="{color:'red'}"></span>
                        <span>{{shopInfo.dispatching|formatCash}}</span>
                    </div>
                </div>
                <div>
                    <div class="left">
                        <span>配送费</span>
                    </div>
                    <div class="right">
                        <span :style="{color:'red'}"></span>
                        <span>{{shopInfo.dispatching|formatCash}}</span>
                    </div>
                </div>
            </div>
            <div class="sum">
                <div class="left">
                    订单{{allPrice}}
                </div>
                <div class="right" :style="{color:'red'}">
                    待支付{{allPrice|formatCash}}
                </div>
            </div>
            <div class="remark">
                <div @click="$router.push('/confirmOrder/remark')">
                    <span>订单备注</span>
                    <span>口味、偏好等 <img src="../assets/next-互动.png" alt=""></span>
                </div>
                <div @click="$router.push('/confirmOrder/ticket')">
                    <span>发票抬头</span>
                    <span>不需要开发票 <img src="../assets/next-互动.png" alt=""></span>
                </div>

            </div>
        </div>
        <!-- 页脚 -->
        <footer>
        <div class="cart">
            <div class="rs" @click="popupVisible = !popupVisible">
            <div>待支付{{allPrice|formatCash}}</div>
            </div>
        </div>
        <div class="onsubmit"  @click='down'>
            确认下单
        </div>
        </footer>
        <transition name="slide" mode="out-in">
            <router-view></router-view>
        </transition>
        <!-- 页脚 -->
    </div>
</template>

<script>
import axios from "../utils/http.js"
export default {
    data(){
        return {
            this_info:[],
            shopInfo:[],
            user1:"",
            defaultAddress:{},
            isUpdating:false
        }
    },
    async created(){
        this.getDefaultAddress()
        if(localStorage.getItem('orde')){
            let result = JSON.parse(localStorage.getItem('orde'))
            console.log(result);
            this.this_info = result
        };
        this.getShopInfo()
        console.log(this.$store.state.info);
        this.user1 = localStorage.getItem("user")
    },
    updated(){
        
        // 封装成私有的，让他只更新一次
        if (!this.isUpdating) {
            this.isUpdating = true;
            // 执行异步操作
            this.getDefaultAddress().then(() => {
                this.isUpdating = false;
            });
        }
    },
    // 过滤器
    filters:{
        formatCash(val){
            return "￥" + val
        },
        formatNum(val){
            return "x" + val
        }
    },
    beforeRouteLeave(to, from, next) {
        // 判断是否切换到子页面
        if (to.name === 'chooseAddress') {
        // 销毁父组件
        this.$destroy();
        }
        next();
    },
    computed:{
        allPrice:{
            get(){
                return this.$store.state.info.selectedData.reduce((sum,e)=>sum += e.count * e.price  + this.$store.state.info.shopInfo.dispatching *2 ,0)
            },
            set(){

            }
        }
    },
    methods:{
        async getShopInfo(){
        let res = await axios.get("/server/shop/getShopOne",{
            params:{
                shopId:this.$route.query.id
            }
        })
        this.shopInfo = res
        },
        down(){

        },
        async getDefaultAddress(){
            if(this.$store.state.user.user){
                let user = localStorage.getItem("user")
                let res = await axios.get("/web/account/getAddress?username="+user)
                this.defaultAddress = res.msg.filter(e=>e.default===true)[0]
            }
        }
    }
}
</script>


<style lang="scss" >
.mint-msgbox,.mint-msgbox-wrapper{ z-index:7001 !important }
.v-modal{ z-index:7000 !important }
.confirm{
    padding-top: 0.8rem;
    padding-bottom: 0.94rem;
    .slide-enter,.slide-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }
    .slide-enter-active,.slide-leave-active {
        transition: all 0.5s;
    }





    .mint-header-title{
        font-size: 0.45rem !important;
        color: #fff;
        text-align: center;
        font-weight: 700 !important;
    }
    .content{
        .alink{
            width: 100%;
            height: 1.64rem;
        }
        .addressBox{
            display: flex;
            width: 100%;
            height: 1.64rem;
            padding-left: 0.34rem;
            padding-right: 0.34rem;
            box-sizing: border-box;
            justify-content: space-between;
            border-bottom: 0.05rem dashed red;
            background-color: #fff;
            .le{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                >img{
                    vertical-align: middle;
                    width: 12%;
                }
            }
            .ri{
                display: flex;
                justify-content: flex-end;
                align-items: center;
                >img{
                    vertical-align: middle;
                    width: 16%;
                }
            }

        }
        .arrive_time{
            display: flex;
            width: 100%;
            height: 1.9rem;
            padding-left: 0.42rem;
            padding-right: 0.32rem;
            border-left: #3190e8 solid 0.08rem ;
            justify-content: space-between;
            margin-top: 0.18rem;
            margin-bottom: 0.18rem;
            background-color: #fff;
            .l{
                display: flex;
                align-items: center;
                font: size 0.32rem;
                font-weight: 900;
            }
            .r{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
                div:first-child{
                    margin-bottom: 0.2rem;
                    color:#3190e8;
                    font-size:0.28rem;

                }
                div:nth-child(2){
                    display: flex;
                    justify-content: flex-end;
                    padding: 2px;
                    padding-right: 2%;
                    width: 1.55rem;
                    color:white;
                    background-color: #3190e8;
                    border-radius: 5px;
                }
            }
        }
        .pay_time{
            display: flex;
            width: 100%;
            height: 1.96rem;
            background-color: #fff;
            padding-left: 0.34rem;
            padding-right: 0.38rem;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 0.18rem;

            div:first-child{
                flex:1;
                display: flex;
                align-items:center;
                justify-content: space-between;
                border-bottom: 1px solid #f5f5f5;
                span:first-child{
                    color:#666;
                    text-align: end;
                }
                span:nth-child(2){
                    color:#aaa;
                    text-align: end;
                }
                img{
                    width: 3%;
                    vertical-align: middle;
                }
            }
            .infomation{
                flex:1;
                display: flex;
                align-items:center;
                justify-content: space-between;
                font-size:0.22rem;
                color:#aaa
            }
        }
        .show{
            width: 100%;
            height: 1.3rem;
            background-color: #fff;
            border-bottom: 1px solid #f5f5f5;
            font-size:0.34rem;
            color:#333;
            padding-left: 0.31rem;
            display: flex;
            align-items:center;
            img{
                vertical-align: middle;
                width: 12%;
            }
        }
        .info{
            width: 100%;
            height: 3.64rem;
            background-color: #fff;
            padding-left: 0.34rem;
            padding-right: 0.38rem;
            >div{
                display: flex;
                justify-content: space-between;
                height: 0.68rem;
                align-items: center;
                .left{
                    
                }
                .right{
                    width: 1.7rem;
                    display: flex;
                    justify-content: space-between;
                }
            }

        }
        .sum{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 0.88rem;
            padding-left: 0.34rem;
            padding-right: 0.38rem;
            background-color: #fff;
            border-top: 1px solid #f5f5f5;
            align-items: center;
            border-bottom: 1px solid #f5f5f5;
            .left{

            }
            .right{

            }
        }
        .remark{            
            display: flex;
            flex-direction: column;
            padding-left: 0.34rem;
            padding-right: 0.38rem;
            width: 100%;
            height: 1.76rem;
            background-color: #fff;
            margin-top: 0.2rem;
            margin-bottom: 0.3rem;
            div:first-child{
                flex:1;
                display: flex;
                align-items:center;
                justify-content: space-between;
                border-bottom: 1px solid #f5f5f5;
                span:first-child{
                    width: 1.5rem;
                    color:#666;
                    text-align: end;
                }
                span:nth-child(2){
                    color:#aaa;
                    text-align: end;
                }
                img{
                    width: 3%;
                    vertical-align: middle;
                }
            }
            div:nth-child(2){
                flex:1;
                display: flex;
                align-items:center;
                justify-content: space-between;
                border-bottom: 1px solid #f5f5f5;
                span:first-child{
                    width: 1.5rem;
                    color:#666;
                    text-align: end;
                }
                span:nth-child(2){
                    color:#aaa;
                    text-align: end;
                }
                img{
                    width: 3%;
                    vertical-align: middle;
                }
            }
        }
    }
    footer{
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.94rem;
        background-color: #3d3d3f;
        z-index: 3000;
        .cart{
            height: 100%;
            display: flex;
            align-items: center;
            color: white;
            display: flex;
            width: 33%;
            padding-left: 0.32rem;
            .l{
            background-color: #3d3d3f;
            margin-top: -20px;
                width: 3.658em;
                height: 1.3rem;
                border: 3px solid #3d3d3f;
                border-radius:3rem !important;
                margin-left: 0.23rem;
                display: flex;
                justify-content: center;
                align-items: center;
            img{
                vertical-align: middle;
                width: 2.658em !important;
                height: 0.78rem !important;
            }
            }
            .rs{
            width: 3.058em;
            height: 1.08rem;
            div{
                height: 100%;
                width: 2rem;
                display: flex;
                align-items: center;
            }
            img{
                width: 1.058em;
                height: 1.08rem;
            }
            }
        }
        .onsubmit{
            color: white;
            display: flex;
            background-color: #56d176;
            justify-content: center;
            align-items: center;
            width: 33%;
        }
    }
}
</style>