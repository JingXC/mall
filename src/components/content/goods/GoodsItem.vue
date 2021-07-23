<template>
  <div class="goods-item" @click="goodsItemClick">
    <!--@load图片加载完后执行goodsItemImgLoad方法-->
    <img :src="showImg" alt="" @load="goodsItemImgLoad">
    <div class="goods-info">
      <p>{{ goods.title }}</p>
      <span class="price">{{ goods.price }}</span>
      <span class="collect">{{ goods.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    //this.$bus为Vue的事件总线，此方法发出一个goodsItemImgLoad事件，其他组件可以监听此事件

    goodsItemImgLoad() {
      //首页和详情页图片load监听
      //方法一
      /*if (this.$route.path.indexOf('/home') != -1) {
        this.$bus.$emit('goodsItemImgLoad')
        console.log('goodsItemImgLoad')
      } else if (this.$route.path.indexOf('/detail') != -1) {
        this.$bus.$emit('detailGoodsItemImgLoad')
        console.log('detailGoodsItemImgLoad')
      }*/
      //方法二  mixin混入
      this.$bus.$emit('goodsItemImgLoad')
    },
    //点击进入详情页
    goodsItemClick() {
      this.$router.push('/detail/' + this.goods.iid)
    }
  },
  computed: {
    showImg() {
      return this.goods.image || this.goods.show.img
    }
  }
}
</script>

<style scoped>
.goods-item {
  width: 47%;
  position: relative;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
