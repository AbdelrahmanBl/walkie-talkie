
let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    let blob = new Blob([buffer], {type: 'audio/ogg'})
    // console.log(blob);
    var url = URL.createObjectURL(blob);
    
    let audioMessage = new Audio(url)
    // audioBefore.play()
    audioMessage.play()
    audioMessage.onended = () => {
        audioAfter.play()
    }
})

socket.on('canRecord', status => {
    canRecord = status
})

socket.on('new-user', (msg) => {
    let child = document.createElement('li')
    child.textContent = msg
    document.getElementById('clients').append(child)
})
