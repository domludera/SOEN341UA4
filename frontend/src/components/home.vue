<template>
  <div id="home">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <h1>Andrew Marcos & Michael Hanna</h1>
    <a  v-if="like">  <i v-on:click="ToggleColor" class="fa fa-heart" style="font-size:20px;color:darkred"></i></a>
    <a v-else="like">  <i v-on:click="ToggleColor" class="fa fa-heart" style="font-size:20px;color:grey"></i></a>
      <a> {{counterLike}} </a>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        like: false,
        counterLike: 78
      }
    },
    methods: {
      ToggleColor () {
        if (this.like === true) {
          this.like = false
          this.counterLike--
        } else if (this.like === false) {
          this.like = true
          this.counterLike++
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
