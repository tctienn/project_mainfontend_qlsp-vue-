import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import DetailProDuct from '../views/DetailProduct.vue';
import ErroPage from '@/views/ErroPage.vue'
import DetailBlog from '@/views/DetailBlog.vue';
import collecttion from '@/views/Collecttion.vue'
import Login from '@/views/login.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
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
      name: 'login',
      component: Login
    },

    
    { 
        path: '/:pathMatch(.*)*', 
        component: ErroPage 
    } // lỗi đườn dẫn
  ]
})

export default router
