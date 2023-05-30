<template>
  <div>
    <mt-header :title="$route.query.city" fixed>
        <router-link to="/" slot="left">
            <i class="mintui mintui-back"></i>
        </router-link>
        <div icon="more" slot="right">
            <router-link to="/" class="white">切换城市</router-link>&nbsp; 
        </div>
    </mt-header>


    <div class="container2">
        <div class="rows">
            <input type="text" v-model="value" placeholder="输入学校，商务楼，地址"
            @input="getAddress($event)"
            >
            <br>
            <mt-button type="primary" @click="jump">提交</mt-button>
        </div>

        
        <div class="line"></div>
        <div class="row">
            <div class="left">历史记录</div>
        </div>
        <div class="more" v-for="(item,index) in history" :key="index" @click="tiao(item.name,item.location.lng,item.location.lat)">
            <h4>{{item.name}}</h4>
            <div>{{item.name}}</div>
        </div>
        <span @click="clear" style="color:red">清空所有</span>

        <div class="tips" >
            <div class="more" v-for="(item,index) in ADDRESS" :key="index" @click="select(item.name)">
                <h4>{{item.name}}</h4>
                <div>{{item.address}}</div>
            </div>
        </div>


    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            timer:null,
            ADDRESS:[],
            value:"",
            beifen:[],
            history:JSON.parse(localStorage.getItem("address"))
        }
    },
    methods:{
        getAddress($event){
            clearTimeout(this.timer)
            this.timer = setTimeout(async ()=>{
                console.log($event.target.value);
                let res = await this.$http.get("/web/position/getAddress",{
                    params:{
                        city:this.$route.query.city,
                        address:$event.target.value
                    }
                })
                this.ADDRESS = res
            },500)
        },
        select(name){
            this.value = name
            this.beifen = this.ADDRESS.slice()
            this.ADDRESS = []
        },
        jump(){
            // 首先找到这个输入框的value对应的对象
            let thisObj = this.beifen.find(e=>this.value === e.name)
            if(!thisObj){
                this.$messagebox('提示', '请先选择一个地址');
            }else{
                // 历史记录模式
                let his = thisObj
                let add = localStorage.getItem("address")
                if(add){
                    // 先解析出来
                    add = JSON.parse(add)
                    add.push(his)
                    localStorage.setItem("address",JSON.stringify(add))
                }else{
                    localStorage.setItem("address",JSON.stringify([his]))
                }
                // 跳转到下一个页面
                this.$router.push({path:"/msite",query:{
                    name:thisObj.name,
                    lng:thisObj.location.lng,
                    lat:thisObj.location.lat
                }})
            }

        },
        clear(){
            // 点击之后清空这个数据库
            localStorage.removeItem("address")
            this.history = []
        },
        tiao(one,two,three){
            console.log(one,two,three);
                            // 跳转到下一个页面
                this.$router.push({path:"/msite",query:{
                    name:one,
                    lng:two,
                    lat:three
                }})
        }
    }
}
</script>

<style lang="scss">
    .container2{
        margin-top: 40px;
        position: relative;
        .row{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            border-bottom: 1px solid #ccc;
            color:#555;
            padding: 0 10px;
            .now{
                color: #3190e8;
                font-size: 0.41rem !important;
            }
            .left{
                font-size: 0.16rem;
            }
            .right{
                color: #9f9f9f;
                font-size:0.25rem;
                font-weight: bold;
            }
            i{
                display: block !important;
                transform: rotate(180deg);
            }
            .city{
                font: size 0.36rem;
                color: #3190e8;
            }
            .touch{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.79rem;
                height: 0.79rem;
            }
        }
        .rows{
            margin-top: 1.0rem;
            margin-bottom: 0.2rem;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
            color:#555;
            padding: 0 10px;
            button{
                width: 100%;
            }
            input{
                width: 100%;
                height: 0.8rem;
                margin-bottom: 0.2rem;
            }
            .now{
                color: #3190e8;
                font-size: 0.41rem !important;
            }
            .left{
                font-size: 0.16rem;
            }
            .right{
                color: #9f9f9f;
                font-size:0.25rem;
                font-weight: bold;
            }
            i{
                display: block !important;
                transform: rotate(180deg);
            }
            .city{
                font: size 0.36rem;
                color: #3190e8;
            }
            .touch{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.79rem;
                height: 0.79rem;
            }
        }
        .line{
            height: 0.18rem;
            background: #eee;
            border-top: 1xp solid #ccc;
            border-bottom: 1px solid #ccc;
        }
        .more{
            >div{
                font-size:0.16rem;
                color: #999;
            }


        }
        .tips{
            position: absolute;
            top:0.9rem;
            left:0;
            background: #fff;
            width: 100%;
            border-bottom: 0.01rem solid #eee;
            >.more{
                border-bottom: 0.01rem solid #eee;
                padding-left: 20px;
                padding-right: 20px;
                height: 1.2rem;

            }
        }

    }
</style>