<template>
  <div id="secure">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">Chirp.</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Trending</b-nav-item>
          <b-nav-item href="#" disabled>New</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{user}}</em>
            </template>
            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item class="logoutBtn" to='/login' v-on:click.native='logout()' replace>Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <b-container>
      <b-row style="text-align: center">


        <b-col class="mainColumns column1">
          <div class="jumbotron">
            <h1>Trending</h1>
            <p id="trendingChirps" v-for="item in Trending.trendingTweets">#{{ item.title }}</p>
          </div>
        </b-col>


        <b-col class="mainColumns column2" sm="6">
          <div class="jumbotron">
            <b-input-group>
              <b-input v-model="newChirp" placeholder="What's new?"></b-input>
              <b-btn v-on:click="addTweet">Post!</b-btn>
            </b-input-group>
          </div>



            <div class="feed" v-for="chirp in Feed.tweets">
              <p id="feedChirp">@{{chirp["author"]}}<br>
                {{ chirp["message"]}}
                <like-rt-btn></like-rt-btn>
              </p>

            </div>

        </b-col>


        <b-col class="mainColumns column3">
          <div class="jumbotron">
            <div class="profilePic">profilePic</div>
            <div class="profileStats">profileStats</div>

          </div>
        </b-col>
      </b-row>
    </b-container>
    </div>
</template>

<script>
  import Feed from '../../static/feed.json'
  import Trending from '../../static/trending.json'
  import LikeRtBtn from './home'
  export default {
    name: 'Secure',
    components: {LikeRtBtn},
    data () {
      return {
        Feed,
        Trending,
        user: this.$cookies.get('user')
      }
    },
    methods: {
      logout () {
        this.authenticated = false
      },
      addTweet () {
        this.Feed.tweets.unshift({'author': this.user, 'message': this.newChirp})
        this.newChirp = ''
      }
    }
  }
</script>

<style scoped>
  .logoutBtn{
    text-decoration: none;
    background-color: lightcoral;
    color: white;
  }
  .mainColumns{
    min-height: 100px;
    max-height: fit-content;
  }

  .jumbotron{
    margin-top: 10px;
    padding: 0;
    background-color: white;
  }

  .feed{
    margin-top: 5px;
    background-color: white;
    border-radius: 5px;
  }
  #feedChirp{
    margin: auto;
    padding: 1.5em;
    border: aqua solid 1px;
    border-radius: 5px;
  }

  #trendingChirps{
    color: darkslategrey;
  }
</style>
