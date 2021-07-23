import {debounce} from "@/common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //this.$refs.scroll.refresh对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    //对监听的函数进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('goodsItemImgLoad', this.itemImgListener)
  }
}
