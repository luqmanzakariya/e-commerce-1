import Vue from 'vue'
import Vuex from 'vuex'
import ax from '../config/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    page: '',
    allProducts: [],
    isAdmin: false,
    productDetails: {},
    carts: [],
    hidePage: true
  },
  mutations: {
    changeLogin (state, payload) {
      state.isLogin = payload
    },
    page (state, payload) {
      state.page = payload
    },
    set_allProducts (state, payload){
      state.allProducts = payload
    },
    set_isAdmin (state, payload){
      state.isAdmin = payload
    },
    set_productDetails (state, payload){
      state.productDetails = payload
    }
  },
  actions: {
    listProducts(context, payload){
      ax({
        url: '/products/findAll',
        method: 'get'
      })
        .then(({data})=>{
          
          context.commit('set_allProducts', data)
          
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
})
