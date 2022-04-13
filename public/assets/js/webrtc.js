const constraints = {
    audio: true,
    video: false
}

const servers = null
const pcConstraint = {
    'optional': []
}

let mediaRecorder , chunks , keyStatus , canRecord = true
let audioConn , tempDesc , tempIceCandidates = []
let RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection
// let audioAnother = new Audio('assets/audio/another.mp3')
let audioAfter = new Audio('assets/audio/after.mp3')
let audioBefore = new Audio('assets/audio/before-1.mp3')

navigator.mediaDevices.getUserMedia(constraints)
                      .then(stream => {
                        audioConn = new RTCPeerConnection(servers,pcConstraint)
                        audioConn.addStream(stream)
                        audioConn.onaddstream = (e) => {
                            console.log('add stream : ' + e.stream);
                        }
                        audioConn.onicecandidate = (e) => {
                            if(e.candidate) {
                                socket.emit('CANDIDATE_WEBRTC', {'candidate': e.candidate})
                            }
                        }
                        audioConn.createOffer(desc => {
                            console.log(desc);
                            audioConn.setLocalDescription(desc)

                            // send desc to another peer
                            socket.emit('ASK_WEBRTC', desc)
                        })
                      })
                      .catch(err => {
                          console.log(err);
                      })

document.getElementById('start-btn').addEventListener('click', () => {
    if(canRecord == true) {
        socket.emit('canRecord', false)
        // audioBefore.play()
        audioAfter.play()
        chunks = []
        mediaRecorder.start()
    }else {
        // audioAnother.play()
    }
})
document.getElementById('end-btn').addEventListener('click', () => {
    if(canRecord == true) {
        mediaRecorder.stop()
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