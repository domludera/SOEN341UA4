<template>
  <div id="home">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <h1>bla bla blaaa.</h1>
    <p  v-if="like">  <i v-on:click="ToggleColor" class="fa fa-heart" style="font-size:24px;color:darkred"></i></p>
    <p v-else="like">  <i v-on:click="ToggleColor" class="fa fa-heart" style="font-size:24px;color:grey"></i></p>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        like: false
      }
    },
    methods: {
      ToggleColor () {
        if (this.like === true) {
          this.like = false
        } else if (this.like === false) {
          this.like = true
        }
      }
    }
  }
</script>
<style type="text/css">
.fa_custom_like {
color: #FFFFFF
}

</style>
