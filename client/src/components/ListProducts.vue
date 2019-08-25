<template>
  <div class="listProducts">

    <div class="row d-flex justify-content-center mt-2">
      <b-card
        v-for="product in $store.state.allProducts" :key="product.id" 
        :title="product.name"
        :img-src="product.fileUrl"
        img-alt="Image"
        img-top
        style="width: 20rem"
        class="productTitle mb-2 mr-3"
      >
        <b-card-text class="productSub">
          {{product.description}}
        </b-card-text>

        <b-card-text class="productSub">
          Price: {{product.price}}
        </b-card-text>

        <b-card-text class="productSub">
          Available Stock: {{product.stock}}
        </b-card-text>

        <div @click.prevent="detail(product._id)" slot="footer"><small class="cart">&#128722; See Details</small></div>
        <div v-if="$store.state.isAdmin" @click.prevent="editProduct(product._id)" slot="footer"><small class="cart">&#10000; Edit</small></div>
        <div v-if="$store.state.isAdmin" @click.prevent="deleteProduct(product._id)" slot="footer"><small class="cart">&#128465; Delete</small></div>
      </b-card>
    </div>
    
  </div>
</template>

<script>
import ax from '../../config/axios'

export default {
  name: "ListProducts",
  data(){
    return{
      allProducts: []
    }
  },
  methods: {
    detail(id){
      console.log('masuk detail', id)
      ax({
        url: `/products/product/${id}`,
        method: 'get'
      })
        .then(({data})=>{

          // this.$router.push(`/details/${id}`)
          this.$store.state.hidePage = false
          this.$router.push(`/shop/${id}`)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    editProduct(id){
      this.$router.push(`/edit/${id}`)
    },
    deleteProduct(id){
      console.log('masuk delete product', id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        console.log('======= delete', id)
        if (result.value) {
        ax({
          url: `/products/${id}`,
          method: 'delete',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({data})=>{
            ax({
              url: '/products/findAll',
              method: 'get'
            })
              .then(({data})=>{
                this.$store.state.allProducts = data
                this.allProducts = this.$store.state.allProducts
                
              })
              .catch((err)=>{
                console.log(err)
              })  
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      })

    }
  },
  created(){
    ax({
      url: '/products/findAll',
      method: 'get'
    })
      .then(({data})=>{
        this.$store.state.allProducts = data
        this.allProducts = this.$store.state.allProducts
        
      })
      .catch((err)=>{
        console.log(err)
      })
      

    // Tanya kenapa kalo pake yang dibawah ini gak ke fetch
    // this.$store.dispatch('listProducts')
    // this.allProducts = this.$store.state.allProducts
    
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
  .productTitle{
    font-family: 'Oswald', sans-serif;
  }
  .productSub{
     font-family: 'Roboto Condensed', sans-serif; 
  }
  .listProducts{
    padding-left: 2%;
    padding-right: 2%
  }
  .card-img-top{
    height: 180px;
    width: 10px
  }
  .cart {
    color: black
  }
  .cart:hover {
    color: red;
    cursor: pointer
  }
</style>