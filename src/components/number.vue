<template>
  <div class="number">
    <transition name="slider">
        <button v-if="value>0" @click="reduce()">-</button>
    </transition>
    <input type="text" v-model="value" v-if="value>0" @input="change()" ref="input_value">
    <transition name="slider">
        <button @click="add($event)">+</button>
    </transition>
  </div>
</template>

<script>
export default {
    props:["value"],
    data(){
        return{
            flag:false,
            val:0
        }
    },
    created(){
       this.val = this.value
    },
    watch:{
        value(newVAL){
            this.val = newVAL
        }
    },
    methods:{
        reduce(){

            this.val --
            if(this.val == 0){
                this.flag = false
                this.$emit("reduce",this.val)
            }
            // 回传值
            this.$emit("input",this.val)
        },
        add($event){
            this.flag = true
            this.val++
            this.$emit("input",this.val)
            this.$emit("add",$event)
        },
        change(){
            let a = this.$refs.input_value
            console.log(a);
            this.$emit("change",a.value)
        }
    }
}
</script>

<style scoped lang="scss">
.number{
    width: 100px;
    display: flex;
    justify-content: flex-end;
    .slider-enter,.slider-leave-to {opacity: 0;
    transform: translateX(0.6rem);}
    .slider-enter-active,.slider-leave-active {transform: all 1.5s;}
    .slider2-enter-active,.slider2-leave-active  {opacity: 0;
    transform: translateX(0.6rem);}
    .slider2-enter,.slider2-leave-to {transform: all 1.5s;}
    button{
        border: none;
        background: #3190e8;
        color:#fff;
        border-radius: 20px;
        width: 20px;
        height: 20px;
    }
    input{
        border: none;
        width: 18px;
        text-align: center;
    }
    .reduce{
        border: 2px solid #3190e8;
        background-color: #fff;
        color: #3190e8;
        width: 20px;
        height: 20px;
    }
}
</style>