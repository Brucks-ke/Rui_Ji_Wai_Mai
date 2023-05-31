export default {
    namespaced: true,
    state(){
        return {
            // 页脚选择状态
            nowSelect:"1",
            // 商家信息 Shop 
            shopInfo:{},
            // 已选择的商品
            selectedData:[],
            remark:[],
            order:{}
        }
    },
    // 提交修改请求在这里面写函数  提交修改
    mutations:{
        updateIndex(state,newVal){
            // state为vuex里面的值  newVal为新的值
            state.nowSelect = newVal
        },
        // 加上商家信息的方法
        changeShop(state,val){
            state.shopInfo = val
        },
        // 加上已选择商品的信息数组
        changeselectedData(state,val){
            state.selectedData = val
        },
        editRemark(state,val){
            state.remark = val
        },
        saveThisOrder(state,val){
            state.order = val
        },
        editThisOrder(state,val){
            state.order.status = val
        }
    },
    // 异步请求在这里面
    actions:{},
    getters:{}
}