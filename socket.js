const server = require('./index')
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
    socket.on('answer', remoteDescription => {
        socket.broadcast.emit('answer', remoteDescription)
    })
    socket.on('offer', sessionDescription => {
        socket.broadcast.emit('offer', sessionDescription)
    })
    socket.on('candidate', candidate => {
        socket.broadcast.emit('candidate', candidate)
    })
})