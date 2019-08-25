<template>
  <div>
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


    <h1 class="mb-2 headerTitle">Edit Product Details</h1>
    <b-card>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-3 newProduct">
            <h5 class="productTitle">Create New Product</h5>
            <form @submit.prevent="editProduct()">
              <div class="form-group text-left">
                <label class="productTitle">Product Name</label>
                <input v-model="input.name" type="text" class="form-control productSub" placeholder="Put product name...">
              </div>

              <div class="form-group text-left">
                <label class="productTitle" for="exampleFormControlTextarea1">Product Description</label>
                <textarea v-model="input.description" class="form-control productSub" id="exampleFormControlTextarea1" rows="3" placeholder="Product description..."></textarea>
              </div>

              <div class="custom-file text-left">
                <label for="customFile">Product Image</label>
                <label class="custom-file-label" for="customFile">Choose picture</label>
                <p class="productSub"><sub>Product image will still shown the previous picture</sub></p>
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
              <button type="submit" class="btn btn-primary mt-2">Submit</button>
            </form>
        
          </div>

          <div class="col-sm-9">
            <h5 class="productTitle">Product Details</h5>
            <div class="card">
              <img :src="input.fileUrl" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title productTitle">{{input.name}}</h5>
                <p class="card-text productSub">{{input.description}}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item productSub"> <strong> Price: </strong> {{input.price}} </li>
                <li class="list-group-item productSub"> <strong> Stock: </strong> {{input.stock}} </li>
              </ul>
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
  data(){
    return {
      input :{
        _id : '',
        name: '',
        description: '',
        fileUrl: '',
        file: '',
        price: 0,
        stock: 0,
      }
    }
  },
  methods: {
    inputFile(e) {
      this.input.file = e.target.files[0]
    },
    editProduct(){
      this.$refs['modal-loading'].show()
      console.log('masuk submit edit product')
      let formData = new FormData()
      formData.append('name', this.input.name)
      formData.append('description', this.input.description)
      formData.append('file', this.input.file)
      formData.append('price',this.input.price)
      formData.append('stock',this.input.stock)

      ax({
        url: `/products/${this.$route.params.id}`,
        method: 'patch',
        data: formData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data})=>{
          this.$refs['modal-loading'].hide()
          console.log(data)
          this.$router.push(`/shop`)
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Product has been updated',
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
            text: `${(err.response.data.message)}`,
          })
        })
      
    }
  },
  created(){
    ax({
      url: `/products/product/${this.$route.params.id}`,
      method: 'get',
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .then(({data})=>{
        this.input._id = data._id
        this.input.name = data.name
        this.input.description = data.description
        this.input.fileUrl = data.fileUrl
        this.input.price = data.price
        this.input.stock = data.stock



      })
      .catch((err)=>{
        console.log(err)
      })
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
  .headerTitle{
    font-family: 'Righteous', cursive;
  }
</style>