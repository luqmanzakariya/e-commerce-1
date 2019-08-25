<template>
  <div class="shop">
    <div class="layer"></div>
    <b-container fluid>
      <b-row>
        <ListProducts v-if="$store.state.hidePage"></ListProducts>
        
      </b-row>
      <b-row>
        <b-col cols="12">
          <router-view  v-if="!$store.state.hidePage" class="d-flex justify-content-center" style="width:100%"></router-view>

        </b-col>
      </b-row>
    </b-container>
  </div>

  
</template>

<script>
import ListProducts from '@/components/ListProducts.vue'

export default {
  name: 'shop',
  components: {
    ListProducts
  },
  created(){
    console.log('masuk created shop', this.$route.params.id)
  }
}
</script>

<style scoped>
  .shop{
    width: 100%;
    height: 100%;
    background-image: url('../assets/background-shop.jpg');
    
  }

  .layer{
    background-color: rgba(0, 0, 0, 0.294);
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .container-fluid{
    padding: 0
  }
</style>