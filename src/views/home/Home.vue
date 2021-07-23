<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tc1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="istc1Show"/>
    <b-scroll class="b-scroll"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"
              @scrollOn="scrollOn"
              @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tc2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goodsList="goodsList[currentType].list"/>
    </b-scroll>
    <back-top @click.native="backTopClick" v-show="isBackTopShow"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BScroll from "@/components/content/bscroll/BScroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultiData, getHomeGoodsList} from "network/home";
import {itemListenerMixin} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BScroll,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffSetTop: 0,
      isBackTopShow: false,
      istc1Show: false,
      scrollY: 0
    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoodsList('pop')
    this.getHomeGoodsList('new')
    this.getHomeGoodsList('sell')
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
  activated() {
    //回来的时候回到记录的位置
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.scrollY, 10)
  },
  deactivated() {
    //离开的时候记录当前位置
    this.scrollY = this.$refs.scroll.getScrollY()
    //取消监听goodsItemImgLoad
    this.$bus.$off('goodsItemImgLoad', this.itemImgListener)
  },
  methods: {
    /**
     *页面方法相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tc1.currentIndex = index
      this.$refs.tc2.currentIndex = index
    },
    //回到顶部按钮点击
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //监听滑动位置
    scrollOn(position) {
      //滑动超过1000显示回到顶部按钮
      this.isBackTopShow = (-position.y) > 1000 ? true : false
      //是否fixed tc1
      this.istc1Show = (-position.y) > this.tabOffSetTop
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoodsList(this.currentType)
    },
    swiperImgLoad() {
      //获取tc2组件的offsetTop
      //获取offsetTop，组件不是DOM元素，是没有offsetTop的，无法通过.offsetTop来获取的。就需要通过$el来获取组件中的DOM元素
      //所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffSetTop = this.$refs.tc2.$el.offsetTop
    },
    /**
     * 网络请求相关
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoodsList(type) {
      const page = this.goodsList[type].page + 1
      getHomeGoodsList(type, page).then(res => {
        this.goodsList[type].list.push(...res.data.list)
        this.goodsList[type].page = page

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.b-scroll {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}
</style>
