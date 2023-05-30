import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'




import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 全局引入 rem单位
// 全局引入tab切换
import { Tabbar, TabItem } from 'mint-ui';

Vue.config.productionTip = false
Vue.use(MintUI)
// 使用
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

import axios from "./utils/http"
Vue.prototype.$http = axios

// 引入底部导航组件
import myFooter from "./components/footer.vue"
Vue.component("myFooter",myFooter)
// 引入单个商品组件
import oneShop from './components/list.vue'
Vue.component("oneShop",oneShop)
// 注册加减按钮组件
import number from './components/number.vue'
Vue.component("number",number)




// 全局变量2 混入
Vue.mixin({
  data(){
    return {
      uploadURL:"http://101.34.108.131:2333/upload/",
    }
  }
})



new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')



router.beforeEach(async (to,from,next)=>{
  if(to !== "/login"){
    let res = await axios.get("http://101.34.108.131:2333/web/account/validate")
    console.log(res);
    let user = localStorage.getItem("user")
    let userId = localStorage.getItem("user_id")
    if(res==="验证成功" && user){
      store.commit("user/editUserStatus",userId)
    }else{
      store.commit("user/editUserStatus","")
    }
    // 都通过
    next()
  }else{
    next()
  }
})