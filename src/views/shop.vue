<template>
  <div>
    <div class="head" :style="{backgroundColor:'green'}">
    <!-- 上一步 -->
      <div class="prev" @click="$router.back()">
        <img src="../assets/prev.png" alt="">
      </div>
      <!-- 下一步 -->
      <div class="next">
        <img src="../assets/next.png" alt="">
      </div>
      <div class="picture">
        <img :src="uploadURL + shopInfo.pic" alt="aaaaa">
      </div>
      <div class="content">
        <h4>{{shopInfo.name}}</h4>
        <div><span>商家配送</span>/<span>分钟到达</span>/<span v-text="'配送费￥'+shopInfo.dispatching"></span></div>
        <div>公告：电话{{shopInfo.tel}}</div>
      </div>
    </div>
    <!-- tab评价系统 -->
    <div class="assess">
      <div>
        <span  class="activing">商品</span>
      </div>  
      <div>
        <span >
          <router-link :to="{path:'/msite',query:{
            lng:$route.query.lng,
            lat:$route.query.lat,
          }}">
            评价
          </router-link>
        </span>
      </div>
    </div>
    <!-- 评价系统 -->
    <!-- 内容 -->
    <div class="content">
      <aside>
        <div v-for="(item,index) in items" :key="index" @click="silder(index)" :class="index === activeIndex?'active':''">
          {{item.name}}
        </div>
      </aside>
      <main ref="main">
        <div class="right" v-for="(item,index) in items" :key="index" ref="right">
          <div class="hot" ref="hot">
              <span class="l">{{item.name}}</span>
              <span class="r">...</span>
          </div>
          <!-- 意见商品展示 -->
          <div class="tips" v-for="(i,j) in item.food" :key="j" ref="itemer">

              <div class="pic" v-if="i.pic">
                  <img :src="uploadURL + i.pic" alt="">
              </div>

              <div class="center">
                  <span class="sp">{{i.name}}</span>
                  <span class="sp1">{{i.detailes}}</span>
                  <span>月售481份 好评率74%</span>
                  <span class="sp3">3213</span>
                  <span class="sp4">¥{{i.price}}</span>
              </div>

              <div class="add">
                  <div class="zhaopai" v-if="i.trait.includes('招牌')">招牌</div>
                  <div class="zhaopai" v-if="i.trait.includes('新品')">新品</div>
                  <number v-model="i.count" @add="addCount($event,i)" @reduce="reduceCount(i)" @change="val=>i.count = val"></number>
              </div>

          </div>
        </div>
      </main>
    </div>
    <!-- 内容 -->
    <!-- 弹窗 -->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width: 100% !important;height:5rem;margin-bottom: 0.93rem !important;">
      <div class="pop" >
        <div class="title"  @click="clear">
          <div>购物车</div>
          <div>
            <img src="../assets/delete.png" alt="">
            清空
          </div>
        </div>
        <div class="content">
          <!-- 循环已选择的 -->
          <div v-for="(item,index) in selectedData" :key="index" class="item"> 
            <div class="left" v-if="item.count>0">
              <div>{{item.name}}</div>
              <div>￥{{item.price}}</div>
            </div>
            <div class="right">
              <number v-model="item.count"></number>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <!-- 弹窗 -->

    <!-- 页脚 -->
    <footer>
      <div class="cart">
        <div class="l" @click="popupVisible = !popupVisible" :style="{background:blueFlag?'#3190e8':''}" 
           :class="cartFlag?'cartActive':''"
           ref="car"
          >
          <img src="../assets/Cart.png" alt="" >
        </div>
        <div class="rs" @click="popupVisible = !popupVisible">
          <div>￥{{countPrice}}.00</div>
          <div v-text="'配送费￥'+shopInfo.dispatching"></div>
        </div>
      </div>
      <div class="onsubmit" v-text="countPrice>=+shopInfo.ShippingCash?'去结算':'还差￥'+ (shopInfo.ShippingCash - countPrice) +'元起送'" :style="{background:countPrice>=+shopInfo.ShippingCash?'#4cd964':'#535356'}" @click='linkTo'>
        
      </div>
    </footer>
    <!-- 页脚 -->

    <!-- 小球 -->
    <transition @before-enter="before" @enter="enter" @after-leave="after">
      <div class="ball" v-if="ballFlag">
        <span></span>
      </div>
    </transition>
    <!-- 小球 -->
  </div>
