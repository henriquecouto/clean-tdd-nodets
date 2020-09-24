import request from 'supertest'

let app

describe('Content-Type Middleware', () => {
  beforeEach(() => {
    jest.resetModules()
    app = require('../config/app').default
  })

  test('Should return json content type as default', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send('')
    })
    await request(app).get('/test-content-type').expect('content-type', /json/)
  })

  test('Should return xml content type if set up', async () => {
    app.get('/test-content-type', (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app).get('/test-content-type').expect('content-type', /xml/)
  })
})
