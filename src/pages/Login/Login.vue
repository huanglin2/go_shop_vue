<template>
  <div class="loginContainer">
    <div class="loginInner">

      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login" @keyup.enter="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
                {{computerTime>0?`已发送(${computerTime}s)`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!--                不显示密码-->
                <input type="password" maxlength="8" v-if="!isShow" placeholder="密码" v-model="pwd">
                <!--                显示密码-->
                <input type="text" maxlength="8" v-else placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="isShow?'on':'off'" @click="isShow=!isShow">
                  <div class="switch_circle" :class="{right:isShow}"></div>
                  <span class="switch_text">{{isShow?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                     @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login" :class="{on:isShow}">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqGetSendCode, reqLoginBynameAndPassword, reqLoginByLoginSms} from '../../api'
  export default {
    data () {
      return {
        loginWay: false,// true代表短信登陆，false代表密码登陆
        computerTime: 0, // 计时
        phone: '',  // 手机号
        isShow: false,
        code: '', // 短信验证码
        name: '', //用户名
        pwd: '',//密码
        captcha: '',// 图片验证码
        alertText: '', //提示文本
        alertShow: false, // 是否显示框
      }
    },
    computed: {
      rightPhone () {
        const regPhone = /^1\d{10}$/
        return regPhone.test(this.phone)
      }
    },
    methods: {
      // 获取随机验证码
      getCaptcha () {
        // 需要每次指定的src 不同
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },
      // showAlert
      showAlert (alertText) {
        this.alertText = alertText
        this.alertShow = true
      },
      // 如果当前没有计时 获取文字验证码
      async getCode () {
        if (!this.computerTime) {
          // 定时器
          this.computerTime = 30
          this.intervalId = setInterval(() => {
            this.computerTime--
            if (this.computerTime === 0) {
              // 停止
              clearInterval(this.intervalId)
            }
          }, 1000)
          // 发送ajax
          const result = reqGetSendCode(this.phone)
          if (result.code === 1) {
            // 显示提示
            this.showAlert(result.msg)
          }
        }
      },
      // 登陆
      async login () {

        const regCode = /^\d{6}$/
        //用户名正则，4到16位（字母，数字，下划线，减号）
        const regUsername = /^[a-zA-Z0-9_-]{4,16}$/
        //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        const regPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
        // 短信登陆
        let result
        if (this.loginWay) {
          const {rightPhone, phone, code} = this
          if (!this.rightPhone) {
            // 手机号不正确
            this.showAlert('手机号格式不正确')
            return
          } else if (!regCode.test(code) || code.length === 0) {
            // 验证码不正确
            this.showAlert('验证码必须是6位纯数字')
            return
          }
          // 发送ajax请求短信登陆
          result = await reqLoginByLoginSms(phone, code)
        }
        // 密码登陆
        else {
          const {name, pwd, captcha} = this
          if (!name || name.length === 0) {
            // 用户名必须为4到16位字母，数字，下划线，减号
            this.showAlert('用户名必须为4到16位字母，数字，下划线，减号')
            return
          } else if (!pwd || pwd.length === 0) {
            // 密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            this.showAlert('密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符')
            return
          } else if (captcha.length === 0) {
            // 验证码必须指定
            this.showAlert('验证码必须指定')
            return
          }
          // 发送ajax请求密码登陆
          result = await reqLoginBynameAndPassword({name, pwd, captcha})
        }
        // 停止计时
        if (this.computerTime) {
          this.computerTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
        // 根据结果数据处理
        if (result.code === 0) {
          const user = result.data
          // 将user保存到state
          this.$store.dispatch('recordUser',user)
          // 去个人中心页面
          this.$router.replace('/profile')
        } else {
          // 获取新的图片验证码
          this.getCaptcha()
          this.captcha = ''
          const msg = result.msg
          this.showAlert(msg)
        }
      },
      closeTip () {
        this.alertText = ''
        this.alertShow = false
      }
    },

    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff

    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto

      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center

        .login_header_title
          padding-top 40px
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px

            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774

      .login_content
        > form
          > div
            display none

            &.on
              display block

            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid #02a774

            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent

                &.right_phone
                  color black

            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s, border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)

                &.off
                  background #fff

                  .switch_text
                    float right
                    color #ddd

                &.on
                  background #02a774

                > .switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                  transition transform .3s

                  &.right
                    transform translateX(30px)

            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px

              > a
                color #02a774

          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0

        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999

      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px

        > .iconfont
          font-size 20px
          color #999
</style>
