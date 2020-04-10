/*
ajax请求函数模块
返回Promise对象 返回response.data
 */
import axios from 'axios'

export default function ajax (url, data = {}, type = 'Get') {
  return new Promise(function (resolve,reject) {
      // 执行异步ajax请求
    let promise
    if (type === 'Get') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发get请求
      promise = axios.get(url)
    }else {
      promise = axios.post(url,data)
    }

    promise.then(function (response) {
      // 成功调用resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失败调用了reject()
      reject(error)
    })
  })
}
