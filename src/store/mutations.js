import {ADD_COUNTER,ADD_TO_CART} from "@/store/mutation-type";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.isCheck = true
    state.cartList.push(payload)
  }
}
