const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const server = http.createServer(app)
module.exports = server 
require('./socket')

app.use(express.static(path.join('public')))



const PORT = process.env.PORT || 3000
const IP = '0.0.0.0'

server.listen(PORT,console.log(`server running on : ${IP}:${PORT}`))