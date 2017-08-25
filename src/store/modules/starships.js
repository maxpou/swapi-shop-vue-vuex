import * as swapi from '../../api/swapi'
import * as types from '../mutation-types'

// initial state
const state = {
  spaceships: [],
  currentPage: 1,
  itemCount: 0
}

// getters
const getters = {
  allStarships: state => state.spaceships,
  currentPage: state => state.currentPage,
  isFullyloaded: () => state.itemCount === state.spaceships.length
}

// actions
const actions = {
  loadStarships ({ commit }, page) {
    commit(types.CHANGE_PAGE, { page })
    swapi.getStarships(page).then(data => {
      commit(types.RECEIVE_STARSHIPS, { data })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_STARSHIPS] (state, { data }) {
    state.spaceships = state.spaceships.concat(data.results)
    state.itemCount = data.count
  },
  [types.CHANGE_PAGE] (state, { page }) {
    state.currentPage = page
  }
}

console.log(mutations)

export default {
  state,
  getters,
  actions,
  mutations
}
