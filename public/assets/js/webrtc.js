const constraints = {
    audio: true,
    video: true
}

const configuration = {
    "iceServers": [{ "url": "stun:stun2.1.google.com:19302"}]
}
let peerConnection

let localStream


let mediaRecorder , chunks , keyStatus , canRecord = true
let tempDesc , tempIceCandidates = []
// let audioAnother = new Audio('assets/audio/another.mp3')
let audioAfter = new Audio('assets/audio/after.mp3')
let audioBefore = new Audio('assets/audio/before-1.mp3')

let audio = document.getElementById('user-audio')
let audioRemote = document.getElementById('remote-audio')
audio.muted = true

navigator.mediaDevices.getUserMedia(constraints)
                      .then(async stream => {
                        // audio.srcObject = stream
                        localStream = stream 
                        peerConnection = getPeerConnection(configuration)
                        peerConnection.addStream(stream)
                        // localStream.getTracks().forEach(track => {
                        //     peerConnection.addTrack(track)
                        // })

                        let sessionDescription = await peerConnection.createOffer()
                        peerConnection.setLocalDescription(sessionDescription)
                        socket.emit('offer', sessionDescription)

                        peerConnection.onaddstream = (e) => { audio.srcObject = e.stream }
                        // peerConnection.ontrack = (e) => { audio.srcObject = e.streams[0] }
                        peerConnection.onicecandidate = (e) => { socket.emit('candidate', e.candidate) }
                      })
                      .catch(err => {
                          console.log(err);
                      })

document.getElementById('start-btn').addEventListener('click', () => {
    if(canRecord == true) {
        socket.emit('canRecord', false)
        audioAfter.play()
    }else {
        // audioAnother.play()
    }
})
document.getElementById('end-btn').addEventListener('click', () => {
    if(canRecord == true) {
        socket.emit('canRecord', true)
        // audio.muted = true
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

function getPeerConnection(configuration) {
    if (window.mozRTCPeerConnection) {
        return new mozRTCPeerConnection(configuration);
      }
    else if (window.webkitRTCPeerConnection) {
        return new webkitRTCPeerConnection(configuration);
    }
    else if (window.RTCPeerConnection) {
        return new RTCPeerConnection(configuration);
    }
    else {
        alert('Not Support webRtc')
    }
}