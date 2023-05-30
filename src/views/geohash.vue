<template>
    <div class="genhash">
        <!-- 头部 -->
        <div class="head">
            <div class="top">
                <div>
                    <img src="../assets/4.webp" alt="">
                </div>
                <div class="div1">
                    <span class="title">小笼包</span>
                    <span>商家配送/分钟送达/配送费¥5</span>
                    <span>公告:xxxx</span>
                </div>
                <div class="div2">
                    <img src="../assets/向右箭头.png" alt="">
                </div>
            </div>
            <div class="bottom">
                <div class="jian">
                    <img src="../assets/减.png" alt="">
                    满30减5,满60减8(APP专享)
                </div>
                <div class="sale">
                    1个活动
                </div>
                <div>
                    <img src="../assets/向右箭头.png" alt="">
                </div>

            </div>
        </div>
        <!-- 导航 -->
        <div class="nav">
            <span class="active">商品</span>
            <span>评价</span>
        </div>

        <!-- 商品展示 -->
        <div class="content">
            <!-- 左边部分 : 商品种类-->
            <div class="left">
                <span class="active">招牌</span>
                <span>饮料</span>
                <span>粥</span>
                <span>生煎</span>
                <span>小笼包</span>
            </div>
            <!-- 右边部分 : 商品展示 -->
            <div class="right">

                <!-- 热销 -->
                <div class="hot">
                    <span class="l">热销榜</span>
                    <span class="r">...</span>
                </div>
                <!-- 意见商品展示 -->
                <div class="tips">

                    <div class="pic">
                        <img src="../assets/4.webp" alt="">
                    </div>

                    <div class="center">
                        <span class="sp">小笼包套餐</span>
                        <span class="sp1">好吃又实惠</span>
                        <span>月售481份 好评率74%</span>
                        <span class="sp3">3213</span>
                        <span class="sp4">¥20</span>
                    </div>

                    <div class="add">
                        <div class="zhaopai">招牌</div>
                        <div class="select">选规格</div>
                    </div>

                </div>
            </div>

        </div>



        <!-- 底部 -->
        <div class="foot">
            <div class="gwc">
                <img src="../assets/购物车.png" alt="">
            </div>
            <div>
                <span >¥0.00</span>
                <span class="sendPrice">配送费¥5</span>
            </div>
            <div class="chajia">
                还差¥20起送
            </div>
        </div>


    </div>

</template>

<script>

</script>

<style lang="scss">
.genhash{
    // 头部
    .head{
        width: 100%;
        height: 2.4rem;
        background-color: rgb(61, 135, 135);
        color: white;
        font-size: 0.2rem;
        padding: 0.2rem;
        .top{
            
            display: flex;
            justify-content: space-between;
            >div{
                height: 1.4rem;
                img{
                    width: 1.4rem;
                    height: 1.4rem;
                    border-radius: 0.1rem;
                } 
            }
            .div1{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-right: 1.8rem;
                .title{
                    font-weight: bold;
                    font-size: 0.4rem;
                }
                span{
                    display: inline-block;
                }
            }
            .div2{
                img{
                    width: 0.35rem;
                    height: 0.35rem;
                    margin-top: 0.8rem;
                }
               
            }

        }
        .bottom{
            height: 0.4rem;
            display: flex;
            justify-content: space-between;
            align-items: end; 
            margin-top: 0.2rem;
            .jian{
                img{
                    width: 0.4rem;
                    height: 0.4rem;
                }
            }
            >div{
                height: 0.4rem;
                img{
                    width: 0.28rem;
                    height: 0.28rem;
                }
            }
            .sale{
                margin-left:2.4rem;
            }
        }
    }
    // 导航
    .nav{
        height: 1rem;
        border-bottom: 0.01rem #eee solid;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 0.3rem;
        span{
            width: 0.8rem;
            height: 0.6rem;
            // background-color: cornflowerblue;
            display: inline-block;
            line-height: 0.6rem;
            text-align: center;   
        }
        .active{
            color: cornflowerblue;
            border-bottom: 0.08rem solid cornflowerblue;
        }
    }
    // 商品展示
    .content{
        display: flex;
        .left{
            width: 25%;
            height: 8rem;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: column;
            color: rgb(102, 100, 100);
            font-size: 0.26rem;
            .active{
                background-color: white;
            }
            span{
                display: inline-block;
                border-bottom: 0.01rem #e6e4e4 solid;
                height:1.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .right{
            width: 75%;
            height: 8rem;
            .hot{
                width: 100%;
                height: 1rem;
                background-color: #f5f5f5;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.2rem;
                .l{
                    font-size: 0.3rem;
                    font-weight: bold;
                    color: #5f5d5d;
                }
                .r{
                    color: gray;
                }
            }

            .tips{
                height: 2.8rem;
                // background-color: aqua;
                padding: 0.2rem;
                display: flex;  
                border-bottom: 0.01rem #eee solid;
                .pic{
                    img{
                        width: 1.2rem;
                        height: 1.2rem;
                    }
                }
                .center{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 0.24rem;
                    color: #333;
                    .sp{
                        font-size: 0.3rem;
                        font-weight:600;
                    }
                    .sp1{
                        color: #8c8888;

                    }
                    .sp3{
                        width: 0.6rem;
                        height: 0.2rem;
                        font-size: 0.1rem;
                        display: inline-block;
                        border: 0.01rem orangered solid;
                        color:orangered ;
                        border-radius: 0.1rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0.1rem;
                    }
                    .sp4{
                        color:orangered ;
                        font-weight:bold;
                        font-size: 0.3rem;
                    }
                }
                .add{
                    // background-color: aquamarine;
                    margin-left: 0.9rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .zhaopai{
                        width: 0.6rem;
                        border: 0.01rem orangered solid;
                        color:orangered ;
                        border-radius: 0.2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 0.5rem;
                    }
                    .select{
                        width:1.2rem;
                        height: 0.5rem;
                        background-color: #3190e8;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 0.1rem;
                    }
                }
            }
        }

    }


    // 底部
    .foot{
        width: 100%;
        height: 1rem;
        background-color: #3d3d3f;
        position: fixed;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-size: 0.32rem;
        font-weight: bold;
        padding-left: 1.6rem;
        >div{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .sendPrice{
                font-size:0.2rem;
                font-weight: 200;
            }
        }
        .gwc{
            width: 1rem;
            height: 1rem;
            background-color: #3d3d3f;
            border-radius: 1rem;
            position: fixed;
            bottom: 0.2rem;
            left: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 0.02rem #4d4b4b solid;
            img{
                width: 0.6rem;
                height: 0.6rem;
              
               
            }
        }
        .chajia{
            width: 2.4rem;
            height: 100%;
            background-color: #535356;
            display: flex;
            justify-content:center;
            align-items: center;
        }
    }
    
}
</style>