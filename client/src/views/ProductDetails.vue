<template>
  <div style="width:100%">

    <div class="backgroundWhite" style="width:100%">
      <h1 class="productTitle">Product Details</h1>
      <div>
        
        <div class="card d-flex justify-content-center">
          <div>
            <img :src="product.fileUrl" class="text-center" style="width: 300px; height: 300px">

          </div>
          <div class="card-body">
            <h5 class="card-title productTitle">{{product.name}}</h5>
            <p class="card-text productSub">{{product.description}}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item productSub"> <strong> Price: </strong> {{product.price}} </li>
            <li class="list-group-item productSub"> <strong> Stock: </strong> {{product.stock}} </li>
          </ul>
        </div>
      </div>

      <div class="row d-flex justify-content-center mt-3">
        <div class="col-sm-6">
          <h5 class="productTitle">How many items you want to buy?</h5>
          <div>
            <b-input-group>
              <b-input-group-prepend>
                <b-btn variant="outline-info" @click="num--">-</b-btn>
              </b-input-group-prepend>

              <b-form-input type="number" min="0.00" v-model="num"></b-form-input>

              <b-input-group-append>
                <b-btn variant="outline-secondary" @click="num++">+</b-btn>
              </b-input-group-append>
            </b-input-group>
          </div>
          <b-button @click="purchase" variant="primary" class="mt-2">Purchase</b-button>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
import ax from '../../config/axios'

export default {
  name: 'ProductDetails',
  data(){
    return {
      product: {},
      id: this.$route.params.id,
      products : [],
      stock: 0,
      num: 0
    }
  },
  methods: {
    purchase(){
      let input = {
        status: 'ordered',
        product: this.product._id,
        quantity: this.num,
        headers : {
          token: localStorage.getItem('token')
        }
      }
      console.log('masuk pruchase', input)
      
      ax({
        url: `/carts/create/${this.$route.params.id}`,
        method: 'post',
        data: input,
        headers: {
          token : localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Product added to cart',
            showConfirmButton: false,
            timer: 1500
          })
          this.$router.push(`/carts`)
          
        })
        .catch((err)=>{
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message)}`,
          })
        })
    }
  },
  created(){
    ax({
      url: `/products/product/${this.$route.params.id}`,
      method: 'get'
    })
      .then(({data})=>{
        console.log(data)
        this.$store.state.productDetails = data
        this.product = this.$store.state.productDetails
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
  .backgroundWhite{
    background-color: white;
  }
  .productTitle{
    font-family: 'Oswald', sans-serif;
  }
  .productSub{
     font-family: 'Roboto Condensed', sans-serif; 
  }
</style>