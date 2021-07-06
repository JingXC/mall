<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         :class="{active: currentIndex===index}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #ffffff;
  position: sticky;
  top: 44px;
}
.tab-control div{
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-high-text);
}
</style>
