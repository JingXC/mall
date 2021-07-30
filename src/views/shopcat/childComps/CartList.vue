<template>
  <div class="cart_list">
    <cart-list-item v-for="(item,index) in cartList" :product="item"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import CartListItem from "@/views/shopcat/childComps/CartListItem";
export default {
  name: "CartList",
  components:{
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>

</style>
