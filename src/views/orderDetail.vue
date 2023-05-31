<template>
  <div class="orderdetail">
    <mt-header title="订单11111">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
     <!-- 待支付 -->
     <div class="topay">
            <div><img src="../../assets/6.webp" alt=""></div>
            <div>等待支付</div>
            <div class="again">再来一单</div>
        </div>

        <div class="line"></div>

          <!-- 购买商品详情 -->
          <div class="details" >
            <!-- 商品名称 -->
            <div class="goodsName" >
                <img src="../../assets/2.jpeg" alt="">
                <span>111</span>
                <div class="jt">
                    <img src="../../assets/you.png" alt="">
                </div>
                
            </div>
            <!-- 明细-->
            <div class="box" >
                <div>
                    <span>1111</span>
                    <div>
                        <span class="count">x111</span>
                        <span class="sp1">¥111</span>
                    </div>
                </div>
                <div>
                    <span>2222</span>
                    <div>
                        <span class="count">x111</span>
                        <span class="sp1">¥111</span>
                    </div>
                </div>
                <div>
                    <span>配送费</span>
                    <span>¥1</span>
                </div>
                <div>
                    <span class="sp">实付¥1111.00</span>
                </div>
            </div>


        </div>

        <div class="line"></div>

         <!-- 配送信息 -->
         <div class="dingdan">
            <div class="top">
                <h4>配送信息</h4>
                
            </div>
            <div class="bottom">
                <div>配送时间:尽快送达</div>
                <div>送货地址:2311111</div>
                <div>配送方式:蜂鸟专送</div>
            </div>
         </div>

         <div class="line"></div>

          <!-- 订单信息 -->
          <div class="dingdan dd">
            <div class="top">
                <h4>订单信息</h4>
                
            </div>
            <div class="bottom">
                <div>订单号:123456</div>
                <div>支付方式:在线支付</div>
                <div>下单时间:2023-05-30 19:13</div>
            </div>
         </div>

         <div class="line"></div>
    <my-footer></my-footer>
  </div>
</template>

<style lang="scss">
.orderdetail {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #fff;
  overflow: scroll;
  header {
    height: 0.6rem;
    h1 {
      font-size: 0.28rem;
    }
  }
  // 待支付
  .topay{
        height: 3.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        // background-color: aqua;
        align-items: center;
        margin-top: 0.6rem;
        font-size: 0.3rem;
        color: #333;
        img{
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 1.4rem;
            border: 2px solid cornflowerblue;
        }
        .again{
            width: 1.2rem;
            height: 0.4rem;
            border: 2px solid cornflowerblue;
            border-radius: 0.06rem;
            color: cornflowerblue;
            font-size: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;

        }
    }
    // 间隙
    .line{
        width: 100%;
        height: 0.3rem;
        background-color: #eee;
    }

    // 购买商品详情 
    .details{
        
        .goodsName{
            padding:0.1rem 0.3rem;
            font-size: 0.26rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 0.01rem solid #eee;
            img{
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.3rem;
            }
            .jt{
                img{
                    width: 0.3rem;
                    height: 0.3rem;
                    margin-left: 5.4rem;
                }
            }
        }
        .box{
            font-size: 0.24rem;
            color: #5f5e5e;
            >div{
                padding: 0.3rem;
                height: 0.8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: #eee solid 0.01rem;
                .sp1{
                    margin-left: 1rem;
                }
                .sp{
                    color: rgb(247, 93, 36);
                    font-weight: bolder;
                }
                .count{
                    font-size: 0.2rem;
                    color: #bbb;
                }
            }
            >:last-child{
                height: 0.8rem;
                justify-content: end;
                border-top: #eee solid 0.01rem;
            }
        }
    }

    // 配送信息
    .dingdan{
        width: 100%;
        height: 3.2rem;
        // background-color: aqua;
        .top{
            padding: 0.3rem;
            height: 0.8rem;
            border-bottom: 1px #ccc solid;
            color: #333;
            h4{
                font-size: 0.28rem;
                font-weight: 500;
            }
        }
        .bottom{
            height: 3.2rem;
            display: flex;
            flex-direction: column;
            >div{
                padding: 0.3rem;
                height: 0.8rem;
                display: flex;
                align-items: center;
                font-size: 0.22rem;
                color: #5f5e5e;
            }
        }
        
    }
    .dd{
        margin-bottom: 1rem;
    }
}
</style>
