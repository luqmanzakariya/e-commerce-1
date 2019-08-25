<template>
  <div>
    <h1>Order Status</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr class="productTitle">
          <th scope="col">#</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order._id" class="productSub">
          <th scope="row">{{index+1}}</th>
          <td>{{order.product.name}}</td>
          <td>{{order.quantity}} </td>
          <td>{{order.product.price}}</td>
          <td>{{order.product.price * order.quantity}}</td>
          <td>{{order.status}} </td>
          <td>{{(order.updatedAt).toString().substr(0,20)}}</td>
          <td v-if="order.status === 'purchased'" @click.prevent="receive(order._id)" class="confirm"> 	&#10004; Confirm receive</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ax from '../../config/axios'

export default {
  data(){
    return {
      orders: []
    }
  },
  methods: {
    receive(id){
      console.log('masuk received', id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I have received the item!'
      }).then((result) => {
        if (result.value) {
          ax({
            url: `/carts/received/${id}`,
            method: 'post',
            headers: {
              token : localStorage.getItem('token')
            }
          })
            .then(({data})=>{
              this.refresh()
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Thank you for purchasing with us, I hope you like your gadget',
                showConfirmButton: false,
                timer: 3000
              })
              console.log(data)
            })
            .then((err)=>{
              console.log(err)
            })
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
        }
      })

    },
    refresh(){
      ax({
        url: `/carts/orderStatus`,
        method: 'get',
        headers: {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.orders = data
          console.log(this.orders)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  created(){
    ax({
      url: `/carts/orderStatus`,
      method: 'get',
      headers: {
        token : localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.orders = data
        console.log(this.orders)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
}
</script>

<style scoped>
  .productTitle{
    font-family: 'Oswald', sans-serif;
  }
  .productSub{
     font-family: 'Roboto Condensed', sans-serif; 
  }
  .confirm{
    font-family: 'Righteous', cursive;
    cursor: pointer;
    transition: 0.2s;
    
  }
  .confirm:hover{
    font-family: 'Oswald', sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
  }
  h1 {
    font-family: 'Righteous', cursive;
  }
</style>