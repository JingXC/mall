import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import ("views/home/Home");
const Category = () => import("views/category/Category");
const ShopCat = () => import("views/shopcat/ShopCat");
const ProFile = () => import("views/profile/ProFile");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/shopCat',
    component: ShopCat
  },
  {
    path: '/proFile',
    component: ProFile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
