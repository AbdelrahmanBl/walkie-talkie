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
    socket.on('CANDIDATE_WEBRTC', obj => {
        console.log(obj);
        socket.broadcast.emit('CANDIDATE_WEBRTC', obj)
    })
    socket.on('ASK_WEBRTC', desc => {
        console.log(desc);
        socket.broadcast.emit('ASK_WEBRTC', desc)
    })
})