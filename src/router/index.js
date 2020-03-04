import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Register from '../components/login/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    }
  ],
  mode: 'history'
})
