<template>
  <div id="home">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <a  v-if="retweet">  <i v-on:click="RetweetButton" class="fa fa-retweet" style="font-size:15px;color:#73cd00"></i></a>
    <a v-else="retweet">  <i v-on:click="RetweetButton" class="fa fa-retweet" style="font-size:15px;color:grey"></i></a>
    <a> {{counterRetweet}} </a>
&ensp;
    <a  v-if="like">  <i v-on:click="LikeButton" class="fa fa-heart" style="font-size:15px;color:darkred"></i></a>
    <a v-else="like">  <i v-on:click="LikeButton" class="fa fa-heart" style="font-size:15px;color:grey"></i></a>
    <a> {{counterLike}} </a>
  </div>
</template>

<script>
  export default {
    name: 'likeRtBtn',
    data () {
      return {
        like: false,
        retweet: false,
        counterRetweet: 50,
        counterLike: 78
      }
    },
    methods: {
      LikeButton () {
        if (this.like === true) {
          this.like = false
          this.counterLike--
        } else if (this.like === false) {
          this.like = true
          this.counterLike++
        }
      },
      RetweetButton () {
        if (this.retweet === true) {
          this.retweet = false
          this.counterRetweet--
        } else if (this.retweet === false) {
          this.retweet = true
          this.counterRetweet++
        }
      }
    }
  }
</script>
<style>

</style>
