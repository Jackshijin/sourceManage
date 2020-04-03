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
import Suggest from '../components/comment/suggest'
import Refresh from '../components/source/refresh'
import Repair from '../components/source/sourceRepair'
import Register from '../components/login/register'
import ChangePwd from '../components/personal/changePwd'
import MyArticle from '../components/personal/myArticle'
import Article from '../components/comment/article'
import ArticleAdd from '../components/comment/articleAdd'
import ArticleEdit from '../components/comment/articleEdit'
import ArticleDetail from '../components/comment/articleDetail'
import UserManage from '../components/user/userManage'

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
        },
        {
          name: 'suggest',
          path: '/suggest',
          component: Suggest
        },
        {
          name: 'changePwd',
          path: '/changePwd',
          component: ChangePwd
        },
        {
          name: 'article',
          path: '/article',
          component: Article
        },
        {
          name: 'articleAdd',
          path: '/articleAdd',
          component: ArticleAdd
        },
        {
          name: 'articleEdit',
          path: '/articleEdit',
          component: ArticleEdit
        },
        {
          name: 'articleDetail',
          path: '/articleDetail',
          component: ArticleDetail
        },
        {
          name: 'myArticle',
          path: '/myArticle',
          component: MyArticle
        },
        {
          name: 'userManage',
          path: '/userManage',
          component: UserManage
        }
      ]
    }
  ],
  mode: 'history'
})
