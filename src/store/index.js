import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import user from './modules/user'
import tab from './modules/tab'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    tab
  },
  plugins: [
    createPersistedstate({
      key: 'article_admin_system',
      paths: ['user']
    })
  ]
})
