export default {
    namespaced: true,
    state(){
        return {
            // 用户状态
            user:"",
        }
    },
    // 提交修改请求在这里面写函数  提交修改
    mutations:{
        editUserStatus(state,newVal){
            state.user = newVal
        }
    },
    // 异步请求在这里面
    actions:{},
    getters:{}
}