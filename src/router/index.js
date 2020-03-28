import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login'
import Home from '../components/home/home'
import Info from '../components/home/selfInfo'
import Source from '../components/source/sourceList'
import ApplyList from '../components/list/applyList'
import RepairList from '../components/list/repairList'
import MyApply from '../components/list/myApply'
import ApplyDetail from '../components/list/applyDetail'
import RepairDeal from '../components/list/repairDeal'
import Apply from '../components/source/sourceApply'
import Refresh from '../components/source/refresh'
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
          path: '/source',
          component: Source
        },
        {
          name: 'sourceApply',
          path: '/sourceApply',
          component: Apply
        },
        {
          name: 'sourceRepair',
          path: '/sourceRepair',
          component: Repair
        },
        {
          name: 'selfInfo',
          path: '/info',
          component: Info
        },
        {
          name: 'applyList',
          path: '/applyList',
          component: ApplyList
        },
        {
          name: 'repairList',
          path: '/repairList',
          component: RepairList
        },
        {
          name: 'refresh',
          path: '/refresh',
          component: Refresh
        },
        {
          name: 'myApply',
          path: '/myApply',
          component: MyApply
        },
        {
          name: 'applyDetail',
          path: '/applyDetail',
          component: ApplyDetail
        },
        {
          name: 'repairDeal',
          path: '/repairDeal',
          component: RepairDeal
        }
      ]
    }
  ],
  mode: 'history'
})
