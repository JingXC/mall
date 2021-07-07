<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isEmit: true
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    swiperImgLoad() {
      if (this.isEmit) {
        this.$emit('swiperImgLoad')
        this.isEmit = false
      }
    }
  }
}
</script>

<style scoped>

</style>
