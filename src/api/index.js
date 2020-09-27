/*
包含n个接口q请求函数的模块
接口返回值也是Promise
 */
import ajax from './ajax'

const BASE_URL = '/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqaddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)
export const reqFoodTypes = () => ajax(BASE_URL + '/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表) latitude 纬度 longitude 经度
export const reqShopsByLatitude = (latitude, longitude) => ajax(BASE_URL + '/shops', {latitude, longitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqShopsByName = (keyword, geohash) => ajax(BASE_URL + '/search_shops', {keyword, geohash})
// [5、获取一次性验证码](#5获取一次性验证码)
// [6、用户名密码登陆](#6用户名密码登陆)
export const reqLoginBynameAndPassword = ({name, password, captcha}) => ajax(BASE_URL + '/login_pwd', {
  name,
  password,
  captcha
}, 'POST')
// [7、发送短信验证码](#7发送短信验证码)
export const reqGetSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)
export const reqLoginByLoginSms = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)
export const reqGetUserInfo = () => ajax(BASE_URL + '/userinfo')
// [10、用户登出](#10用户登出)
export const reqUserLogout = () => ajax(BASE_URL + '/logout')

/*
商家信息
 */
export const reqShopInfo = () => ajax('/info')
/*
评价
 */
export const reqShopRatings = () => ajax('/ratings')
/*
商品
 */
export const reqShopGoods = () => ajax('/goods')
