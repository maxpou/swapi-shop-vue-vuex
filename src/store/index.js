import Vue from 'vue'
import Vuex from 'vuex'
import starships from './modules/starships'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    starships
  },
  strict: debug
})

if (module.hot) {
  module.hot.accept([
    './modules/starships'
  ], () => {
    const starships = require('./modules/starships').default
    store.hotUpdate({
      modules: {
        starships
      }
    })
  })
}

export default store
