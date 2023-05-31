<template>
    <div class="order">
        <mt-header title="订单列表" fixed>
            <div @click="$router.back()" slot="left">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>
        <!--已购商品列表 -->
        <div class="goodsOrder">
            <!-- 一家店铺 -->
            <div class="oneGoodsOrder"  v-for="(item) in allOrderData" :key="item._id">
                <!-- 左图 -->
                <div class="left">
                    <img :src="uploadURL + item.shop.pic" alt="">
                </div>
                <!-- 右商品信息 -->
                <div class="right" >
                    <div class="orderShop" @click="$router.push('/order/orderDetail')">
                        <div class="orderHeader">
                            <h3>{{item.shop.name}}</h3>
                            <p class="orderTime">{{item.createTime}}</p>
                        </div>  
                        <div class="orderStatus">{{item.status}}</div>
                    </div>
                    <div class="orderGoods" v-for="i in item.food" :key="i._id">
                        <p>{{item.food[0].name}} &nbsp; 等{{item.food.length}}件商品</p>
                        <div class="price">￥{{
                            item.food.reduce((sum,e)=>{
                                return sum+= e.price * e.count
                            },0)
                        }}
                        </div>
                    </div>
                    <div class="oneAgain">
                        <span>{{item.rest}}</span>
                        <span>再来一单</span>
                    </div>
                </div>
            </div>
            <div class="line"></div>
        </div>



        <div>
            <my-footer></my-footer>
        </div>
            <router-view></router-view>
    </div>
</template>


<script>
import axios from 'axios';


export default{
    data() {
        return{
            allOrderData:[],

        }
    },
    created(){
        this.getAllOrder()
    },
    methods:{
        detailes(){
            console.log(1);
            this.$router.push("/order/orderDetail")
        },
        async getAllOrder(){
            // 如果是登陆状态
            if(this.$store.state.user.user && localStorage.getItem("user")){
                let user = localStorage.getItem("user")
                let result = await axios.get("/web/account/getAllOrder",{
                    params:{
                        user:user
                    }
                })
                console.log(result);
                setInterval(()=>{
                    result.forEach(e=>{
                        let now = +new Date()  //1
                        let create = new Date(e.createTime) //2.
                        let end = new Date(create).getTime() + (1000*60*15)//3
                        // 倒计时90分钟

                        if(end>now && e.status === "待支付"){
                                let times = (end - now)/1000
                                let hour1 = times / 60 / 60
                                hour1 = parseInt(hour1)
                                hour1< 10?hour1 ="0" + hour1:hour1 = hour1
                                let min1 = times / 60 % 60
                                min1 = parseInt(min1)
                                min1 < 10 ?min1 =  "0" + min1 :min1
                                let sec1 = times % 60
                                sec1 = parseInt(sec1)
                                sec1 < 10 ? sec1 = "0" + sec1 :sec1

                                e.rest = `去支付，还剩${hour1}:${min1}:${sec1}`
                        }else{
                            e.rest = "订单已过期"
                        }

                        if(e.status === "已支付"){
                            e.rest = "已支付"
                        }

                    })
                    this.allOrderData = result
                },1000)

                
            }
        },

    },
    beforeRouteLeave(to, from, next) {
        // 判断是否切换到子页面
        if (to.name === 'orderDetail') {
        // 销毁父组件
        this.$destroy();
        }
        next();
    },

}
</script>


<style lang="scss" scoped>
.order {
    .goodsOrder {
        margin-top: 0.9rem;
        height: 11rem;
        overflow: scroll;
        .oneGoodsOrder {
            background-color: #fff;
            padding: 0.2rem;
            display: flex;
            margin-bottom: 0.2rem;
            .left {
                margin-right: 0.2rem;
                color: #333;

                img {
                    width: 1rem;
                    height: 1rem;
                }
            }

            .right {
                flex: 1;
                font-size: 0.3rem;
                color: #333;

                .orderShop {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 0.025rem solid #f5f5f5;
                    .orderHeader {
                        p {
                            color: #999;
                        }
                    }
                }

                .orderGoods {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 0.025rem solid #f5f5f5;
                    .price {
                        color: orangered;
                        font-weight: bold;
                    }
                }

                .oneAgain {
                    display: flex;
                    justify-content: flex-end;
                    color: #3190e8;
                    span {
                        width: 1.6rem;
                        height: 0.4rem;
                        text-align: center;
                        line-height: 0.35rem;
                        border-radius: 0.15rem;
                        border: 1px solid #3190e8;
                    }
                }

                &>* {
                    margin-bottom: 0.4rem;
                }
            }
        }
    }
    .line {
        height: 0.22rem;
        background-color: #eee;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
}
</style>