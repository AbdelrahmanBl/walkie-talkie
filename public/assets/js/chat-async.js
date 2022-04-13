let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    // console.log(buffer);
    let blob = new Blob([buffer], {type: 'audio/ogg'})
    // console.log(blob);
    var url = URL.createObjectURL(blob);
    let audioMessage = new Audio(url)
    
    audioMessage.play()
    audioMessage.onended = () => {
        if(canRecord == true) {
            audioAfter.play()
        }
    }
})

socket.on('canRecord', status => {
    canRecord = status
    if(status == false) 
        audioBefore.play()
    // else audioAfter.play()
})

socket.on('new-user', (msg) => {
    let child = document.createElement('li')
    child.textContent = msg
    document.getElementById('clients').append(child)
})