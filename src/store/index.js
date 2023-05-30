import Vue from 'vue'
import Vuex from 'vuex'
import info from "./moudules/info.js"
import order from "./moudules/order.js"
import user from "./moudules/user.js"



Vue.use(Vuex)




import createPersistedState from 'vuex-persistedstate';

const store = new Vuex.Store({
  modules: {
    info,
    order,
    user
  },
  plugins: [createPersistedState()],
})

export default store