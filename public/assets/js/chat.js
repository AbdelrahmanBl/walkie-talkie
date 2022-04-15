
let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    let blob = await new Blob([buffer], {type: 'audio/ogg'})
    // console.log(blob);
    var url = await URL.createObjectURL(blob);
    
    // let audioMessage = new Audio(url)
    audioBefore.play()
    clientAudio.src = url
    clientAudio.play()
    clientAudio.onended = () => {
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
