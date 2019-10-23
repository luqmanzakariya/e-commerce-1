<template>
  <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide
        caption="Gadget Candy"
        text="Experience buying a gadget like a candy"
        img-src="https://storage.cloud.google.com/gadgetcandy-image/carousel1.jpg"
      ></b-carousel-slide>


      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://storage.cloud.google.com/gadgetcandy-image/carousel2.jpeg"></b-carousel-slide>
      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          src="https://storage.cloud.google.com/gadgetcandy-image/carousel3.png"
          alt="image slot"
        >
      </b-carousel-slide>

    </b-carousel>
<!-- 
    <p class="mt-4">
      Slide #: {{ slide }}<br>
      Sliding: {{ sliding }}
    </p> -->
  </div>
</template>

<script>

  import blabla from '../assets/carousel-1.jpg'

  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>
