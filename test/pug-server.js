'use strict'

let expect = require('chai').expect
let pugServer = require('../lib/pug-server')
let fetch = require('node-fetch')

describe('npm:pug-server', function() {

  let server

  afterEach(function(done) {
    server.close(done)
  })

  it('Server listening on 3000 by default', function(done) {
    server = pugServer()
    server.on('error', (err) => { throw err })
    server.on('listening', () => {
      fetch('http://localhost:3000/public/index.jade')
      .then(validateStatus)
      .then(toText)
      .then(function(html) {
        expect(html).to.be.a('string')
        expect(html).to.match(/<!DOCTYPE html>/im)
        done()
      }, done)
    })
  })

  it('Server with custom views path', function(done) {
    server = pugServer('./public')
    server.on('error', (err) => { throw err })
    server.on('listening', () => {
      fetch('http://localhost:3000/index.jade')
      .then(validateStatus)
      .then(toText)
      .then(function(html) {
        expect(html).to.be.a('string')
        expect(html).to.match(/<!DOCTYPE html>/im)
        done()
      }, done)
    })
  })

  it('Server serve static files', function(done) {
    server = pugServer('./public')
    server.on('error', (err) => { throw err })
    server.on('listening', () => {
      fetch('http://localhost:3000/img/turtle.png')
      .then(validateStatus)
      .then(function(res) {
        expect(res.headers.get('content-length')).to.equal('195848')
        done()
      }, done)
    })
  })

  it('Server response when you try request not exist file', function(done) {
    server = pugServer()
    server.on('error', (err) => { throw err })
    server.on('listening', () => {
      fetch('http://localhost:3000/notExistFile.jade')
      .then((res) => {
        expect(res.status).to.be.at.least(400)
        return res
      })
      .then(toText)
      .then((html) => {
        expect(html).to.match(/no such file or directory/im)
        done()
      }, done)
    })
  })

  it('Server serve index.jade by default when you request http://localhost/', (done) => {
    server = pugServer('./public')
    server.on('error', (err) => { throw err })
    server.on('listening', () => {
      fetch('http://localhost:3000')
      .then(validateStatus)
      .then(toText)
      .then((html) => {
        expect(html).to.be.a('string')
        expect(html).to.match(/<!DOCTYPE html>/im)
        done()
      }, done)
    })
  })
})

function toText(res) {
  return res.text()
}

function validateStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  else {
    throw new Error(res.status + ' ' + res.statusText)
  }
}
