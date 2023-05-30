<template>
  <div class="msite">
    <mt-header :title="$route.query.name" fixed>
        <router-link :to="{path:'/search',query:{name:$route.query.name}}" slot="left">
            <mt-button icon="search"></mt-button>
        </router-link>
        <div icon="more" class="more" slot="right">
            <router-link to="/login" class="white">登录</router-link>&nbsp; |
            <router-link to="/reg" class="white">注册</router-link>
        </div>

    </mt-header>



    <mt-swipe class="nav" :auto="0">
        <mt-swipe-item class="item">
            <router-link to="/" v-for="(item,index) in nav[0]" :key="index">
                <img :src="item.pic" alt="">
                <span>{{item.name}}</span>
            </router-link>
        </mt-swipe-item>
        <mt-swipe-item class="item">
            <router-link to="/" v-for="(item,index) in nav[1]" :key="index">
                <img :src="item.pic" alt="">
                <span>{{item.name}}</span>
            </router-link>
        </mt-swipe-item>
    </mt-swipe>

    <!-- 商品列表头部 -->
    <div class="top">
        <img src="../assets/dianpu.png" alt="">
        &nbsp;
        <span>附近商家</span>
    </div>
    <!-- 每件商品 ，几件就for循环几个 -->
    <one-shop :info="shopList" @up="getData" @click="toDetails"></one-shop>

    <!-- <mt-tabbar v-model="$store.state.nowSelect">
        <mt-tab-item :id="tab1">
            <img slot="icon" :src="$store.state.nowSelect===tab1?wm2:wm" @click="waimai">
            外卖
        </mt-tab-item>
        <mt-tab-item :id="tab2">
            <img slot="icon" :src="$store.state.nowSelect===tab2?ss2:ss" @click="tiao">
            搜索
        </mt-tab-item>
        <mt-tab-item :id="tab3">
            <img slot="icon" :src="$store.state.nowSelect===tab3?dd2:dd" @click="order">
            订单
        </mt-tab-item>
        <mt-tab-item :id="tab4">
            <img slot="icon" :src="$store.state.nowSelect===tab4?wd2:wd" @click="center">
            我的
        </mt-tab-item>
    </mt-tabbar> -->
    <!-- 底部 -->
    <my-footer></my-footer>
  </div>
</template>

