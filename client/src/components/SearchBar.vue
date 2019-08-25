<template>
  <div class="searchBar">
    <b-form-input class="normal searchBar" v-model="text" placeholder="Search your preferred gadget"></b-form-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    }
  }
</script>

<style scoped>
  .normal{
    font-family: 'Oswald', sans-serif;
    border: none;
    background-color: transparent;
    outline: none;
    text-align: center;
    border-bottom: 1px solid #FFFFFF;
    margin-bottom: 10px;
    /* font-family: 'Roboto Condensed', sans-serif; */
  }
  .searchBar{
    color: white;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: red;
    opacity: 1; /* Firefox */
  }
</style>