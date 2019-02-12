<template>
  <div id="login">
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>

    <br/>
    <br/>
    <a href="">Forgot your password</a>
    <br/>
    <a href="">Sign up</a>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        input: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        if (this.input.username !== '' && this.input.password !== '') {
          if (this.input.password === this.$parent.mockAccount.password) {
            this.$cookies.set('user', this.input.username)
            this.$emit('authenticated', true)
            this.$router.replace({ name: 'secure' })
          } else {
            alert('The username and / or password is incorrect')
          }
        } else {
          alert('A username and password must be present')
        }
      }
    }
  }
</script>

<style scoped>
</style>
