<template>
  <div>
    <h1 class="mb-2 headerTitle">Admin Page</h1>
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

    <b-card>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 newProduct">
            <h5>Create New Product</h5>
            <form @submit.prevent="createProduct()">
              <div class="form-group text-left">
                <label class="productTitle">Product Name</label>
                <input v-model="input.name" type="text" class="form-control productSub" placeholder="Put product name...">
              </div>

              <div class="form-group text-left">
                <label for="exampleFormControlTextarea1" class="productTitle">Product Description</label>
                <textarea v-model="input.description" class="form-control productSub" id="exampleFormControlTextarea1" rows="3" placeholder="Product description..."></textarea>
              </div>

              <div class="custom-file text-left">
                <label for="customFile" class="productTitle">Product Image</label>
                <label class="custom-file-label" for="customFile">Choose picture</label>
                <p><sub>Upload product image is required</sub></p>
                <input @change="inputFile" type="file" class="custom-file-input productSub" id="customFile">
              </div>
              
              <div class="form-group text-left">
                <label class="productTitle">Price</label>
                <input v-model="input.price" type="number" class="form-control productSub" placeholder="Product price...">
              </div>

              <div class="form-group text-left">
                <label class="productTitle">Stock</label>
                <input v-model="input.stock" type="number" class="form-control productSub" placeholder="Product stock...">
              </div>
              <button type="submit" class="btn btn-primary mt-2 productSub">Submit</button>
            </form>
        
          </div>

          <div class="col-sm-9">
            <div>
              <h5>Order Status</h5>
              <table class="table">
                <thead class="thead-dark">
                  <tr class="productTitle">
                    <th scope="col">#</th>
                    <th scope="col">Customer's Name</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order, index) in allOrders" :key="order._id" class="productSub">
                    <th scope="row">{{index+1}}</th>
                    <td>{{order.UserId.name}}</td>
                    <td>{{order.product.name}}</td>
                    <td>{{order.quantity}} </td>
                    <td>{{order.product.price}}</td>
                    <td>{{order.product.price * order.quantity}}</td>
                    <td>{{order.status}} </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="card">
            <!-- <img src="..." class="card-img-top" alt="..."> -->
              <div class="card-body">
                <h5 class="card-title">Total Profit</h5>
                <p class="card-text">{{total}}</p>
                <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import ax from '../../config/axios'

export default {
  name: "admin",
  data(){
    return {
      input: {
        name: '',
        description: '',
        price: '',
        file: '',
        stock: ''
      },
      allOrders : [],
      total: 0
    }
  },
  methods: {
    // ================== Penting untuk upload image ================== 
    inputFile(e) {
      this.input.file = e.target.files[0]
    },
    createProduct(){
      this.$refs['modal-loading'].show()
      console.log('masuk create product', this.input)
      let formData = new FormData()
      formData.append('name', this.input.name)
      formData.append('description', this.input.description)
      formData.append('file', this.input.file)
      formData.append('price',this.input.price)
      formData.append('stock',this.input.stock)
      
      ax({
        url: `/products/create`,
        method: `post`,
        data: formData,
        headers: {
        'token': localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$refs['modal-loading'].hide()
          this.$router.push(`/shop`)
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Product has been created',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err)=>{
          this.$refs['modal-loading'].hide()
          console.log(err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${(err.response.data.message).substr(27)}`,
          })
        })
    }
  },
  created(){
    ax({
      url: `/carts/allOrder`,
      method: `get`,
      headers: {
      'token': localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.allOrders = data
        console.log(this.allOrders)
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
  h5 {
    font-family: 'Righteous', cursive;
  }
  .newProduct {
    border-right: 2px solid black;
  }
  .headerTitle{
    font-family: 'Righteous', cursive;
  }
</style>