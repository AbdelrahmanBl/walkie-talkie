
let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    let blob = new Blob([buffer], {type: 'audio/mpeg'})
    // console.log(blob);
    var url = URL.createObjectURL(blob);
    
    let audioMessage = new Audio(url)
    // audioBefore.play()

    audioAfter.load()
    audioAfter.play()

    audioMessage.load()
    audioMessage.play()

    audioMessage.onended = () => {
        audioAfter.load()
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
