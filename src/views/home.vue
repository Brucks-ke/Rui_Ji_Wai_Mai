<template>
  <div>
    <mt-header title="" fixed>
        <div @click="$router.back()" slot="left">
            <mt-button icon="back"></mt-button>
        </div>
        <div icon="more" class="more" slot="right" v-if="!user1">
            <router-link to="/login" class="white">登录</router-link>&nbsp; |
            <router-link to="/login" class="white">注册</router-link>
        </div>
        <div icon="more" class="more" slot="right" v-else>
            <router-link to="/login" class="white">{{user1}}</router-link>
        </div>
    </mt-header>
    
    <div class="container">
        <div class="row">
            <div class="left">当前定位城市</div>
            <div class="right">定位不准时，请在城市列表中选择</div>
        </div>
        <div class="row" @click="jump">
            <div class="left now">{{city}}</div>
            <div class="right touch">
                <i class="mintui mintui-back"></i>
            </div>
        </div>
        
        <div class="line"></div>
        <div class="row">
            <div class="left">热门城市</div>
        </div>
        <div class="more">
            
            <router-link :to="{path:'/city',query:{city:'上海'}}">上海</router-link>
            <router-link :to="{path:'/city',query:{city:'哈尔滨'}}">哈尔滨</router-link>
            <router-link :to="{path:'/city',query:{city:'南京'}}">南京</router-link>
            <router-link :to="{path:'/city',query:{city:'广州'}}">广州</router-link>
            <router-link :to="{path:'/city',query:{city:'厦门'}}">厦门</router-link>
            <router-link :to="{path:'/city',query:{city:'杭州'}}">杭州</router-link>
            <router-link :to="{path:'/city',query:{city:'天津'}}">天津</router-link>
            <router-link :to="{path:'/city',query:{city:'青岛'}}">青岛</router-link>
        </div>
        <div class="line"></div>
        <div class="more">
            <div class="row" style="width:100% !important">
                <div class="left">热门城市</div>
            </div>
            <router-link to="/">上海</router-link>
            <router-link to="/">哈尔滨</router-link>
            <router-link to="/">南京</router-link>
            <router-link to="/">广州</router-link>
            <router-link to="/">厦门</router-link>
            <router-link to="/">杭州</router-link>
            <router-link to="/">天津</router-link>
            <router-link to="/">青岛</router-link>
        </div>
        <div class="line"></div>
        <div class="more">
            <div class="row" style="width:100% !important">
                <div class="left">热门城市</div>
            </div>
            <router-link to="/">上海</router-link>
            <router-link to="/">哈尔滨</router-link>
            <router-link to="/">南京</router-link>
            <router-link to="/">广州</router-link>
            <router-link to="/">厦门</router-link>
            <router-link to="/">杭州</router-link>
            <router-link to="/">天津</router-link>
            <router-link to="/">青岛</router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    async created(){
        let res = await this.$http.get("/web/position/city")
        this.city = res
        this.user1 = localStorage.getItem("user")
    },
    data(){
        return {
            city:"",
            user1:""
        }
    },
    methods:{
        jump(){
            this.$router.push({path:"/city",query:{city:this.city}})
        }
    }
}
</script>

<style lang="scss" scoped>
    .white{
        color: #fff;
    }
    .container{
        margin-top: 40px;
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
        .line{
            height: 0.18rem;
            background: #eee;
            border-top: 1xp solid #ccc;
            border-bottom: 1px solid #ccc;
        }
        .more{
            display: flex;
            flex-wrap: wrap;
            a{
                width: 25%;
                line-height: 0.8rem;
                border-bottom: 1px solid #eee;
                border-right: 1px solid #eee;
                text-align: center;
                color:#3190e8;
                font-size:0.32rem;
            }
        }

    }
</style>>

