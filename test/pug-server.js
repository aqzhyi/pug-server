'use strict'

let expect = require('chai').expect
let pugServer = require('../lib/pug-server')
let fetch = require('node-fetch')

describe('Hello pug-server', function() {

  let server

  afterEach(function() {
    server.close()
  })

  it('Server will listening on 3000 by default', function() {
    server = pugServer()

    return fetch('http://localhost:3000/public/index.jade')
    .then(validateStatus)
    .then(toText)
    .then(function(html) {
      expect(html).to.be.a('string')
      expect(html).to.match(/<!DOCTYPE html>/im)
    })
  })

  it('Server can be custom views path', function() {
    server = pugServer('./public')

    return fetch('http://localhost:3000/index.jade')
    .then(validateStatus)
    .then(toText)
    .then(function(html) {
      expect(html).to.be.a('string')
      expect(html).to.match(/<!DOCTYPE html>/im)
    })
  })

  it('Server can be serve static files', function() {
    server = pugServer('./public')

    return fetch('http://localhost:3000/img/turtle.png')
    .then(validateStatus)
    .then(function(res) {
      expect(res.headers.get('content-length')).to.equal('195848')
    })
  })

  it('Server handled when you try request not exist files', function() {
    server = pugServer()

    return fetch('http://localhost:3000/index.jade')
    .then(validateStatus)
    .then(toText)
    .then(function(html) {
      expect(html).to.match(/no such file or directory/im)
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
    throw res.status + ' ' + res.statusText
  }
}
