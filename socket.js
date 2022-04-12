const server = require('./server')
const socketIo = require('socket.io')
const io = socketIo(server)

io.on('connection', socket => {
    socket.on('audio', blob => {
        // console.log(blob);
        socket.broadcast.emit('audio',blob)
    })
    socket.on('canRecord', status => {
        socket.broadcast.emit('canRecord', status)
    })
})