<template>
    <div class="address">
        <mt-header title="选择地址" fixed>
            <div slot="left" @click="$router.back()">
                <mt-button icon="back"></mt-button>
            </div>
        </mt-header>
        <div>
            <mt-field label="联系人" placeholder="你的名字" v-model="username"></mt-field>
            <mt-field label="">
                <div class="gender">
                    <img :src="radio == 'man' ? require('../../assets/checked.png') : require('../../assets/unchecked.png')"
                        alt="" width="20" @click="bcd()"> <span>先生</span>
                    <img :src="radio == 'woman' ? require('../../assets/checked.png') : require('../../assets/unchecked.png')"
                        alt="" width="20" @click="abc()"> <span>女士</span>
                </div>
            </mt-field>
            <mt-field label="联系电话" placeholder="你的手机号" type="tel" v-model="tel"></mt-field>
            <mt-field label="送餐地址" placeholder="小区/写字楼/学校等" v-model="sendAddress"></mt-field>
            <mt-field label="     " placeholder="详细地址（如门牌号等）" v-model="fullAddress"></mt-field>
            <mt-field label="标签" placeholder="无/家/学校/公司" v-model="labels"></mt-field>
            <button type="primary" class="determine" @click="onsubmit()">确定</button>
        </div>
    </div>
</template>
<script>
import axios from "../../utils/http.js"
export default {
    data() {
        return {
            username: "",
            tel: "",
            sendAddress: "",
            fullAddress: "",
            labels: "",
            radio: "man",
        }
    },
    methods: {
        abc() {
            this.radio = 'woman'
        },
        bcd() {
            this.radio = "man"
        },//发送请求存储用户的个人地址
        async onsubmit(){
            let obj = {
                username:localStorage.getItem("user"),
                name: this.username,
                tel: this.tel,
                sendAddress: this.sendAddress,
                fullAddress: this.fullAddress,
                labels: this.labels,
                gender: this.radio,
                default:false
            }
            let res = await axios.post("/web/account/addAddress",obj)
            console.log(res);
            this.$router.back()
        }
    }
}
</script>
<style lang="scss">
.address {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 6000;
    background: #fff;
    padding-top: 0.8rem;

    header {
        height: 0.8rem;
        padding: 0 0.18rem;

        .mt-button,
        h1,
        a,
        span {
            font-size: 0.24rem;
            color: #fff;
        }

        h1 {
            font-weight: bold;
            font-size: 0.36rem;
        }
    }

    .radio {
        margin-right: 4.4rem;
    }

    .determine {
        width: 95%;
        background-color: #4cd964;
        font-size: .3rem;
        color: #fff;
        text-align: center;
        margin-left: .2rem;
        line-height: .8rem;
        border-radius: 0.2rem;
        margin-top: 0.6rem;
        outline: none;
        border: none;
    }
}</style>