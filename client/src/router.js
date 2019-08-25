import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Admin from './views/Admin.vue'
import ProductDetail from './views/ProductDetails.vue'
import EditProduct from './views/EditProduct.vue'
import OrderStatus from './views/OrderStatus.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/carts',
      name: 'cart',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/edit/:id',
      name: 'editProduct',
      component : EditProduct
    },
    // {
    //   path: '/details/:id',
    //   name: 'productDetail',
    //   component : ProductDetail
    // },
    {
      path: '/orderStatus',
      name: 'orderStatus',
      component : OrderStatus
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { 
          path: ':id', 
          component: ProductDetail 
        },

        // ...other sub routes
      ]
      
    },

  ]
})
