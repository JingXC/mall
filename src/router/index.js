import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ("views/home/Home");
const Category = () => import("views/category/Category");
const ShopCat = () => import("views/shopcat/ShopCat");
const ProFile = () => import("views/profile/ProFile");
const Detail = ()=> import("views/detail/Detail")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showTab: true
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      showTab: true
    }
  },
  {
    path: '/shopCat',
    component: ShopCat,
    meta: {
      showTab: true
    }
  },
  {
    path: '/proFile',
    component: ProFile,
    meta: {
      showTab: true
    }
  },
  {
    path: '/detail/:iid',
    component: Detail,
    meta: {
      showTab: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
