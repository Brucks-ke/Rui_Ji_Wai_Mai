import Vue from 'vue'
import Vuex from 'vuex'
import info from "./moudules/info.js"
import order from "./moudules/order.js"
import user from "./moudules/user.js"



Vue.use(Vuex)

import VuexPersist from 'vuex-persist'; //引入vue2持久化插件
const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage,
});



const store = new Vuex.Store({
  plugins: [vuexPersist.plugin], //使用vue2持久化插件
  modules: {
    info,
    order,
    user
  },

})

export default store