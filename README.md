# pug-server
> A simple zero-configuration command-line http server of [pugjs](https://github.com/pugjs/jade) (aka jade)

![](http://i.imgur.com/B31ziZ2.png)

# Installing globally

`npm install pug-server -g`

## Usage

pug-server [path]

`[path]` defaults to `./`

#### Example

###### default usage

Use `$ pug-server` serve files in current folder. if there has `index.jade` file.

You can easily open http://localhost:3000/index.jade

###### change views path

Use `$ pug-server ./app` to serve files in folder app, if there has `./app/index.jade` file.

You can easily open http://localhost:3000/index.jade

###### change port

Use `$ PORT=8080 pug-server` to serve files in current folder, if there has `./index.jade` file.

You can easily open http://localhost:8080/index.jade

# Installing as a node app

## Usage

Use `npm install pug-server --save`

```js
let pugServer = require('pug-server')
let server = pugServer('./app')
```
