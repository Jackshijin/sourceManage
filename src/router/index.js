import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Home from '../components/home/home'
import Source from '../components/source/sourceList'
import Apply from '../components/source/sourceApply'
import Repair from '../components/source/sourceRepair'
import Register from '../components/login/register'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login'
    // },
    {
      name: 'login',
      path: '/',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          name: 'source',
          path: 'source',
          component: Source
        },
        {
          name: 'sourceApply',
          path: 'sourceApply',
          component: Apply
        },
        {
          name: 'sourceRepair',
          path: 'sourceRepair',
          component: Repair
        }
      ]
    }
  ],
  mode: 'history'
})
