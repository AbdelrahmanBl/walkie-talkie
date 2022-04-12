let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    // console.log(buffer);
    let blob = new Blob([buffer], {type: 'audio/ogg'})
    // console.log(blob);
    var url = URL.createObjectURL(blob);
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