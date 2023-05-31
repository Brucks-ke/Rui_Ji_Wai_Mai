export default {
    namespaced: true,
    state(){
        return {
            // 用户状态
            user:"",
            // 选中的地址
            selectAddress:{}
        }
    },
    // 提交修改请求在这里面写函数  提交修改
    mutations:{
        editUserStatus(state,newVal){
            state.user = newVal
        },
        editSelectAddress(state,newVal){
            state.selectAddress = newVal
        }
    },
    // 异步请求在这里面
    actions:{},
    getters:{}
}