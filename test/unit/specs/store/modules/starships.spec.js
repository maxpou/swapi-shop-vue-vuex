import { expect } from 'chai'
import starshipsStore from '@/store/modules/starships'
const actionsInjector = require('inject-loader!@/store/modules/starships')
import swapiResponse from '../../api/swapi.response.json'

describe('starships store - getters', () => {
  it('return all starship', () => {
    const state = {
      starships: swapiResponse.results,
      currentPage: 1,
      itemCount: swapiResponse.count
    }

    const result = starshipsStore.getters.allStarships(state)
    expect(result).to.deep.equal(state.starships)
  })

  it('return the current page', () => {
    const state = {
      starships: swapiResponse.results,
      currentPage: 1,
      itemCount: swapiResponse.count
    }

    const result = starshipsStore.getters.currentPage(state)
    expect(result).to.equal(1)
  })

  it('return fully loaded statement', () => {
    const state = {
      starships: swapiResponse.results,
      currentPage: 1,
      itemCount: swapiResponse.count
    }

    const resultFalse = starshipsStore.getters.isFullyloaded(state)
    expect(resultFalse).to.be.false

    state.itemCount = 10
    const resultTrue = starshipsStore.getters.isFullyloaded(state)
    expect(resultTrue).to.be.true
  })
})

describe('starships store - mutations', () => {
  it('RECEIVE_STARSHIPS', () => {
    const state = {
      starships: [],
      currentPage: 1,
      itemCount: 0
    }

    starshipsStore.mutations.RECEIVE_STARSHIPS(state, { data: swapiResponse })
    expect(state.starships.length).to.equal(10)
    expect(state.itemCount).to.equal(37)
  })

  it('CHANGE_PAGE', () => {
    const state = {
      currentPage: 1
    }

    starshipsStore.mutations.CHANGE_PAGE(state, { page: 2 })
    expect(state.currentPage).to.equal(2)
    starshipsStore.mutations.CHANGE_PAGE(state, { page: 42 })
    expect(state.currentPage).to.equal(42)
  })
})

describe('starships store - actions', () => {
  const actions = actionsInjector({
    '../../api/swapi': {
      getStarships (page) {
        return new Promise(resolve => {
          resolve(swapiResponse)
        })
      }
    }
  })

  const testAction = (action, payload, state, expectedMutations, done) => {
    let count = 0

    // mock commit
    const commit = (type, payload) => {
      const mutation = expectedMutations[count]

      try {
        expect(mutation.type).to.equal(type)
        if (payload) {
          expect(mutation.payload).to.deep.equal(payload)
        }
      } catch (error) {
        done(error)
      }

      count++
      if (count >= expectedMutations.length) {
        done()
      }
    }

    // call the action with mocked store and arguments
    action({ commit, state }, payload)

    // check if no mutations should have been dispatched
    if (expectedMutations.length === 0) {
      expect(count).to.equal(0)
      done()
    }
  }

  it('should loadStarships', (done) => {
    const pageNum = 1
    const functionToTest = actions.default.actions.loadStarships

    testAction(functionToTest, pageNum, {}, [
      { type: 'CHANGE_PAGE', payload: { page: 1 } },
      { type: 'RECEIVE_STARSHIPS', payload: { data: swapiResponse } }
    ], done)
  })
})
