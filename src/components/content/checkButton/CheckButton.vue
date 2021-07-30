<template>
  <div class="check_btn" :class="{check:isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>
.check_btn {
  border: 1px solid #aaa;
  border-radius: 50%;
}

.check {
  border-color: var(--color-tint);
  background-color: var(--color-tint);
}
</style>
