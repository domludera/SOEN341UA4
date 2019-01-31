import Vue from 'vue'
import Router from 'vue-router'
import Hi from '@/components/Hi'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hi',
      component: Hi
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
