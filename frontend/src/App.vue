<template>
  <div id='app'>
    <router-view @authenticated='setAuthenticated' />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        authenticated: false,
        mockAccount: {
          username: '123',
          password: '123'
        }
      }
    },
    mounted () {
      if (!this.authenticated) {
        this.$router.replace({ name: 'login' })
      }
    },
    methods: {
      setAuthenticated (status) {
        this.authenticated = status
      }
    }
  }
</script>

<style>
  body {
    background-color: #F0F0F0;
  }
  h1 {
    padding: 0;
    margin-top: 0;
  }
  #app {
    width: 1024px;
    margin: auto;
  }
</style>
