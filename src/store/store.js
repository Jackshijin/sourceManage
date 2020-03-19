import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    curSourceName: '',
    curSourceType: '',
    userInfo: !localStorage.getItem('userInfo') ? {} : JSON.parse(localStorage.getItem('userInfo')),
    pageSize: 10 // 每页请求多少条数据
  },
  mutations: {
    getSourceName (state, name) {
      state.curSourceName = name
    },
    getSourceType (state, type) {
      state.curSourceType = type
    },
    [types.SAVE_USERINFO] (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    saveUserInfo ({ commit }, data) {
      commit(types.SAVE_USERINFO, data)
    }
  }
})

export default store
