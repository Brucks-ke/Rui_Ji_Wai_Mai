<template>
  <div class="box">
    <mt-header :title="'搜索'" fixed>
        <router-link to="/" slot="left">
            <i class="mintui mintui-back"></i>
        </router-link>
    </mt-header>
    <div class="search">
        <input type="text" placeholder="请输入商家或美食名称">
        &nbsp;
        <mt-button type="primary" size="small">提交</mt-button>
    </div>
    
    <!-- 底部 -->
    <my-footer></my-footer>
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

  </div>
</template>

<script>
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
    created(){
        this.$store.state.nowSelect="2"
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
    }
}
</script>

<style lang="scss">
.link{
    height: 1rem;
}
.mint-tabbar > .mint-tab-item.is-selected{
    background-color: #fafafa !important;
}
.search{
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    margin-top: 0.88rem ;
    height: 1rem;
    input{
        width: 70%;
        height: 2.57em;
        background-color: #f2f2f2;
        outline: none;
        padding-left: 0.07rem;
        font-size: .25rem;
        font-weight: 900;
        color: #333;
        border: 0.025rem solid #e4e4e4
    }

}
html{
    background: #f5f5f5;
}
</style>