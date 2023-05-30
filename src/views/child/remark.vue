<template>
<div class="remark">
    <mt-header :title="'订单备注'" fixed style="font-weight:900">
        <div @click="back" slot="left">
            <mt-button icon="back" ></mt-button>
        </div>
    </mt-header>
    <div class="content">
        <h5>快速备注</h5>
        <div>
            <el-radio-group v-model="remark.radio1">
                <el-radio-button label="不要辣"></el-radio-button>
                <el-radio-button label="少点辣"></el-radio-button>
                <el-radio-button label="多点辣"></el-radio-button>
            </el-radio-group>
        </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="remark.radio2">
                <el-radio-button label="多点葱" ></el-radio-button>
                <el-radio-button label="不要葱"></el-radio-button>
                <el-radio-button label="少点葱"></el-radio-button>
            </el-radio-group>
          </div>
        <div style="margin-top: 20px">
            <el-radio-group v-model="remark.radio3">
                <el-radio-button label="去冰" ></el-radio-button>
                <el-radio-button label="少冰"></el-radio-button>
            </el-radio-group>
        </div>
        <div style="margin-top: 20px">
            <el-radio-group v-model="remark.radio4">
                <el-radio-button label="去冰" ></el-radio-button>
                <el-radio-button label="少冰"></el-radio-button>
            </el-radio-group>
        </div>
        <div>
            <h5>其他备注</h5>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="remark.textarea">
            </el-input>
        </div>
        <div>
            <el-button type="success" style="width:100%" @click="sumbmit">确认</el-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            remark:{
                radio1:"",
                radio2:"",
                radio3:"",
                radio4:"",
                textarea:""
            }
        }

    },
    methods:{
        back(){
            this.$router.back()
        },
        sumbmit(){
            this.$store.commit("order/editRemark",Object.values(this.remark)),
            this.$router.back()
        }
    }
}
</script>

<style scoped lang="scss">
.remark{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:9999999;
    background-color: #fff;
    .content{
        margin-top: 1.2em;
    }
}
h1{
    font-weight:900
}
</style>