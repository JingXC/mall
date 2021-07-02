<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="isFontColorActive">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#ff8198'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) != -1
    },
    isFontColorActive() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    btnClick() {
      this.$router.replace(this.path)
    }
  }

}
</script>

<style scoped>
.tab-bar-item {
  height: 49px;
  flex: 1;
  font-size: 14px;
  text-align: center;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
}

</style>
