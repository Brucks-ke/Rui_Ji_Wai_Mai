<template>
<div class="remark">
    <mt-header :title="'在线支付'" fixed style="font-weight:900">
        <div @click="$router.push('/order')" slot="left">
            <mt-button icon="back" ></mt-button>
        </div>
    </mt-header>
    <div class="content">
        <h5>快速备注</h5>
        <div>
            <center><h5>支付剩余时间</h5></center>
            
            <center><div style="font-size:0.52rem">{{time}}</div></center>
        </div>
            <div>
                <h3>选择支付方式</h3>
                <div style="margin-top: 20px;display:flex;
                justify-content:space-between">
                <span>支付宝</span><span><img :src="defaultIndex==='1'?require('../../assets/'+'checked.png'):require('../../assets/'+'unchecked.png')" alt=""></span>
                </div>
                <div style="margin-top: 20px;display:flex;
                justify-content:space-between">
                <span>微信</span><span><img :src="defaultIndex==='2'?require('../../assets/'+'checked.png'):require('../../assets/'+'unchecked.png')" alt=""></span>
                </div>
            </div>

        <div >
            <el-button type="success" style="width:100%" @click="onsbmit()" >确认</el-button>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            time:"",
            defaultIndex:"1"
        }

    },
    created(){
        this.countdown()
    },
    methods:{
        back(){
            this.$router.back()
        },
        countdown(){
            // 1.获取到当前时间
            // 2.获取到创建的时间 this.$store.state.order.order.createTime
            // 3.付款结束的时间，创建时间加上15

            let now = +new Date()  //1
            let create = this.$store.state.order.order.createTime //2.
            console.log(create);
            let end = new Date(create).getTime() + (1000*60*15)//3
            console.log(end,now);
            // 倒计时90分钟
            let times = (end - now)/1000

            setInterval(()=>{
                let hour1 = times / 60 / 60
                hour1 = parseInt(hour1)
                hour1< 10?hour1 ="0" + hour1:hour1 = hour1
                let min1 = times / 60 % 60
                min1 = parseInt(min1)
                min1 < 10 ?min1 =  "0" + min1 :min1
                let sec1 = times % 60
                sec1 = parseInt(sec1)
                sec1 < 10 ? sec1 = "0" + sec1 :sec1
                times--
                this.time = `${hour1}:${min1}:${sec1}`
            },1000)




        },
        onsbmit(){
            console.log(1);
            this.$messagebox.prompt('请输入密码').then(async  ({ value, action }) => {
                console.log(action);
                this.$router.push("/order")
                // 直接将这个订单的支付状态改成已完成
                this.$store.commit("order/editThisOrder","已完成")
                // 并提交数据库让数据库里面的这条数据也变成已支付
                let result = await axios.put("/web/account/eidtSuccessOrder?id="+this.$store.state.order.order._id
  


                )
                console.log(result);
            },error=>{
                console.log(error);
            })
        }
    }
}
</script>

<style scoped lang="scss">
.mint-msgbox{
    z-index:8001 !important;
}
.remark{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:9999999;
    background-color: #fff;
    .content{
        margin-top: 1.5em;
        div:nth-child(2){
            margin-bottom: 0.26rem;
        }
    }
}
h1{
    font-weight:900
}
img{
    width: 20px;
    height: 20px;
}
</style>