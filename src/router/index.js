import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DetailProDuct from '../views/DetailProduct.vue';
import ErroPage from '@/views/ErroPage.vue'
import DetailBlog from '@/views/DetailBlog.vue';
import collecttion from '@/views/Collecttion.vue'

import CartUser from '@/views/CartUser.vue';
import PayVNPay from '@/views/PayVNPay.vue';
import Profile from '@/views/Profile.vue';

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
    path: '/:pathMatch(.*)*',
    component: ErroPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
