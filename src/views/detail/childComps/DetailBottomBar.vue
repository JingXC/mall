<template>
  <div class="detail-bottom-bar">
    <div class="left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.detail-bottom-bar {
  background-color: #fff;
  height: 49px;
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  text-align: center;
}

.left, .right {
  width: 50%;
  display: flex;
}

.left div {
  flex: 1;
}

.right div {
  height: 49px;
  text-align: center;
  font-size: 14px;
  line-height: 49px;
  flex: 1;
}

.left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 3px auto;
  background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
}

.left .service {
  background-position: 0 98px;
}

.left .shop {
  background-position: 0 52px;
}

.left .select {
  background-position: 0 1px;
}

.text {
  font-size: 14px;
}

.cart {
  background-color: #fff737;
  color: #666;
}

.buy {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
