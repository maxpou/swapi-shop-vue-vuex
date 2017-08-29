import Vue from 'vue'
import Selection from '@/components/Selection'
import store from '../../../../src/store'

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
        expect(vm.$el.querySelectorAll('h2').length).to.equal(1)
        expect(vm.$el.querySelector('h2').textContent).to.equal('My selection')
        done()
      })
      .catch(done)
  })
})
