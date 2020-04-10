<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-remove_circle_outline" v-if="food.count" @click.stop="updateFoodCount(true)"></div>
    </transition>
    <div class="cart-count" style="" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(false)"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object
    },
    methods: {
      updateFoodCount (isDelete) {
        this.$store.dispatch('updateFoodCount', {food: this.food, isDelete})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0

    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 22px
      color #02A774
      &.move-enter-active,&.move-leave-active
        transition all .3s
      &.move-enter,&.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

      &.move-enter-active, &.move-leave-active
        transition all .3s

      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)

    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 22px
      color #02A774
</style>
