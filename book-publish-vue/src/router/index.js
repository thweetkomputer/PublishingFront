import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Books from '../views/Books.vue'
import BookDetail from "../views/BookDetail";
import BookEdit from "../views/BookEdit";
import Signup from "../views/Signup";
import Blogs from "@/views/Blogs";
import BlogEdit from "@/views/BlogEdit";
import BlogDetail from "@/views/BlogDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: 'Books'}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/books',
    name: 'Books',
    component: Books
  },
  {
    path: '/book/add',
    name: 'BookEdit',
    component: BookEdit
  },
  {
    path: '/book/:bookId',
    name: 'BookDetail',
    component: BookDetail
  },
  {
    path: '/book/:bookId/edit',
    name: 'BookEdit',
    component: BookEdit
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/blog/add',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit
  },
  {
    path: '/add-article',
    name:'Article',
    component:()=>import('../views/main/AddArticle')
  },
  {
    path: '/search',
    name:'search',
    component: ()=>import('../views/search/search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
