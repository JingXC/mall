<template>
  <div class="bottom_bar">
    <div class="bottom_checkAll" @click="bottomCheckAllClick">
      <check-button class="check_btn" :is-check="isCheckAll"/>
      <span>全选</span>
    </div>
    <div class="bottom_center">
      合计：{{ totalPrice }}
    </div>
    <div class="bottom_calc">
      去结算({{ checkedSize }})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.isCheck
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkedSize() {
      return this.cartList.filter(item => item.isCheck).reduce((count, item) => {
        return count + item.count
      }, 0)
    },
    isCheckAll() {
      if (this.cartList.length === 0) return false

      //return !(this.cartList.filter(item=> !item.isCheck).length)
      return !this.cartList.find(item => !item.isCheck)
    }
  },
  methods: {
    bottomCheckAllClick() {
      if (this.isCheckAll) {
        this.cartList.forEach(item => item.isCheck = false)
      } else {
        this.cartList.forEach(item => item.isCheck = true)
      }
    }
  }
}
</script>

<style scoped>
.bottom_bar {
  height: 40px;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}

.bottom_checkAll {
  width: 70px;
  display: flex;
  text-align: center;
  align-items: center;
  margin-right: 15px;
}

.check_btn {
  margin: 0 8px;
  height: 22px;
  width: 22px;
  line-height: 24px;
}

.bottom_center {
  flex: 1;
}

.bottom_calc {
  width: 90px;
  background-color: var(--color-high-text);
  color: white;
  text-align: center;
}
</style>
