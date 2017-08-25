import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  mySelection: state => state.all
}

// actions
const actions = {
}

// mutations
const mutations = {
  [types.ADD_TO_SELECTION] (state, { starship }) {
    state.all.push(starship)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