<script>
import axios from "../utils/http.js"
export default {
    data(){
        let wm = require("../assets/wm.png")
        let wm2 = require("../assets/wm2.png")
        let ss = require("../assets/ss.png")
        let ss2 = require("../assets/ss2.png")
        let dd = require("../assets/dd.png")
        let dd2 = require("../assets/dd2.png")
        let wd = require("../assets/wd.png")
        let wd2 = require("../assets/wd2.png")

        return{
            nav:[
                [
                    {name:"商超便利",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"美食",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"简餐",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"新店特惠",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"准时达",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"预订早餐",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"土豪推荐",pic:require("../assets/1.jpeg"),url:"/xxx"},
                    {name:"川湘菜",pic:require("../assets/1.jpeg"),url:"/xxx"},
                ],
                [
                    {name:"麻辣烫",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"},
                    {name:"包子粥店",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"},
                    {name:"鲜花蛋糕",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"},
                    {name:"日韩料理",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"},
                    {name:"果蔬生鲜",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"},
                    {name:"汉堡薯条",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"},
                    {name:"披萨意面",pic:"https://fuss10.elemecdn.com/2/35/696aa5cf9820adada9b11a3d14bf5jpeg.jpeg",url:"/xxx"}
                ]
            ],
            shopList:[],
            wm,
            wm2,
            ss,
            ss2,
            dd,
            dd2,
            wd,
            wd2,
            selected:"",
            tab1:"1",
            tab2:"2",
            tab3:"3",
            tab4:"4",

        }
    },
    async created(){
        this.$store.state.nowSelect="1";
        // 发送请求找到当前所有商家
        this.getData(1)
    },
    methods:{
        waimai(){
            this.$store.state.nowSelect=this.tab1
            this.$router.push({path:"/msite",query:{
                name:this.$route.query.name,
                lng:this.$route.query.lng,
                lat:this.$route.query.lat,

            }})
        },
        tiao(){
            this.$store.state.nowSelect=this.tab2
            this.$router.push({path:"/search",query:{
                name:this.$route.query.name,
                lng:this.$route.query.lng,
                lat:this.$route.query.lat,
            }})
        },
        order(){
            this.$store.state.nowSelect=this.tab3
            this.$router.push({path:"/order",query:{
                name:this.$route.query.name,
                lng:this.$route.query.lng,
                lat:this.$route.query.lat,

            }})
        },
        center(){
            this.$store.state.nowSelect=this.tab4
            this.$router.push({path:"/profile",query:{
                name:this.$route.query.name,
                lng:this.$route.query.lng,
                lat:this.$route.query.lat,

            }})
        },
        toDetails(){
            console.log("a1");
        },        
        async getData(val){
            let currentPage = 1
            if(val === 1){
                this.shopList = []
            }else{
                console.log(val);
                currentPage = +val
            }



            let shopList = await axios.get("/server/shop/allShop",{params:{
                onePageCoun:1,
                currentPage:currentPage
            }})
            console.log(shopList);
            // 如果val传输的不是 false 就清空

            

            // 将商家循环请求算出 距离
            shopList.forEach(async e => {
                // 计算距离接口
                let distance = await axios.get("/web/position/distance",{params:{
                    origin:this.$route.query.lat + "," + this.$route.query.lng,
                    destination:e.address.lat+","+e.address.lng
                }
                })
                console.log(distance);
                e.distance = distance.distance
                e.duration = distance.duration
                this.shopList.push(e)

            });

            // 延时加载，防止同步比异步快，导致没拿到数据
            // /**  重要 */
            // setTimeout(()=>{
            //     this.shopList = shopList
            // },50)
        }
    }
}
</script>

<style lang="scss" scoped>
html{
    background: #f5f5f5 !important;
}
.msite{
    .mt-swipe{
        margin-top: 0.91rem;

    }
    .nav{
        margin-top: 0.78rem;
        height: 4rem;
        background-color: #fff;
        margin-bottom: 0.22rem;
        .item{
            display: flex;
            flex-wrap: wrap;

            a{
                width: 25%;
                height: 2rem;
                display: block;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                img{
                    
                    width: 60% !important;
                }
                span{
                    display: block;
                }
            }
        }
    }
    .more{
        color: wheat;
        a{
            color:white !important;
        }

    }
    .mint-tabbar > .mint-tab-item.is-selected{
        background-color: #fafafa !important;
    }

    .a{
        position: fixed;
        width: 100px;
        height: 100px;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin: auto;
    }
}
.top{
    width: 100%;
    height: 0.5rem;
    padding-left: 0.2rem;
    span{
        display: inline-block;
        height: 0.32rem;
        line-height: 0.32rem;
    }
    img{
        vertical-align: middle;
        height: 60%;
    }
}
.content {
    background-color: #fff;
    h2{
        font-size: 0.29rem !important;
        color: #999;
    }
    .main {
      .item {
        background-color: #fff;
        border-bottom: 0.01rem solid #ccc;
        padding:  0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // background: pink;
        > div:nth-child(1) {
          img {
            height: 1.2rem;
          }
        }
        > div:nth-child(2) {
            height: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3 {

            font-size: 0.28rem;
            span {
                font-size: 0.2rem;
              background: #ffd930;
              margin-right: 0.04rem;
            }
          }
          p{
            font-size: 0.28rem;
          }
        }
        > div:nth-child(3) {
            height: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          ul {
            display: flex;
            li {
                font-size: 0.20rem;
              color: #999;
              margin-left: 0.05rem;
            }
          }
          p {
            b {
                font-size: 0.16rem;
              background-color: #3190e8;
              border: 0.025rem solid #3190e8;
              color: #fff;
            }
            span {
                font-size: 0.16rem;
              color: #3190e8;
              border: 0.025rem solid #3190e8;
            }
          }
          h3{
            font-size: 0.24rem;
            color: #999;
            span{
                font-size: 0.24rem;
                color: #3190e8;
            }
          }
        }
      }
    }
}
</style>

