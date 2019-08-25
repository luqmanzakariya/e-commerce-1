<template>
  <div id="app">
    <!-- ===== Modal Register ===== -->
    <div>
      <b-modal ref="modal-register" id="modal-register" centered title="Register" hide-footer >
        <div class="modal-body">
          <div class="container-fluid">
            <div class="d-flex justify-content-center">
              <form @submit.prevent="registerUser()" id="registerForm" class="form d-flex flex-column">
                <input v-model="register.name" class="login-register" type="text" placeholder="Input your name">
                <input v-model="register.email" class="login-register" type="text" placeholder="Input your email">
                <input v-model="register.password" class="login-register" type="password"
                  placeholder="Input your password">
                <button type="submit" class="modal-button btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <!-- ===== Modal Login ===== -->
    <div>
      <b-modal class="modal" ref="modal-login" id="modal-login" centered title="Login" hide-footer >
        <div class="modal-body">
          <div class="container-fluid">
            <div class="d-flex justify-content-center">
              <form @submit.prevent="loginUser()" class="form d-flex flex-column">
                <input v-model="login.email" class="login-register" type="text" placeholder="Input your email">
                <input v-model="login.password" class="login-register" type="password"
                  placeholder="Input your password">
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </b-modal>
    </div>

    <!-- ===== Modal Loading ===== -->
    <div>
      <b-modal ref="modal-loading" id="modal-loading" centered title="Login" hide-footer hide-header no-close-on-backdrop>
        <div class="modal-body">
          <div class="text-center">
            <a class="loading-font"> Please Wait </a>
          </div>
          <div class="text-center">
            <br>
            <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="secondary" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="danger" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="warning" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="info" type="grow" label="Spinning"></b-spinner>
            <b-spinner variant="dark" type="grow" label="Spinning"></b-spinner>
          </div>
        </div>
      </b-modal>
    </div>

    <div>
      <b-container class="navheader p-0" fluid>
        <div class="layerNav">
          <b-row align-v="center">
            <b-col md=3>
              <img alt="Gadget Candy" class="img-fluid pl--5" src="./assets/logo.png" height="100px">
            </b-col>
            <b-col md=6 class="flex-column">
              <div id="nav headers">
                <router-link class="headers" to="/">Home</router-link>
                <router-link @click.native="showHide()" class="headers" to="/shop"> | Shop</router-link>
                <router-link v-if="$store.state.isLogin" class="headers" to="/carts"> | Cart </router-link>
                <router-link v-if="$store.state.isLogin" class="headers" to="/orderStatus"> | Order</router-link> 
                <router-link v-if="$store.state.isAdmin" class="headers" to="/admin"> | Admin</router-link>
              </div>
              <!-- <SearchBar></SearchBar> -->
            </b-col>
            <b-col md=3 class="d-flex justify-content-center">
              <h5 v-if="!$store.state.isLogin" v-b-modal.modal-register class="headers">Register</h5>
              <h5 v-if="!$store.state.isLogin" v-b-modal.modal-login class="headers ml-3">Login</h5>
              <h5 v-if="$store.state.isLogin" @click.prevent="logoutUser" class="headers ml-3">Logout</h5>
            </b-col>
          </b-row>
        </div>

      </b-container>
    <router-view/>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import Carousel from '@/components/Carousel.vue'
import ListProducts from '@/components/ListProducts.vue'
import balbabla from './assets/header.jpeg'
import ax from '../config/axios'

export default {
  name: 'home',
  components: {
    Carousel, SearchBar, ListProducts
  },
  data(){
    return {
      register: {
        name: '',
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      },
      isAdmin: false
    }
  },
  methods: {
    registerUser(){
      console.log('masuk register user')
      ax({
        url: '/users/register',
        method: 'post',
        data: this.register
      })
        .then(({data})=>{
          this.$refs['modal-register'].hide()
          // this.dataDefault()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Register success, please login',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message).substr(24)}`,
          })
          console.log(err)
        })
    },
    loginUser(){
      ax({
        url: `/users/login`,
        method: 'post',
        data: this.login
      })
        .then(({ data }) => {
          console.log('ini data', data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          localStorage.setItem('email', data.email)
          localStorage.setItem('isAdmin', data.isAdmin)
          if (localStorage.getItem('isAdmin') === 'true'){
            console.log('==============')
            this.$store.commit('set_isAdmin', true)
          }
          

          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500
          })
          this.$refs['modal-login'].hide()
          this.$store.commit('changeLogin', true)
          this.dataDefault()

        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message)}`,
          })
        })
    },
    logoutUser(){
      console.log('masuk logout user')
      localStorage.clear()
      this.$store.commit('changeLogin', false)
      this.$store.commit('set_isAdmin', false)
      this.$router.push('/')
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Logout success',
        showConfirmButton: false,
        timer: 1500
      })
    },
    showHide(){
      console.log('click tomboh shop')
      this.$store.state.hidePage = true
    },
    dataDefault(){
      this.register.name = '',
      this.regster.email = '',
      this.register.password = ''
      this.login.email = ''
      this.login.password = ''
    }
  },
  created(){
    this.$store.state.hidePage = true
    if (localStorage.getItem('token')){
      this.$store.commit('changeLogin', true)
    }

    if (localStorage.getItem('isAdmin') === 'true'){
      console.log('==============')
      this.$store.commit('set_isAdmin', true)
    }
  }
}
</script>

<style>
/* 
font-family: 'Righteous', cursive;
font-family: 'Permanent Marker', cursive;
font-family: 'Oswald', sans-serif;
font-family: 'Roboto Condensed', sans-serif; 
*/
.headers{
  font-family: 'Righteous', cursive;
  cursor: pointer;
  transition: 0.2s;
  color: white;
}
.headers:hover{
  font-family: 'Oswald', sans-serif;
  cursor: pointer;
  font-weight: bold;
  font-size: 25px;
  color: #6AC9EC;
}
.navheader{
  background-image: url('./assets/header.jpeg')
}
.layerNav{
  background-color: rgba(0, 0, 0, 0.637);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 0
  /* background-image: url('./assets/background.jpg');
  background-color: #cccccc; */
}

#nav {
  padding: 30px;
  color: white;
}

.login-register{
  border: none;
  background-color: transparent;
  outline: none;
  text-align: center;
  border-bottom: 1px solid rgb(165, 165, 165);
  margin-bottom: 10px;
  font-family: 'Roboto Condensed', sans-serif;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #E74430;
}
</style>
