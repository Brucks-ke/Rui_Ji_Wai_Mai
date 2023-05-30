import Vue from 'vue'
import Vuex from 'vuex'
import info from "./moudules/info.js"
import order from "./moudules/order.js"
import user from "./moudules/user.js"



Vue.use(Vuex)






const store = new Vuex.Store({
  modules: {
    info,
    order,
    user
  },

})

export default store