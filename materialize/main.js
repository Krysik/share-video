const socket = io();
const video = document.getElementById("video");
const fileInput = document.getElementById("file");
fileInput.addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    video.src = reader.result

    socket.emit("video upload", reader.result)
  }
  reader.readAsDataURL(e.target.files[0])
})

video.addEventListener('play', function (e) {
  socket.emit("play", video.currentTime)
})

video.addEventListener('pause', function (e) {
  socket.emit("pause", video.currentTime)
})

socket.on("video upload", function (video) {
  document.getElementById("video").setAttribute('src', video)
})

socket.on("pause", function (time) {
  video.currentTime = time
  video.pause()
})

socket.on("play", function (time) {
  video.currentTime = time
  video.play();

})