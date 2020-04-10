/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import MSite from '../pages/MSite/MSite'
const MSite = () => import('../pages/MSite/MSite') // 只有在执行时才引入 路由懒加载 比较外层路由就这么干
// import Order from '../pages/Order/Order'
const Order = () => import('../pages/Order/Order')
const Profile = () => import('../pages/Profile/Profile')
// import Profile from '../pages/Profile/Profile'
const Search = () => import('../pages/Search/Search')
// import Search from '../pages/Search/Search'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)
export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: MSite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },

    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
