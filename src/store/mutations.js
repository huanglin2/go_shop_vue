/*
直接更新state的多个对象
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_LOGOUT,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS,
  DECREMENT_FOODCOUNT,
  INCREMENT_FOODCOUNT,
  CLEAR_SHOP_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_LOGOUT] (state) {
    state.userInfo = {}
  },
  [RECEIVE_SHOP_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_SHOP_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_SHOP_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  // 减少
  [DECREMENT_FOODCOUNT] (state, {food}) {
    if (food.count) {
      food.count-- // 新增属性无属性绑定
      if (food.count === 0) {
        // 将food从cartFoods移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  // 增加
  [INCREMENT_FOODCOUNT] (state, {food}) {
    if (!food.count) {
      /*
      对象
      属性名
      值
      */
      Vue.set(food, 'count', 1) // 这样就行
      // 将food添加到cartFoods
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  // 清空购物车
  [CLEAR_SHOP_CART](state){
    state.cartFoods.forEach(food => food.count = 0)

    state.cartFoods = []
  },
  // 搜索的商家列表
  [RECEIVE_SEARCH_SHOPS] (state,{searchShops}){
    state.searchShops = searchShops
  }
}
