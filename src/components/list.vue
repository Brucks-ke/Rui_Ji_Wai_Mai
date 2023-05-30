<template>
    <div class="shopList">
        <!-- 头部 -->

        <!-- 商品内容 -->
        <!-- 上拉方法 -->
        <!-- :bottom-method="loadBottom"  上拉的时候会触发的方法 -->
        <!-- 上拉方法 -->
        <!-- :bottom-all-loaded  是否现在拉倒底部的状态 -->
        <!-- 上拉方法 -->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" >
            <div class="tips" v-for="(item,index) in info" :key="index" @click="$router.push({path:'shop',query:{id:item._id,lng:$route.query.lng,lat:$route.query.lat}})">
                <div class="left">
                    <img :src="uploadURL + item.pic" alt="">
                </div>
    
                <div class="center">
                    <div>
                        <span class="pic">品牌</span>
                        <span class="title">{{item.name}}</span>
                    </div>
                    <div>
                        <img src="../assets/star5.png" alt="">
                        <span class="score">5</span>
                        <span class="sold">月销100单</span>
                    </div>
                    <div>
                        <span>¥{{item.ShippingCash}}起送/配送费约{{item.dispatching[0]}}元</span>
                    </div>
                </div>
                <div class="right">
                    <div class="div1">
                        <span v-if="item.trait.safe">保</span>
                        <span v-if="item.trait.inTime">准</span>
                        <span v-if="item.trait.invoice">票</span>
                    </div>
                    <div>
                        <span class="sp1" v-if="item.trait.express">蜂鸟专送</span>
                        <span class="sp2" v-if="item.trait.inTime">准时达</span>
                    </div>
                    <div>
                        <span>{{item.distance|formatDistance}}/</span>
                        <span class="t">{{item.duration|formatTime}}</span>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
export default {
    // props:[{
    //     info:info
    // }]
    data(){
        return {
            allLoaded:false,
            i:1
        }
    },
    props:["info"],
    filters:{
        formatDistance(val){
            if(val<1000){
                return val + "米"
            }else{
                return val/2000 + "公里"
            }
        },
        formatTime(val){
            let hours = Math.floor(val/60/60)
            let minutes = Math.floor(val/60%60)
            let second = Math.floor(val%60)
            let str = ""
            if(hours){
                str += hours + "时"
            }
            if(minutes){
                str += minutes + "分"
            }
            if(second){
                str += second + "秒"
            }
            return str
        }
    },
    methods:{
        //下拉之后触发的方法
        loadTop() {
        // load more data
            this.$emit("up",1)
            this.$refs.loadmore.onTopLoaded();
        },//上拉之后触发的方法
        loadBottom() {
            this.i++
            // 传输0让他不要清空
            this.$emit("up",this.i)
            // this.allLoaded = true;// if all data are loaded
            this.$refs.loadmore.onBottomLoaded();
        }
    }
}
</script>

<style lang="scss" scoped>
.shopList{
    .mint-loadmore{
        height: 4rem;
        overflow: scroll !important;
    }
    height: 5rem;
    overflow: scroll;
    .tips{
        width: 100%;
        height: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666464;;
        padding:0.4rem 0.2rem;
        // padding-bottom: 0.4rem;
        border-bottom: 1px #e8e5e5 solid;
        .left{

            img{
                width:1.6rem;
                height: 1.6rem;
            }
        }
        .center{
            height: 1.6rem;
            display: flex;
            flex-direction: column;  
            justify-content: space-between;          
            >div{
                .pic{
                    width: 0.8rem;
                    display: inline-block;
                    font-size: 0.22rem;
                    text-align: center;
                    font-weight: bold;
                    line-height: 0.22rem;
                    color: #333;
                    background-color: #ffd930;
                    padding:  0.1rem;
                    border-radius: 0.1rem;
                    margin-right: 0.2rem;
                }
                .title{
                    font-size: 0.18rem;
                    font-weight: bold;
                    color: #333;
                }
                .score{
                    color: orange;
                    font-size: 0.28rem;
                }
                .sold{
                    font-size: 0.2rem;
                }
            }
            >div:nth-child(2){
                img{
                    width:50%;

                }
            }
        }
        .right{
            width: 2rem;
            height: 1.6rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            div{
                display: flex;
                justify-content: flex-end;
                .sp1{
                    // width: 0.8rem;
                    font-size: 0.1rem;
                    color: white;
                    background-color: cornflowerblue;
                    text-align: center;
                    padding: 0.01rem;
                    border-radius: 0.06rem;
                }
                .sp2{
                    border: 1px cornflowerblue solid;
                    border-radius: 0.06rem;
                    font-size: 0.1rem;
                    padding: 0.01rem;
                    color:cornflowerblue ;
                    margin-left: 0.1rem;
                }
                .t{
                    color:cornflowerblue ;
                }
            }
            .div1{
                span{
                    width: 0.3rem;
                    font-size: 0.2rem;
                    text-align: center;
                    border: 1px #ccc solid;
                    margin-right: 0.1rem;
                }
            
            }
            div:nth-child(3){
                font-size:0.12rem;
            }
        }

    }
}



</style>