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
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },
  mounted() {
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
