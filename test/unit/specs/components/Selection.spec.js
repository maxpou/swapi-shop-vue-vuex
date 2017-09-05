import Vue from 'vue'
import Vuex from 'vuex'
import Selection from '@/components/Selection'
import store from '../../../../src/store'
import swapiResponse from '../api/swapi.response.json'

describe('Selection.vue', () => {
  it('test initial rendering', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      store,
      components: {
        'test': Selection
      }
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('h2').length).to.equal(0)
        done()
      })
      .catch(done)
  })

  it('test conditional rendering', (done) => {
    const mockedStore = {
      getters: {
        mySelection (state) {
          return swapiResponse.results.filter(starship => {
            return starship.name === 'Death Star' || starship.name === 'X-wing'
          })
        }
      }
    }

    const vm = new Vue({
      template: '<div><test></test></div>',
      store: new Vuex.Store(mockedStore),
      components: {
        'test': Selection
      }
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('h2').length).to.equal(1)
        expect(vm.$el.querySelector('h2').textContent).to.equal('My selection')
        expect(vm.$el.querySelectorAll('div.item').length).to.equal(2)
        done()
      })
      .catch(done)
  })
})
