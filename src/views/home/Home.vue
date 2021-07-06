<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <b-scroll class="b-scroll"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"
              @scrollOn="scrollOn"
              @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"/>
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
      isBackTopShow: false
    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoodsList('pop')
    this.getHomeGoodsList('new')
    this.getHomeGoodsList('sell')
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
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    scrollOn(position) {
      this.isBackTopShow = (-position.y) > 1000 ? true : false
    },
    loadMore(){
      this.getHomeGoodsList(this.currentType)
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
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
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