</template>

<script>
import number from '@/components/number.vue'
import axios from "../utils/http"
export default {
  components: { number },
  async created(){ 
    this.getData()
    this.getShopInfo()
  },
  data(){
    return {
      items:[],
      shopInfo:{},
      distance:[],
      timer:null,
      activeIndex:0,
      // 五、1 定义一个存储数据的数据
      selectedData:[],
      // 开关值 弹窗出不出来
      popupVisible:false,
      // 小球的状态
      ballFlag:false,
      jiahao:null,
      cartFlag:false,
      blueFlag:false
    }
  },
  updated(){
    // this.$refs获取不到
    // 只有在网页上所有元素全部刷新出来的时候才可以获取到
    // 所有加上onload事件
    //父盒子必须要加上定位，才能获取到与父盒子的ScollTop值

      let main = window.document.querySelector("main")
      for (let i = 0; i < main.children.length; i++) {
        this.distance.push(main.children[i].offsetTop)
      }
      


    // this.$refs.main.onscroll = (e,index)=>{
    //   // 循环判断
    //   // 当 right滚动的时候，需要直到它的滚动距离， 根据当前的距离 
    //   // 改this.activeIndex
    //   if(e.target.scrollTop >0 && e.target.scrollTop < this.distance[1]){
    //     this.activeIndex = 0
    //   }else if(e.target.scrollTop >this.distance[1] && e.target.scrollTop < this.distance[2]){
    //     this.activeIndex = 1
    //   }
    // }


    
  },
  methods:{
    async getData(){
      let res = await axios.get("/goods/paramsAll",{params:{
        shopId:this.$route.query.id
      }})
      
      let arr = []
      // 创建一个储存分类的数组



      let xinpin = []
      let zhaopai = []

      /**找出各种分类 */
      res.forEach(e => {
        e.count = 0
        /**找出招牌和新品 */
        if(e.trait.includes("招牌")){
          xinpin.push(e)
        }
        if(e.trait.includes("新品")){
          zhaopai.push(e)
        }



        // 先找arr中是否有这一项，没有就加上这一项的名字和数据
        // 有的话就直接数据里面直接往后 添加
        let flag = arr.find(i=>i.name==e.categrey) 

                  /** 如果存在的话 有的话就直接数据里面直接往后 添加 */
        if(flag){
          flag.food.push(e)
        }else{
        /** 如果没有不存在 就往里面创建 */
          arr.push({
            name:e.categrey,
            food:[e]
          })
        }
      });

      // 如果有就添加，如果没有就不添加
      if(xinpin.length){
        arr.unshift({
          name:"新品",
          food:xinpin
        })
      }
      if(zhaopai.length){
        arr.unshift({
          name:"招牌",
          food:zhaopai
        })
      }
      this.items = arr
    },
    async getShopInfo(){
      let res = await axios.get("/server/shop/getShopOne",{
        params:{
          shopId:this.$route.query.id
        }
      })
      this.shopInfo = res
    },
    async silder(index){
      // 点击让索引对应
      this.activeIndex = index
      // 替换显示
      let i = index
      // 获取目标值
      let target = this.distance[i]
      // 打印目标值
      // 直接清空定时器
      clearInterval(this.timer)
      // 定时器开启
      this.timer = setInterval(()=>{
          // offsetTop   //步长变化而变化
          let step = (target - document.querySelector("main").scrollTop)/8
          // 第一次执行  setp = (800-0)/8 = 100
          // 第一次执行  setp = (800-100)/8 = 92
          // 第一次执行  setp = (800-192)/8 = 80
          //....
          // 最后一次执行  setp = (800-800)/8 = 0


          // 步长最后清零
          step = step<0?Math.floor(step):Math.ceil(step)
          // 如果达到了0就直接清零
          if(document.querySelector("main").scrollTop == target){
            clearInterval(this.timer)
          }
          // 加减步长
          document.querySelector("main").scrollTop += step
      },10)










    },
    select(index){
        this.active = index
        console.dir(this.$refs.right.scrollTop);
        //console.log(this.$refs.right.children[index])
          let val = this.$refs.right.children[index].offsetTop;

          clearInterval(this.timer)
          this.timer= setInterval(()=>{

            this.$refs.right.scrollTop+=1
            
            if(this.$refs.right.scrollTop >= val){
              clearInterval(this.timer)
            }
              
          },1)
    },
    addCount($event,i){
      // 1.1首先查看存不存在
      let swipe = this.selectedData.find(e=>e.name === i.name)
      // 不存在 取反状态  不存在就添加
      if(!swipe){
        this.selectedData.push(i)
      }
      // 点击加号的时候布尔为真
      this.ballFlag = true
      // 将这个事件对象赋值给 jiahao
      this.jiahao = $event.target
    },
    reduceCount(i){
      this.selectedData = this.selectedData.filter(e=>e.name !== i.name)
      console.log(this.selectedData);
    },
    clear(){
      // 首先将数组里面的数量全部重置
      this.selectedData.forEach(e=>{
        e.count = 0
      })
      this.selectedData = []
      // this.selectedData = []
      // 先原始数组里面的数量全部清0
      this.items.forEach(e=>{
        e.food.forEach(s=>{
          s.count = 0
        })
      })
    },
    linkTo(){
      // 往vuex 里面传输已选择的商品  和 当前选择商家的信息
      this.$store.commit("info/changeShop",this.shopInfo)
      this.$store.commit("info/changeselectedData",this.selectedData)



      if(this.countPrice>=+this.shopInfo.ShippingCash){
        this.$router.push({
          path:"/confirmOrder",
          query:{
            name:this.$route.query.name,
            lng:this.$route.query.lng,
            lat:this.$route.query.lat,
            id:this.$route.query.id
          }
        })
      }
    },
    // 动画开始之前
    before(el){
      // 在动画开始前啊需要把  小球的  位置  调整到  + 按钮  的位置
      console.log(el);
      // 计算小球移动的位置
      /**知识点：getBoundingClientRect()  是一个方法 */
      /**返回一个对象，对象中有left和top属性，距离左、上的位置 */

      let left = this.jiahao.getBoundingClientRect().left - 30
      let top = window.innerHeight -30 -20 -this.jiahao.getBoundingClientRect().top


      // 实现动画  //一、准备实现曲线操作
      // 一、.1大盒子制作向下移动
      el.style.transform = `translate(0px,-${top}px)`//大盒子向下移动
      // 一、.2获取小span 让小span 做水平移动
      let small = el.querySelector("span")  
      console.log(small);
      small.style.transform = `translate(${left}px,0px)`//小盒子向左移动
    },
    enter(el){
      // vue的bug，必须要先触发  整个 html文档的 DOM重绘，里面的元素
      // 才会有动画
      document.body.offsetHeight

      // 把小球  调回初识位置
      el.style.transform = 'translate(0px,0px)'
      // 获取小 span  让小span  也回到原点
      let small = el.querySelector("span")
      small.style.transform = 'translate(0px,0px)'
      // 小球位移结束时触发购物车事件  将购物车的class变化
      this.cartFlag = true
      // 获取到购物车
      this.$refs['car'].addEventListener("animationend",()=>{
        this.cartFlag = false
      })
      // 直接变成蓝色  1.1当购车车里面有东西时候
      // 观察者属性，当购物车里面没有东西是，变成false
      this.blueFlag = true


      this.ballFlag = false
    },
    // 动画结束的时候触发的函数
    after(){
      this.ballFlag = false
    }
  },
  computed:{
    // 计算总价
    countPrice:{
      get(){
        if(this.selectedData.length>0){
          return this.selectedData.reduce((sum,e)=>sum+= e.price * e.count,0)
        }else{
          return 0
        }

      },
      set(){

      }
    },
    // 计算配送费

  },
  watch:{
    // 传入新值和旧值
    // 启用深度观察模式 
    selectedData: {
      handler: function (newVal, oldVal) {
        this.selectedData  = newVal
      },
      deep: true
    },
        // 传入新值和旧值
    // 启用深度观察模式 
    items: {
      handler: function (newVal, oldVal) {
        // console.log('数组发生变化：', newVal, oldVal);
        this.items  = newVal
      },
      deep: true
    },
    selectedData(newVal){
      if(newVal.length === 0){
        this.blueFlag = 0
      }
    }
  }
}
</script>

