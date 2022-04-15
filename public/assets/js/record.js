const constraints = {
    audio: true,
    video: false
}


let micStatus = document.getElementById('mic-status')
let mediaRecorder , chunks , keyStatus , canRecord = true
// let audioAnother = new Audio('assets/audio/another.mp3')
let audioAfter = new Audio('assets/audio/after.mp3')
let audioBefore = new Audio('assets/audio/before-1-old.mp3')
let audioBeforeSpeak = new Audio('assets/audio/speakSound.mp3')
// audioBefore = audioBeforeSpeak

navigator.mediaDevices.getUserMedia(constraints)
                      .then(stream => {
                          mediaRecorder = new MediaRecorder(stream)
                          mediaRecorder.addEventListener('dataavailable' , e => {
                            socket.emit('audio', e.data)
                            socket.emit('canRecord', true)
                          })
                      })
                      .catch(err => {
                          console.log(err);
                      })

document.getElementById('start-btn').addEventListener('click', () => {
    if(canRecord == true) {
        if(micStatus.classList.contains('off'))
            micStatus.classList.toggle('off')
        socket.emit('canRecord', false)
        audioBeforeSpeak.play()
        // audioAfter.play()
        chunks = []
        mediaRecorder.start()
    }else {
        // audioAnother.play()
    }
})
document.getElementById('end-btn').addEventListener('click', () => {
    if(canRecord == true && mediaRecorder.state != "inactive") {
        if(!micStatus.classList.contains('off'))
            micStatus.classList.toggle('off')
        mediaRecorder.stop()
    }
        
})

document.body.onkeydown = (e) => {
    if([32].includes(e.keyCode) && keyStatus != 'down') {
        keyStatus = 'down'
        document.getElementById('start-btn').click()
    }
}

document.body.onkeyup = (e) => {
    if([32].includes(e.keyCode)) {
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
        keyStatus = 'up'
        document.getElementById('end-btn').click()
}

document.getElementById('press-btn').onmousedown = () => {
    if(keyStatus != 'down') {
        keyStatus = 'down'
        document.getElementById('start-btn').click()
    }
}
document.getElementById('press-btn').onmouseup = () => {
    keyStatus = 'up'
    document.getElementById('end-btn').click()
}


