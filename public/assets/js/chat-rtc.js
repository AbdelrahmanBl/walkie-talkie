let socket = io()
// let counter = 0

socket.on('audio' , async (buffer) => {
    console.log(buffer);
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
    
    if(status == true) {
        audioAfter.play()
        audio.muted = true
    }
    else {
        audioBefore.play()
        audio.muted = false
    }
})

socket.on('new-user', (msg) => {
    let child = document.createElement('li')
    child.textContent = msg
    document.getElementById('clients').append(child)
})

socket.on('offer', sessionDescription => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(sessionDescription)).then(async () => {
        const remoteDescription = await peerConnection.createAnswer();
        peerConnection.setLocalDescription(remoteDescription)
        socket.emit('answer',remoteDescription)
    })
})

socket.on('answer', remoteDescription => {
    console.log('answer' , remoteDescription);
    peerConnection.setRemoteDescription(new RTCSessionDescription(remoteDescription))
})

socket.on('candidate', candidate => {
    if(candidate) {
        console.log('candidate',candidate);
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
    }
})

