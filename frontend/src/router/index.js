import Vue from 'vue'
import Router from 'vue-router'
import Hi from '@/components/Hi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hi',
      component: Hi
    }
  ]
})
