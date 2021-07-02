<template>
  <div class="recommend-view">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommend-view {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0px 20px;
  border-bottom: 8px solid #eee;
}

.recommend-view img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}

.recommend-item {
  flex: 1;
}
</style>