<style scoped lang="scss" scoped>
.active{
  background-color: #fff !important;
  border-left: #3190e8 solid 3px;
}
body{
scroll-behavior: smooth;
}
html {
scroll-behavior: smooth;
}
.head{
  display: flex;
  position: relative;
    width: 100%;
    color:black;
  justify-content: center;
  align-items: center;
  padding-left: 0.16rem;
  padding-top: 0.16rem;
  box-sizing: border-box;
  background-size: 100%;
  height: 2rem;
  .prev{
    position: absolute;
    top:0.025rem;
    left:0.010rem;
    width: 0.8rem;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
        color: black;
    img{
      vertical-align: middle;
      width: 0.36rem;
      height: 0.36rem;
    }
  }
  .next{
    position: absolute;
    right:0;
    top:20%;
    width: 0.8rem;
    height: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
        color: black;
    img{
      vertical-align: middle;
      width: 0.56rem;
      height: 0.56rem;
    }
  }
  .picture{
    width: 1.06rem;
    height: 1.006rem;
    border-radius: 0.03rem;
    margin-right: 0.09rem;
        color: black;
    img{
      vertical-align: middle;
      width: 1.06rem;
      height: 1.006rem;
    }
  }

  .content{
    display: flex;
    flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0;
        color: black;
    h4{
      font-size: 0.35rem;
    }
    font-size: 0.20rem;
  }
  
}
.assess{
  display: flex;
  width: 100%;
  height: 1.5rem;
  background-color: #fff;

  div{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .activing{
    border-bottom: 3px solid skyblue;
  }
}
.content{
  display: flex;
  padding-bottom: 0.94rem;
  box-sizing: border-box;
  aside{
    flex: 1;
    display: flex;
    flex-direction: column;
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.5rem;
    }
  }
  main{
    scroll-behavior: smooth;
    flex: 4;
    height: 12rem;
    overflow: scroll;
    position: relative;
    .right{
      scroll-behavior: smooth;
        width: 100%;
        margin-bottom: 0.22rem;
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
                margin: 0 auto;
                .zhaopai{
                margin: 0 auto;
                    width: 0.9rem;
                    border: 0.01rem orangered solid;
                    color:orangered ;
                    border-radius: 0.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
}
.mt-popup{
  width: 100% !important;
  height: 3rem;
  // 这个弹窗的样式
  
}
// 底部弹窗
.pop{
  width: 100%;
  .title{
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 0.1rem 0.25rem;
    box-sizing: border-box;
    div:nth-child(2){
      img{
        vertical-align: middle;
        width: 0.5rem;
      }
    }
  }
  .content{
    display: block;
    .item{
      display: flex;
      padding: 0.3rem 0.25rem;
      justify-content: space-between;
      .left{
        display: flex;
        width: 8rem;
        display: flex;
        justify-content: space-between;
        div:first-child{
          font-weight: 900;
        }
        div:nth-child(2){
          color:red
        }
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
    color: white;
    display: flex;
    width: 33%;
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
        width: 2rem;
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
    background-color: #535356;
    justify-content: center;
    align-items: center;
    width: 33%;
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
.ball{

  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index:4500;
  transition: all 0.3s cubic-bezier(0.5, -0.5, 0.8, 0.5);
  // 从原来的一个盒子变成两个盒子移动
  span{
    display: block;
    width: 20px;
    height: 20px; 
    background-color: #3190e8;
    border-radius: 20px;
    transition: all .3s linear;
  }
}
@keyframes scales {
  0% { transform: scale(1);  }
  20% { transform: scale(1.5);  }
  40% { transform: scale(1.2);  }
  60% { transform: scale(0.95);  }
  80% { transform: scale(1.1);  }
  100% { transform: scale(1);  }
}  
.cartActive{
  animation: scales 0.3s ;
}
</style>