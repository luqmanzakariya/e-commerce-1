<template>
  <div>
    <h1>Your Cart</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr class="productTitle">
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, index) in carts" :key="cart._id" class="productSub">
          <th scope="row">{{index+1}}</th>
          <td>{{cart.product.name}}</td>
          <td>{{cart.quantity}} </td>
          <td>{{cart.product.price}}</td>
          <td>{{cart.product.price * cart.quantity}}</td>
          <td>{{cart.status}} </td>
          <td @click.prevent="deleteCart(cart._id)" class="deleteCart"> &#128465; Delete</td>
        </tr>
      </tbody>
    </table>
    
    <div class="card productTitle">
    <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h5 class="card-title">The amount you need to pay</h5>
        <p class="card-text">{{total}}</p>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        <button @click.prevent="checkout()" class="btn btn-primary">Checkout</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import ax from '../../config/axios'

export default {
  data(){
    return {
      carts: [],
      total: 0
    }
  },
  methods: {
    deleteCart(id){
      console.log('masuk delete carts', id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          ax({
            url: `/carts/${id}`,
            method: 'delete',
            headers: {
              token: localStorage.getItem('token')
            }
          })
            .then(({data})=>{
              this.refreshData()
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Product has been deleted',
                showConfirmButton: false,
                timer: 1500
              })
            })
            .catch((err)=>{
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: `${(err.response.data.message)}`,
              })
            })
        }
      })

    },
    checkout(){
      console.log('masuk checkout')
      if (this.carts.length === 0){
        swal.fire(`You don't have anything to checkout`)
      }
      else {
        ax({
          url: `/carts/checkout`,
          method: 'post',
          data: this.carts,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data})=>{
            console.log(data)
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Thank you for purchasing with us!',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push('/orderStatus')
            
          })
          .checkout((err)=>{
            console.log(err)
          })
      }

    },
    refreshData(){
      console.log('masuk refresh data')
      ax({
        url: `/carts/myCarts`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$store.state.carts = data
          this.carts = this.$store.state.carts
          

          for (let cart of data){
            this.total += (cart.product.price * cart.quantity)
          }
    
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  created(){
    console.log('generated created carts')
    ax({
      url: `/carts/myCarts`,
      method: 'get',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.$store.state.carts = data
        this.carts = this.$store.state.carts
        
        console.log(this.carts)

        for (let cart of data){
          this.total += (cart.product.price * cart.quantity)
        }
   
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>

<style scoped>
  /* 
  font-family: 'Righteous', cursive;
  font-family: 'Permanent Marker', cursive;
  font-family: 'Oswald', sans-serif;
  font-family: 'Roboto Condensed', sans-serif; 
  */
  .productTitle{
    font-family: 'Oswald', sans-serif;
  }
  .productSub{
     font-family: 'Roboto Condensed', sans-serif; 
  }
  .deleteCart {
    font-family: 'Oswald', sans-serif;
  }
  .deleteCart:hover{
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
  }
  h1 {
    font-family: 'Righteous', cursive;
  }
</style>