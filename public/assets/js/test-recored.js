let audio = document.getElementById('user-audio')

navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(stream => {
    audio.srcObject = stream
}).catch(err => {
    console.log('error',err);
})