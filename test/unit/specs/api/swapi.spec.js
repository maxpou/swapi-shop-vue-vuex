import axios from 'axios'
import swapiResponse from './swapi.response.json'
import * as swapi from '@/api/swapi'

describe('swapi HTTP', () => {
  it('getStarships() should return the response data', (done) => {
    const stubResponse = { status: 200, statusText: 'OK', data: swapiResponse }
    const stubGet = sinon.stub(axios, 'get').returns(Promise.resolve(stubResponse))

    swapi.getStarships(2).then(data => {
      expect(data).to.deep.equal(swapiResponse)
      stubGet.restore()
      done()
    })
  })

  it('getStarships() should return the response data without parameter', (done) => {
    const stubResponse = { status: 200, statusText: 'OK', data: swapiResponse }
    const stubGet = sinon.stub(axios, 'get').returns(Promise.resolve(stubResponse))

    swapi.getStarships().then(data => {
      expect(data).to.deep.equal(swapiResponse)
      stubGet.restore()
      done()
    })
  })
})
