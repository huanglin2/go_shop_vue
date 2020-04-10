/*
通过mutation简介更新
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_LOGOUT,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  DECREMENT_FOODCOUNT,
  INCREMENT_FOODCOUNT,
  CLEAR_SHOP_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqaddress,
  reqFoodTypes, reqGetUserInfo, reqShopGoods,
  reqShopsByLatitude, reqUserLogout, reqShopInfo, reqShopRatings, reqShopsByName
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送ajax
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqaddress(geohash)
    if (result.code === 0) {
      const address = result.data
      //提交mutation
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类列表
  async getFoodTypes ({commit, state}) {
    // 发送ajax
    const result = await reqFoodTypes()
    if (result.code === 0) {
      const categorys = result.data
      //提交mutation
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取商家列表
  async getShopsByLatitude ({commit, state}) {
    // 发送ajax
    const {latitude, longitude} = state
    const result = await reqShopsByLatitude(latitude, longitude)
    if (result.code === 0) {
      const shops = result.data
      //提交mutation
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 同步请求获取用户信息
  recordUser ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqGetUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  },
  // 请求退出
  async reqLogout ({commit}) {
    const result = await reqUserLogout()
    if (result.code === 0) {
      commit(RESET_LOGOUT)
    }
  },
  // 商品
  async reqShopGoods ({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS, {goods})
      // 数据后更新通知组件
      callback && callback()
    }
  },
  // 评价
  async reqShopRatings ({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_SHOP_RATINGS, {ratings})
    }
  },
  // 信息
  async reqShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_SHOP_INFO, {info})
    }
  },
  // 同步更新food中的count
  updateFoodCount ({commit}, {isDelete, food}) {
    if (isDelete) {
      commit(DECREMENT_FOODCOUNT, {food})
    } else {
      commit(INCREMENT_FOODCOUNT, {food})
    }
  },
  // 同步清空购物车
  clearList ({commit}) {
    commit(CLEAR_SHOP_CART)
  },
  // 搜索商家列表
  async reqSearchShops ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqShopsByName(keyword, geohash)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}
