<template>
  <div class="home">
    <b-container fluid>
      <Carousel></Carousel>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Carousel from '@/components/Carousel.vue'


export default {
  name: 'home',
  components: {
    Carousel
  },
  data(){
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .home{
    width: 100%;
  }
  .container-fluid{
    padding: 0
  }
</style>
