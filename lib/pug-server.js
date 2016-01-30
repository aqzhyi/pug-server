'use strict'

const PORT = process.env.PORT || 3000

module.exports = module.exports.default = pugServer

function pugServer(viewsPath) {
  const http = require('http')
  const path = require('path')
  const jade = require('jade')
  const nodeStatic = require('node-static')
  const filePath = path.join(viewsPath || '.')
  const fileServer = new nodeStatic.Server(filePath)

  let server = http.createServer(function (req, res) {
    if (req.url.match(/\.(jade|pug)$/) || req.url === '/') {
      const file = (req.url === '/') ? '/index.jade' : req.url

      try {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(
          jade.renderFile(filePath + file, {
            pretty: true
          })
        )
      }
      catch (e) {
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end(e.toString())
      }
    }
    else {
      req.addListener('end', function () { fileServer.serve(req, res) }).resume()
    }
  })

  server.listen({host: 'localhost', port: PORT}, function(err) {
    if (err) throw err
    console.log('Server started on: http://' + server.address().address + ':' + PORT)
  })

  return server
}
