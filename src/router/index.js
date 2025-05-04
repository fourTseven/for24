import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/book/:id',
    name: 'BookDetail',
    component: () => import('@/views/BookDetail.vue')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('@/views/Library.vue')
  },
  {
    path: '/bookshelf',
    name: 'Bookshelf',
    component: () => import('@/views/Bookshelf.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/bbs',
    name: 'BBS',
    component: () => import('@/views/BBS.vue')
  },
  {
    path: '/daily',
    name: 'Daily',
    component: () => import('@/views/Daily.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('@/views/Join.vue')
  },
  {
    path: '/personal',
    name: 'PersonalCenter',
    component: () => import('@/views/PersonalCenter.vue')
  },
  {
    path: '/history',
    name: 'ReadingHistory',
    component: () => import('@/views/ReadingHistory.vue')
  },
  {
    path: '/settings',
    name: 'UserSettings',
    component: () => import('@/views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 