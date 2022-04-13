const constraints = {
    audio: true,
    video: false
}


let mediaRecorder , chunks , keyStatus , canRecord = true
// let audioAnother = new Audio('assets/audio/another.mp3')
let audioAfter = new Audio('assets/audio/after.mp3')
let audioBefore = new Audio('assets/audio/before-1.mp3')
let replayInterval , stopRecord = false

navigator.mediaDevices.getUserMedia(constraints)
                      .then(stream => {
                          mediaRecorder = new MediaRecorder(stream)

                          mediaRecorder.ondataavailable = (e) => {
                                if (mediaRecorder.state != 'recording' && stopRecord == false) mediaRecorder.start()
                                socket.emit('audio', e.data)                                    
                            }
                      })
                      .catch(err => {
                          console.log(err);
                      })

document.getElementById('start-btn').addEventListener('click', () => {
    if(canRecord == true) {
        stopRecord = false
        socket.emit('canRecord', false)
        // audioBefore.play()
        audioAfter.play()
        if (mediaRecorder.state != 'recording')
        mediaRecorder.start()
        
        replayInterval = setInterval(() => {
            mediaRecorder.stop()
        }, 600);
    }else {
        // audioAnother.play()
    }
})
document.getElementById('end-btn').addEventListener('click', () => {
    if(canRecord == true) {
        if (mediaRecorder.state == 'recording') mediaRecorder.stop()
        clearInterval(replayInterval)

        stopRecord = true
        setTimeout(() => {
            socket.emit('canRecord', true)
        },300)
    }
        
})

document.body.onkeydown = (e) => {
    if(e.keyCode == 32 && keyStatus != 'down') {
        keyStatus = 'down'
        document.getElementById('start-btn').click()
    }
}

document.body.onkeyup = (e) => {
    if(e.keyCode == 32) {
        keyStatus = 'up'
        document.getElementById('end-btn').click()
    }
}

document.getElementById('press-btn').ontouchstart = () => {
    if(keyStatus != 'down') {
        keyStatus = 'down'
        document.getElementById('start-btn').click()
    }
}

document.getElementById('press-btn').ontouchend = () => {
        keyStatus = 'down'
        document.getElementById('end-btn').click()
}