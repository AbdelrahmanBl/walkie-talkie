
let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    try {
        let blob = new Blob([buffer], {type: 'audio/ogg'})
        // console.log(blob);
        var url = URL.createObjectURL(blob);
    } catch (error) {
        alert(error)
    }
    // var preview = document.createElement('audio');
    // counter++
    // preview.id = `audio-${counter}`
    // preview.controls = true;
    // preview.src = url;
    // document.getElementById('audio').append(preview);
    let audioMessage = new Audio(url)
    audioBefore.play()
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
