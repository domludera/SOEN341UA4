<template>
  <div class="container">
    <div class="jumbotron">
      <h1>Chirp.</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="usernameInput"
                    label="Username"
                    label-for="usernameInput">
        <b-form-input id="usernameInput1"
                      type="username"
                      v-model="form.username"
                      required
                      placeholder="Enter username">
        </b-form-input>
      </b-form-group>


      <b-form-group id="passwordInput"
                    label="Password"
                    label-for="passwordInput">
        <b-form-input id="passwordInput1"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <b-button to="Hello" type="submit" variant="primary">Submit</b-button>
      <b-button to="Hello" type="button" variant="danger">Reset</b-button>
    </b-form>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset (evt) {
        evt.preventDefault()
        /* Reset our form values */
        this.form.username = ''
        this.form.password = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => { this.show = true })
      }
    }
  }
</script>
<style>
  .jumbotron{
    background: white;
    color: darkslategrey;
    margin: 20%;
    box-shadow: 0 0 10px 1px grey;
  }
</style>
