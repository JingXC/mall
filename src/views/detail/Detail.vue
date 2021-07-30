<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="nav"/>
    <b-scroll class="content"
              ref="scroll"
              :probe-type="3"
              @scrollOn="contentScroll">
      <detail-swiper :top-image="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods-list="recommends" ref="recommends"/>

    </b-scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow"/>
    <detail-bottom-bar @addCart="addCart"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import BScroll from "@/components/content/bscroll/BScroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backTop/BackTop";

import {getDetail, getRecommends, Goods, Shop, GoodsParam} from "@/network/detail";
import {itemListenerMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";
import {mapActions} from "vuex"

export default {
  name: "Detail",
  components: {
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    BScroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeY: null,
      currentIndex: 0,
      isBackTopShow: false
    }
  },
  created() {
    //保存传过来的iid
    this.iid = this.$route.params.iid

    //根据iid获取详情页数据
    getDetail(this.iid).then(res => {
      const data = res.result

      //获取顶部的轮播图片
      this.topImage = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //获取商品详情信息
      this.detailInfo = data.detailInfo

      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      //获取推荐数据
      getRecommends().then(res => {
        this.recommends = res.data.list
      })
      //获取个组件的offsetTop并进行防抖
      this.getThemeY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    })
  },
  methods: {
    //点击回到顶部
    ...mapActions({
      add: 'addCart'
    }),
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    //监听滚动
    contentScroll(position) {
      const positionY = -position.y
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //滑动超过1000显示backTop
      this.isBackTopShow = positionY > 1000
    },
    //监听添加购物车
    addCart() {
      const product = {}
      product.image = this.topImage[0]
      product.desc = this.goods.desc
      product.title = this.goods.title
      product.price = this.goods.realPrice
      product.iid = this.iid
      this.add(product).then(res => {
        this.$toast.show(res)
      })
    }
  },
  updated() {

  },
  mounted() {
    /*//this.$refs.scroll.refresh对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 20)
    //对监听的函数进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('goodsItemImgLoad', this.itemImgListener)*/
  },
  destroyed() {
    //销毁的时候取消监听goodsItemImgLoad
    this.$bus.$off('goodsItemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>
