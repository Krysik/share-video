const express = require('express');
const app = express();
const path = require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'materialize')))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function onConnection(socket) {
  socket.on('video upload', (video) => socket.broadcast.emit('video upload', video))
  socket.on('play', (time) => socket.broadcast.emit('play', time))
  socket.on('pause', (time) => socket.broadcast.emit('pause', time))
}


io.on('connection', onConnection)

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});