# pug-server [![Build Status](https://travis-ci.org/Pleasurazy/pug-server.svg?branch=master)](https://travis-ci.org/Pleasurazy/pug-server)

> A simple zero-configuration command-line http server of [pugjs](https://github.com/pugjs/jade) (aka jade)

![](http://i.imgur.com/B31ziZ2.png)

# Installing globally

`npm install pug-server -g`

## command line Usage

pug-server [path]

`[path]` defaults to `./`

#### Example

###### default usage

Use `$ pug-server` serve files in current folder. if there has `index.jade` file.

You can easily open `http://localhost:3000/`

###### change views path

Use `$ pug-server ./app` to serve files in folder app, if there has `./app/index.jade` file.

You can easily open `http://localhost:3000/`

###### change port

Use `$ PORT=8080 pug-server` to serve files in current folder, if there has `./index.jade` file.

You can easily open `http://localhost:8080/`

## node app Usage

Use `npm install pug-server --save`

```js
const server = require('pug-server')('./app')

server.on('listening', () => {})
server.on('error', () => {})
```
