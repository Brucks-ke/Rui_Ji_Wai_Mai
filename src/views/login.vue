<template>
    <div>
        <header>

            <mt-header title="密码登录">
            <div slot="left" @click="$router.back()">
                <mt-button icon="back"></mt-button>
            </div>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>

        </header>


        <div class="box">

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    账号: <input type="text" v-model="username">
                </div>
            </div>

            <div class="pwd">
                <div style="margin-left: 0.2rem;">
                    密码: <input :type="flag?'text':'password'" v-model="password">
                </div>
                <div>
                    <mt-switch v-model="flag" style="margin: 0.3rem 0.2rem;"></mt-switch>
                </div>
            </div>

            <div class="pwd">
                <div style="margin-left: 0.2rem;display:flex;">
                    验证码: <input type="text" style="width:3.2rem" v-model.lazy="inputCode">
                </div>
                <canvas  class="canvas" ref="canvas" width="80" height="50">
                    
                </canvas>
            </div>

            <div class="ts">
                <div>温馨提示：未注册过的账号，登录时将自动注册 </div>
                <div>注册过的用户可凭账号密码登录 </div>
            </div>

            <mt-button size="large" class="mt-button" @click="login">登录</mt-button>

            <span class="foot" @click="$router.push({path:'/forget'})">重置密码?</span>

        </div>
    </div>
</template>

<script>
import axios from "../utils/http"
export default{
    mounted(){
        document.querySelector(".canvas").addEventListener("click",()=>{
            this.yzm()
        })
        this.yzm()
    },
    data(){
        return{
            flag:false,
            username:'',
            password:'',
            res:"",
            canvas:null,
            code:'',
            inputCode:null
        }
    },
    methods:{
        async login(){
        if(this.inputCode === this.code){

            


            // 随机一个user_id
            function userId(){
                return Math.random()*1000000
            }
            let user_id = userId().toString().slice(0,5)
            console.log(user_id);


            // 发送注册账号请求
            let obj = {
                username: this.username,
                password: this.password,
                userId: +user_id
            }
            let res = await axios.post("/web/account/user",obj)
            console.log(res);
            // 设置登录状态，并跳转  // 拿取userId  并给到本地数据库
            let resulit = await axios.get("/web/account/getUser",{
                params:{
                    username: this.username,
                    password: this.password,
                }
            })
            console.log(resulit);
            localStorage.setItem("token",resulit.token)
            localStorage.setItem("user",this.username)
            if(typeof resulit.userId == "number"){
                this.$store.commit("user/editUserStatus",resulit.userId)
                
                // 添加获取获取账号详细信息
                let result = await axios.post("/web/account/addDetails",{
                    username: this.username,
                    userId: resulit.userId,
                })
                console.log(result);

                // 跳转
                this.$router.back()
            }else if(resulit === "账号或密码错误"){
                alert("账号或密码错误")
            }


        }else{
            alert("验证码错误，请重新输入")
            this.yzm()
        }

        },

        yzm(){
            this.code = ''
            // 获取画布的宽高
            // 获取画布
            let canvas = this.$refs.canvas
            
            // 创建画笔
            let pen = canvas.getContext("2d")

            let w = canvas.clientWidth   // 100

            let h = canvas.clientHeight  // 300


            // 写一个随机函数
            function ran(min,max){
                return Math.round(Math.random()*(max-min)+min)
            }

            // 写一个随机颜色
            function ranColor(){
                let red = ran(0,255)
                let green = ran(0,255)
                let blue = ran(0,255)
                return `rgb(${red},${green},${blue})`
            }

            // 绘制矩形背景
            pen.fillStyle = ranColor()
            pen.fillRect(0,0,w,h)

            // for循环她们  绘制干扰线
            for (let i = 0; i < 5; i++) {
                pen.beginPath()  //开始的限制
                    // 1. 画出线条    1.1画笔初始位置
                    pen.moveTo(ran(0,w*0.3),ran(0,h))
                    // 1.2 画笔结束位置
                    pen.lineTo(ran(w*0.7,w),ran(0,h))

                    // 2.样式
                    pen.storkeStyle = ranColor()
                    pen.lineWidth = ran()

                    // 3.以线条填充  
                    pen.stroke()  
                pen.closePath()  //开始的限制
            }


            for (let k = 0; k < 10; k++) {
                pen.beginPath()  //开始的限制

                    pen.arc(ran(0,w),ran(0,h),ran(1,20),Math.PI/180*0,Math.PI/180*360,false)
                    pen.fillStyle = ranColor()
                    pen.fill()      // 

                pen.closePath()  //开始的限制
            }

            let str ="0123456789"


            for (let l = 0; l < 4; l++) {
                this.res = ""
                let letter = str[ran(0,str.length-1)]
                this.res += letter
                // 绘制文字
                pen.font = `${ran(30,70)}px 楷体`
                pen.fillStyle = ranColor

                pen.fillText(letter,ran(l*w/4,l*w/4+w/4-w*0.2),ran(h*0.3,h*0.7))
                // 显示验证码
                this.code+=this.res
            }
            
        }
    }

}
</script>

<style lang="scss">
.box{
    width: 100%;
    // height: 5rem;
    background: #eee;
    .pwd{
        width: 100%;
        height: 1rem;
        background: #fff;
        color: #666;
        font-size: 0.4rem;
        line-height: 1rem;
        border-bottom: #666 solid 0.01rem;
        display: flex;
        justify-content: space-between;
        input{
           width: 4.5rem;
           height: 0.78rem;
           border:none;
           padding-left:0.2rem;
           outline:none;
           font-size: 0.4rem;
        }
        .canvas{
            width: 80px;
            height: 50px;
        }
    }
    .ts{
        width: 100%;
        height: 1rem; 
        color: red;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-left: 0.35rem;
    }
    .mt-button {
        width: 90%;
        height: 1rem; 
        font-size: 0.4rem;
        background: #4cd964;
        margin-left: 0.35rem;
        color: #fff;
    }
    .foot{
        width: 100%; 
        color: #3b95e9;
        font-size: 0.4rem;
        display: flex;
        justify-content: flex-end;
    }
}

</style>