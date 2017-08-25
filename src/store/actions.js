import * as types from './mutation-types'

export const addToSelection = ({ commit }, starship) => {
  commit(types.ADD_TO_SELECTION, { starship })
}
