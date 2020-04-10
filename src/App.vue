<template>
  <div id="app">
    <RouterView/>
    <FooterGuide/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {mapActions} from 'vuex'
  export default {
    mounted () {
      this.getAddress()
      this.getUserInfo()
    },
    methods:{
      ...mapActions(['getAddress','getUserInfo'])
    },
    components: {
      FooterGuide,
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
