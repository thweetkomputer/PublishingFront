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
import store from '../store'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Index',
        redirect: { name: 'Books' },

    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { title: "登录" }
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
        name: 'Article',
        component: () =>
            import ('../views/main/AddArticle'),
        // beforeEnter:(to,from,next)=>{
        //   if(store.state.userInfo.token){
        //     next()
        //   }
        //   else{
        //     next('/books')
        //   }
        // }
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('../views/search/search')
    },
    {
        path: '/vip',
        name: 'Vip',
        component: () =>
            import ('../views/Vip')
    },
    {
        path: 'unlogin',
        name: 'unLogin',
        component: () =>
            import ('../views/unLogin'),
        beforeEnter: (to, from, next) => {
            if (store.state.userInfo.token) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/article',
        name: 'Article',
        component: () =>
            import ('../views/Article')
    },
    {
        path: '/content',
        name: 'Content',
        component: () =>
            import ('../views/Content')
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { title: "登录" }
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
        path: '/Homepage',
        name: 'Homepage',
        component: () =>
            import ('../views/Homepage')
    },
    {
        path: '/EditInformation',
        name: 'EditInformation',
        component: () =>
            import ('../views/EditInformation')
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
        name: 'Article',
        component: () =>
            import ('../views/main/AddArticle')
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('../views/search/search')
    },
    {
        path: '/vip',
        name: 'Vip',
        component: () =>
            import ('../views/Vip')
    },
    {
        path: 'unlogin',
        name: 'unLogin',
        component: () =>
            import ('../views/unLogin'),
        beforeEnter: (to, from, next) => {
            if (store.state.userInfo.token) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/article',
        name: 'Article',
        component: () =>
            import ('../views/Article')
    },
    {
        path: '/content',
        name: 'Content',
        component: () =>
            import ('../views/Content')
    },
    {
        path: '/submit',
        name: 'submit',
        component: () =>
            import ('../views/SubmitArticle')
    },
    {
        path: '/review',
        name: 'review',
        component: () =>
            import ('../views/review')
    },
    {
        path: '/collect',
        name: 'collect',
        component: () =>
            import ('../views/Collect')
    },
    {
        path: '/message',
        name: 'message',
        component: () =>
            import ('../views/Message')
    },
    {
        path: '/addreader',
        name: 'addreader',
        component: () =>
            import ('../views/AddReader')
    },
    {
        path:'/article_reviewed',
        name:'article_reviewed',
        component: ()=>import('../views/ArticleReviewed')
    },
    {
        path:'/publish',
        name:'publish',
        component: ()=>import('../views/publish')
    },
    {
        path:'/checkarticle',
        name:'checkarticle',
        component: ()=>import('../views/CheckArticle')
    },
    {
        path:'/readercontent',
        name:'readercontent',
        component: ()=>import('../views/ReaderContent')
    }

]
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router