import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DetailProDuct from '../views/DetailProduct.vue';
import ErroPage from '@/views/ErroPage.vue'
import DetailBlog from '@/views/DetailBlog.vue';
import collecttion from '@/views/Collecttion.vue'

import CartUser from '@/views/CartUser.vue';
import PayVNPay from '@/views/PayVNPay.vue';
import Profile from '@/views/Profile.vue';
import ChangePassword from '@/views/ChangePassword.vue';
import BlogList from '@/views/BlogList.vue';
import HistoryUser from '@/views/HistoryUser.vue';

const routes = [
  {
    path: '/',
    name: 'homes',
    component: Home
  },
  {
    path: '/product/detail/:id',
    name: 'product',
    component: DetailProDuct
  },
  {
    path: '/blog/detail/:id',
    name: 'blog',
    component: DetailBlog
  },
  {
    path: '/collecttion/',
    name: 'collecttion',
    component: collecttion
  },
  {
    path: '/login',
    name: 'logins',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/cart-user',
    name: 'cart',
    component: CartUser
  },
  {
    path: '/pay',
    name: 'pay',
    component: PayVNPay
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePassword
  },
  {
    path: '/bloglist',
    name: 'bloglist',
    component: BlogList
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryUser
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErroPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
