import Vue from 'vue'
import VueRouter from 'vue-router'
// 所有理由
import home from "../views/home.vue"
import NotFind from "../views/NotFind.vue"
import city from "../views/city.vue"

import chooseAddress from "../views/child/chooseAddress.vue"
import remark from "../views/child/remark.vue"
import ticket from "../views/child/ticket.vue"
import order from "../views/order.vue"
import addAddress from "../views/child/addAddress.vue" //添加地址
import payment from "../views/child/payment.vue" //付款方式
import orderDetail from "../views/child/orderDetail.vue" //订单详情

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}


Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"主页",
    component:home
  },
  {
    path:"/login",
    name:"登录",
    component:()=>import("../views/login.vue")
  },
  {
    path:"/reg",
    name:"注册",
    component:()=>import("../views/reg.vue")
  },
  {
    path:"/city",
    name:"城市",
    component:city
  },
  {
    path:"/msite",
    name:"商家详情",
    component:()=>import("../views/msite.vue")
  },
  {
    path:"/search",
    name:"搜索页",
    component:()=>import("../views/search.vue")
  },
  {
    path:"/order",
    name:"订单页",
    component:order,
    children:[
      {
        path:"orderDetail",
        name:"订单详情页",
        component:orderDetail,
      }
    ]
  },
  {
    path:"/profile",
    name:"个人中心",
    component:()=>import("../views/profile.vue")
  },
  {
    path:"/shop",
    name:"商家详情",
    component:()=>import("../views/shop.vue")
  },
  {
    path:"/shop",
    name:"商家详情",
    component:()=>import("../views/shop.vue")
  },
  {
    path:"/confirmOrder",
    name:"确认订单",
    component:()=>import("../views/confirmOrder.vue"),
    children:[
      {
        path:"chooseAddress",
        name:"chooseAddress",
        component:chooseAddress,
        children:[
          {
            path:"addAddress",
            name:"添加地址",
            component:addAddress
          },
        ]
      },
      {
        path:"remark",
        name:"选择备注",
        component:remark
      },
      {
        path:"ticket",
        name:"是否开发票",
        component:ticket
      },
      {
        path:"payment",
        name:"付款",
        component:payment
      },
    ]
  },
  {
    path:"/forget",
    name:"忘记密码",
    component:()=>import("../views/forget.vue")
  },
  // {
  //   path:"/geohash",
  //   name:"商家详情",
  //   component:()=>import("../views/geohash.vue")
  // },
  {
    path:"*",
    component:NotFind
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
