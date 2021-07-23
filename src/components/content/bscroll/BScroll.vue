<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "BScroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    //滚动到固定位置
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    //由于上拉加载更多方法只能触发一次，之后执行finishPullUp方法可以使上拉加载多次触发
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    //由于图片异步加载导致BS不能正确的计算滑动的总高度，执行此方法可使BS重新计算总高度
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll && this.scroll.y
    }
  },
  mounted() {
    //创建BS对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      mouseWheel: true,
      observeDOM: true,
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType
    })
    //监听滚动的位置
    this.scroll.on('scroll', position => {
      this.$emit('scrollOn', position)
    })
    //监听上拉加载更多
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })
  }
}
</script>

<style scoped>

</style>
