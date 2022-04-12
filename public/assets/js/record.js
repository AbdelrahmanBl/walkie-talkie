const constraints = {
    audio: true,
    video: false
}


let mediaRecorder , chunks , keyStatus , canRecord = true
let audioBefore = new Audio('assets/audio/before-1.mp3')
// let audioAnother = new Audio('assets/audio/another.mp3')
let audioAfter = new Audio('assets/audio/after.mp3')

navigator.mediaDevices.getUserMedia(constraints)
                      .then(stream => {
                          mediaRecorder = new MediaRecorder(stream)

                          mediaRecorder.ondataavailable = (e) => {
                            // chunks.push(e.data)
                            // console.log(e.data);
                            socket.emit('audio', e.data)
                            socket.emit('canRecord', true)
                            // var url = URL.createObjectURL(e.data);
                            // var preview = document.createElement('audio');
                            // preview.controls = true;
                            // preview.src = url;
                            // document.getElementById('audio').append(preview);
                        }
                      })
                      .catch(err => {
                          console.log(err);
                      })

document.getElementById('start-btn').addEventListener('click', () => {
    if(canRecord == true) {
        socket.emit('canRecord', false)
        audioBefore.play()
        chunks = []
        mediaRecorder.start()
    }else {
        // audioAnother.play()
    }
})
document.getElementById('end-btn').addEventListener('click', () => {
    mediaRecorder.stop()
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