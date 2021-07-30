<template>
  <div>
    <nav-bar class="nav_bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <b-scroll class="b_scroll" ref="scroll">
      <cart-list></cart-list>
    </b-scroll>
    <cart-bottom-bar class="bottom_bar"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/shopcat/childComps/CartList";
import BScroll from "@/components/content/bscroll/BScroll";
import CartBottomBar from "@/views/shopcat/childComps/CartBottomBar";
import {mapGetters} from "vuex";

export default {
  name: "ShopCat",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    BScroll
  },
  computed: {
    //两种写法 传入数组和对象
    //...mapGetters(["cartLength","cartList"])
    ...mapGetters({
      length: "cartLength",
      list: "cartList"
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.nav_bar {
  background-color: var(--color-tint);
  color: white;
}
.b_scroll{
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
.bottom_bar{
  position: relative;
}
</style>
