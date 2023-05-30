<template>
  <div>
    <mt-header :title="'我的'" fixed :style="{fontWeight:700}">
        <div @click="back" slot="left">
            <mt-button icon="back" ></mt-button>
        </div>
    </mt-header>
    <main>
        <header>
            <div class="le">
                <div class="l">
                    <img :src="uploadURL + 'default.jpg'" alt="">
                </div>
                <div class="r">
                    <div>13596879653</div>
                    <div>暂无绑定手机号</div>
                </div>
            </div>
            <div class="ri">
                <div>
                    <img src="../assets/next.png" alt="">
                </div>
            </div>
        </header>
        <div class="showWindow">
            <div class="item item1">
                <div>0.00</div>
                <div>我的余额</div>
            </div>
            <div class="item item2">
                <div>0.3个</div>
                <div>我的优惠</div>
            </div>
            <div class="item item3">
                <div>0分</div>
                <div>我的积分</div>
            </div>
        </div>
        <div class="pay_time">
            <div>
                <div class="timer">
                    <span>我的订单</span>
                    <span> <img src="../assets/next-互动.png" alt=""></span>
                </div>
                <div class="timer">
                    <span>积分商城</span>
                    <span> <img src="../assets/next-互动.png" alt=""></span>
                </div>
                <div class="timer">
                    <span>饿了么会员卡</span>
                    <span> <img src="../assets/next-互动.png" alt=""></span>
                </div>
            </div>

            <div class="timer">
                <span>服务中心</span>
                <span> <img src="../assets/next-互动.png" alt=""></span>
            </div>
            <div class="timer">
                <span>下载饿了么APP</span>
                <span> <img src="../assets/next-互动.png" alt=""></span>
            </div>

        </div>
    </main>
    <my-footer></my-footer>
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
        back(){
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="scss">
main{
    margin-top: 0.8rem;
    header{
        display: flex;
        width: 100%;
        height: 1.9rem;
        background-color: #3190e8;
        padding-left: 0.3em;
        justify-content: space-between;
        align-items: center;
        .le{
            display: flex;
            .l{
                width: 1.12rem;
                height: 1.12rem;
                border-radius: 1.12rem;
                margin-right: 0.3rem;
                >img{
                    width: 1.12rem;
                    height: 1.12rem;
                    vertical-align: middle;
                    border-radius: 1.12rem;
                }
            }
            .r{
                color: #fff;
                font-weight: 700;
            }
        }
        .ri{
            width: 0.8rem;
            height: 0.8rem;
            img{
                vertical-align: middle;
                width: 0.5rem;
                height: 0.5rem;
            }
        }
    }
    .showWindow{
        display: flex;
        background-color: #fff;
        width: 100%;
        height: 1.68rem;
        margin-bottom: 0.16em;
        .item{
            flex:1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
        .item1{
            color:#ff9900;
        }
        .item2{
            color:#ff5f3e;
        }
        .item3{
            color:#6ac20b;
        }
        .item:nth-child(2){
            flex:1;
            border-left:1px #f1f1f1 solid;
            border-right:1px #f1f1f1 solid;
        }
    }
    .pay_time{
        display: flex;
        width: 100%;
        background-color: #fff;
        padding-left: 0.34rem;
        padding-right: 0.38rem;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 0.18rem;
        .timer{
            flex:1;
            display: flex;
            align-items:center;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;

            span:first-child{
                color:#666;
                text-align: end;
                height: 0.7rem !important;
                line-height: 0.7rem;
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
        .timer:nth-child(4){
            flex:1;
            display: flex;
            align-items:center;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;
            border-top:1px solid #f1f1f1;
            span:first-child{
                color:#666;
                text-align: end;
                height: 0.7rem !important;
                line-height: 0.7rem;
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
}
</style>