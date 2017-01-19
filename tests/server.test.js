const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)

describe('Black box tests', () => {
  it('GET /index should return status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('GET an invalid url should return status code 404', (done) => {
    chai.request(server)
      .get('/an-invalid-url')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })
})
